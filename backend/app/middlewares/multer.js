const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname.split(' ').join('_'));
    }
});

const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else{
        cb(new Error('type of image not supported'), false)
    }
}
// const upload = multer({storage: storage, limits: {fileSize:1024 *1024 * 5}});

module.exports = multer({storage: storage, limits: {fileSize:1024 *1024 * 5}, fileFilter: fileFilter}).single('image');