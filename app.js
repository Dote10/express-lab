const express = require('express');
const path = require('path');
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const session = require('express-session');

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
app.use((req, res, next) => {
    req.data = '데이터 넣기';
    next();
  },(req, res, next) => {
    console.log(req.data); //데이터 받기
    next();
  });




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
    // res.cookie('name',encodeURIComponent(name),{
    //     expires: new Date('2024-04-22'),
    //     httpOnly:true,
    //     path:'/cookie',
    // });

    res.send("hello cookie");    
});


app.get('/cookie/clear',(req, res, next) => {   
    //쿠키 없애기
    res.clearCookie('name',{
        httpOnly:true,
        path:'/cookie',
    });

    console.log(req.cookies); 


    res.send("hello cookie");    
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


// app.get('*',(req, res) =>{
// 	res.send('모든 get 요청에 응답하는 라우터 입니다.');
// });


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