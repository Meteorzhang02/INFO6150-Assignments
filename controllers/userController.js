const User = require('../models/User');
const { createUserValidation, updateUserValidation, emailValidation, uploadImageValidation } = require('../middleware/validation');
const fs = require('fs').promises;
const path = require('path');

// 创建用户
exports.createUser = async (req, res) => {
    try {
        // 输入验证
        const { error } = createUserValidation(req.body);
        if (error) {
            return res.status(400).json({ 
                error: 'Validation failed.', 
                details: error.details[0].message 
            });
        }

        const { fullName, email, password } = req.body;

        // 检查邮箱是否已存在
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists.' });
        }

        // 创建新用户
        const user = new User({
            fullName: fullName.trim(),
            email: email.toLowerCase().trim(),
            password
        });

        await user.save();

        res.status(201).json({ 
            message: 'User created successfully.',
            user: {
                fullName: user.fullName,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Create user error:', error);
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Email already exists.' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 更新用户
exports.updateUser = async (req, res) => {
    try {
        // 验证更新数据
        const { error } = updateUserValidation(req.body);
        if (error) {
            return res.status(400).json({ 
                error: 'Validation failed.', 
                details: error.details[0].message 
            });
        }

        const { email, fullName, password } = req.body;

        // 查找用户
        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // 准备更新字段
        const updateFields = {};
        if (fullName && fullName.trim() !== '') {
            updateFields.fullName = fullName.trim();
        }
        if (password && password !== '') {
            updateFields.password = password;
        }

        // 如果没有有效的更新字段，返回错误
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ 
                error: 'Validation failed.', 
                details: 'No valid fields provided for update' 
            });
        }

        // 使用 findOneAndUpdate 而不是 save() 来避免密码双重哈希
        if (updateFields.password) {
            // 如果更新密码，需要手动哈希
            const bcrypt = require('bcryptjs');
            const salt = await bcrypt.genSalt(12);
            updateFields.password = await bcrypt.hash(updateFields.password, salt);
        }

        await User.findOneAndUpdate(
            { email: email.toLowerCase().trim() }, 
            updateFields, 
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: 'User updated successfully.' });

    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 删除用户
exports.deleteUser = async (req, res) => {
    try {
        // 验证邮箱
        const { error } = emailValidation(req.body);
        if (error) {
            return res.status(400).json({ 
                error: 'Validation failed.', 
                details: error.details[0].message 
            });
        }

        const { email } = req.body;

        // 查找并删除用户
        const user = await User.findOneAndDelete({ email: email.toLowerCase().trim() });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // 如果用户有头像，删除图片文件
        if (user.profileImage) {
            try {
                await fs.unlink(path.join(__dirname, '..', user.profileImage));
            } catch (fileError) {
                console.error('Error deleting profile image:', fileError);
            }
        }

        res.status(200).json({ message: 'User deleted successfully.' });

    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 获取所有用户
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'fullName email password profileImage createdAt updatedAt');
        
        const userList = users.map(user => ({
            fullName: user.fullName,
            email: user.email,
            password: user.password, // 返回哈希密码
            profileImage: user.profileImage,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }));

        res.status(200).json({ users: userList });

    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 上传图片
exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided.' });
        }

        // 验证邮箱
        const { error } = uploadImageValidation(req.body);
        if (error) {
            // 删除上传的文件
            await fs.unlink(req.file.path);
            return res.status(400).json({ 
                error: 'Validation failed.', 
                details: error.details[0].message 
            });
        }

        const { email } = req.body;

        // 查找用户
        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            // 删除上传的文件
            await fs.unlink(req.file.path);
            return res.status(404).json({ error: 'User not found.' });
        }

        // 检查是否已有图片
        if (user.profileImage) {
            // 删除上传的新文件
            await fs.unlink(req.file.path);
            return res.status(400).json({ error: 'Image already exists for this user.' });
        }

        // 更新用户头像路径
        user.profileImage = req.file.path;
        await user.save();

        res.status(201).json({ 
            message: 'Image uploaded successfully.', 
            filePath: req.file.path 
        });

    } catch (error) {
        console.error('Upload image error:', error);
        
        // 发生错误时删除上传的文件
        if (req.file) {
            try {
                await fs.unlink(req.file.path);
            } catch (fileError) {
                console.error('Error deleting uploaded file:', fileError);
            }
        }
        
        res.status(500).json({ error: 'Internal server error' });
    }
};