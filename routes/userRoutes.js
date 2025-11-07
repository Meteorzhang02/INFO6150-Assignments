const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middleware/upload');

// 创建用户
router.post('/create', userController.createUser);

// 更新用户
router.put('/edit', userController.updateUser);

// 删除用户
router.delete('/delete', userController.deleteUser);

// 获取所有用户
router.get('/getAll', userController.getAllUsers);

// 上传图片
router.post('/uploadImage', upload.single('image'), userController.uploadImage);

module.exports = router;