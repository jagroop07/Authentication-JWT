const express = require("express");
const protect = require('../middleware/jwtmiddleware')
const { getuser, deleteuser, updateuser, patchhuser, loginn, sendmail, Signup } = require("../controller/user");
const router = express.Router()

///using multer for uploading images (currently for single image)
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/image')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + file.originalname;
        cb(null, uniqueSuffix);
    }
})
  
const upload = multer({ storage: storage })   //passing storage here.....we can also pass destination here directly

router.post('/signup',upload.single('avatar'), Signup)    //upload.single('avatar').....for uploading single images
router.get('/', protect, getuser)
router.delete('/:id',deleteuser)
router.put('/:id',updateuser)
router.patch('/:id',upload.single('photo'),patchhuser)
router.post('/login',loginn)
router.post('/sendmail',protect,sendmail)
module.exports = router;