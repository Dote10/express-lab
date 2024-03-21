const { Router } = require('express');
const multer = require('multer');
const { helloExpress, 
        isExcute, 
        isExcuteTrue, 
        isExcuteFalse, 
        helloAbout, 
        createCookie, 
        clearCookie, 
        getMultipart, 
        compleateUploadImage } = require('../controllers/index');

const router = Router();

//Get /라우터x
router.get('', helloExpress);


router.get('route',isExcute, isExcuteFalse);

router.get('route',isExcuteTrue);

router.get('about',helloAbout);

router.get('cookie',createCookie);

router.get('cookie/clear',clearCookie);


/**
 * 라우트 매개변수(req.params)
 */
router.get('category/javascript',(req, res) =>{
	res.send('category javascript URL 입니다.');
});

router.get('category/:name',(req, res) =>{
	res.send(`매개변수 name= ${req.params.name}를 받았습니다.`);
});


//사진을 업로드하기위한
//multer 설정
const upload = multer({
    storage: multer.diskStorage({
        destination(req,file,done){
            done(null,'uploads/');
        },
        filename(req,file,done){
            const ext = path.extname(file.originalname);
            done(null,path.basename(file.originalname,ext) + Date.now() + ext);
        },
    }),
    // 5MB 이하의 파일만 업로드 가능
    limits: {fileSize: 5 * 1024 * 1024},
})


/**
 * 이미지 한장을 upload
 */
router.get('upload',getMultipart);

router.post('upload/sigle',upload.single('image'),compleateUploadImage);

router.post('upload/multi',upload.array('image'),compleateUploadImage);

router.post('upload/fields',upload.fields([{name:'image1'},{name:'image2'},{name:'image3'}]),
compleateUploadImage);


module.exports = router;