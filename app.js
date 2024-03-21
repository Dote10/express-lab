const path = require('path');
const dotenv = require('dotenv');
process.env.NODE_ENV === 'prod'?
            dotenv.config({path:path.join(__dirname,'.env.prod')})
            :dotenv.config({path:path.join(__dirname,'.env.dev')});
const express = require('express');
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fs = require('fs');
const nunjucks = require('nunjucks');

const {sequelize} = require('./models');

//라우터 임포트
const indexRouter = require('./routes');
const userRouter = require('./routes/user');

const app = express();

// 서버에 port라는 변수를 심는다.
// 전역 변수의 개념 
app.set('port',process.env.PORT||3400);
app.set('View engine','html');

//템플릿 엔진 등록
nunjucks.configure('views',{
    express:app,
    watch:true,
});

//시퀄라이즈 연결
sequelize.sync({force: false})
    .then(() =>{
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.log(err);
    });



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
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized:false,
    secret: process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    },
    name:'session-cookie',
}));
app.use('/',express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/about',(req, res, next) => {
    req.data = '데이터 넣기';
    next();
  },(req, res, next) => {
    console.log(req.data); //데이터 받기
    next();
  });


//현재 프로젝트 폴더 
//바로 아래에 uploads 폴더가 없으면
//uploads폴더를 생성한다. 
 
try{
    fs.readdirSync('uploads');
} catch (error){
    console.log('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}



// 라우터 등록
app.use('/',indexRouter);
app.use('/user',userRouter);

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