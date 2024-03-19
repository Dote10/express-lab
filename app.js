const express = require('express');
const path = require('path');
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');

const app = express();

// 서버에 port라는 변수를 심는다.
// 전역 변수의 개념 
app.set('port',process.env.PORT||3400);

// 미들웨어 등록
app.use((req, res,next) => {
    console.log('모든 요청에 실행하고 싶어요1');
    next();
},(req, res, next) =>{
    try{
     next();
    }catch (error){
        next(error);
    }
}
);

app.use('/about',(req,res,next) => {
    console.log('"/about" 으로 시작하는 URL에 모두 실행됩니다.');
    next();
});

app.use((req,res,next)=>{
    morgan('dev')(req,res,next);
});
app.use(cookieParser('dote10password'));
app.use(session({
    resave: false,
    saveUninitialized:false,
    secret: 'dote10password',
    cookie:{
        httpOnly:true,
        secure:false,
    },
    name:'session-cookie',
}));
app.use('/',express.static(path.join(__dirname,'static')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/about',(req, res, next) => {
    req.data = '데이터 넣기';
    next();
  },(req, res, next) => {
    console.log(req.data); //데이터 받기
    next();
  });

/**
 * 현재 프로젝트 폴더 
 * 바로 아래에 uploads 폴더가 없으면
 * uploads폴더를 생성한다. 
 */
try{
    fs.readdirSync('uploads');
} catch (error){
    console.log('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

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



// 라우터 등록
app.get('/',(req, res, next) => {
    res.sendFile(path.join(__dirname,'index.html'));
});


app.get('/route',(req, res, next) => {
    res.sendFile(path.join(__dirname,'index.html'));
    
    if(true){
        next('route')
    }
},(req,res) =>{
    console.log('실행될까? false');
});

app.get('/route',(req, res) => {
   console.log('실행 될까? true')
});

app.get('/about',(req,res) => {
    res.send('hello express');
});

app.get('/cookie',(req, res, next) => {
    //cookies 알아서 객체로 만들어준다.
    console.log(req.cookies); 

    const name = "dote10";

    //cookie 생성
    res.cookie('name',encodeURIComponent(name),{
        expires: new Date('2024-04-22'),
        httpOnly:true,
        path:'/cookie',
    });

    res.send("hello cookie");    
});


app.get('/cookie/clear',(req, res, next) => {   
    //쿠키 없애기
    res.clearCookie('name',{
        httpOnly:true,
        path:'/cookie',
    });

    console.log(req.cookies); 


    res.send("bye cookie");    
});



/**
 * 라우트 매개변수(req.params)
 */
app.get('/category/javascript',(req, res) =>{
	res.send('category javascript URL 입니다.');
});

app.get('/category/:name',(req, res) =>{
	res.send(`매개변수 name= ${req.params.name}를 받았습니다.`);
});

/**
 * 이미지 한장을 upload
 */
app.get('/upload',(req,res)=>{
    res.sendFile(path.join(__dirname,'multilpart.html'));
})


app.post('/upload/sigle',upload.single('image'),(req,res)=>{
    console.log(req.file);
    res.send('ok');
});

app.post('/upload/multi',upload.array('image'),(req,res)=>{
    console.log(req.files);
    res.send('ok');
});

app.post('/upload/fields',upload.fields([{name:'image1'},{name:'image2'},{name:'image3'}]),
(req,res)=>{
    console.log(req.files);
    res.send('ok');
});


// app.get('*',(req, res) =>{
// 	res.send('모든 get 요청에 응답하는 라우터 입니다.');
// });



// 에러 처리
app.use((req,res,next)=>{
    res.status(404).send('404 에러입니다.');
})

app.use((err, req, res, next )=>{
    console.error(err);
    res.status(200).send("에러가 발생하였습니다.");
});


app.listen(app.get('port'),() => {
    console.log(app.get('port'),'번 포트에서 대기 중')
});