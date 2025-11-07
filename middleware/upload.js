const multer = require('multer');
const path = require('path');

// 配置存储
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/'); // 存储到 images 文件夹
    },
    filename: function (req, file, cb) {
        // 生成唯一文件名：时间戳 + 原始扩展名
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// 文件过滤器
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file format. Only JPEG, PNG, and GIF are allowed.'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB 限制
    },
    fileFilter: fileFilter
});

module.exports = upload;