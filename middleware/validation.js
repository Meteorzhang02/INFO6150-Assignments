const Joi = require('joi');

// 密码强度验证正则
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// 创建用户验证
const createUserValidation = (data) => {
    const schema = Joi.object({
        fullName: Joi.string()
            .pattern(/^[A-Za-z\s]+$/)
            .required()
            .messages({
                'string.pattern.base': 'Full name can only contain alphabetic characters and spaces',
                'any.required': 'Full name is required',
                'string.empty': 'Full name cannot be empty'
            }),
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Please provide a valid email address',
                'any.required': 'Email is required'
            }),
        password: Joi.string()
            .min(8)
            .pattern(passwordRegex)
            .required()
            .messages({
                'string.min': 'Password must be at least 8 characters long',
                'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
                'any.required': 'Password is required'
            })
    });

    return schema.validate(data);
};

// 更新用户验证
const updateUserValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Please provide a valid email address',
                'any.required': 'Email is required for user identification'
            }),
        fullName: Joi.string()
            .pattern(/^[A-Za-z\s]+$/)
            .optional()
            .allow('')
            .messages({
                'string.pattern.base': 'Full name can only contain alphabetic characters and spaces'
            }),
        password: Joi.string()
            .min(8)
            .pattern(passwordRegex)
            .optional()
            .allow('')
            .messages({
                'string.min': 'Password must be at least 8 characters long',
                'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
            })
    }).or('fullName', 'password') // 至少提供 fullName 或 password 中的一个
      .messages({
          'object.missing': 'At least one field (fullName or password) must be provided for update'
      });

    return schema.validate(data);
};

// 邮箱验证（用于删除和其他操作）
const emailValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Please provide a valid email address',
                'any.required': 'Email is required'
            })
    });

    return schema.validate(data);
};

// 图片上传验证
const uploadImageValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Please provide a valid email address',
                'any.required': 'Email is required'
            })
    });

    return schema.validate(data);
};

module.exports = {
    createUserValidation,
    updateUserValidation,
    emailValidation,
    uploadImageValidation
};