exports.helloExpress = (req, res) => {
    //res.sendFile(path.join(__dirname,'index.html'));
    res.send('Hello Express');
}

 exports.isExcute = (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));

    if (true) {
        next('route');
    }
}

exports.isExcuteFalse = (req,res) => {
    console.log('실행될까? false');
}

exports.isExcuteTrue = (req,res) => {
    console.log('실행 될까? true');
}

exports.helloAbout = (req,res) => {
    res.send('hello about');
}

exports.createCookie = (req,res) => {
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
}

exports.clearCookie = (req,res, next) => {   
    //쿠키 없애기
    res.clearCookie('name',{
        httpOnly:true,
        path:'/cookie',
    });

    console.log(req.cookies); 


    res.send("bye cookie");    
}

exports.getMultipart = (req,res) => {
    res.sendFile(path.join(__dirname,'multilpart.html'));
}

exports.compleateUploadImage = (req,res) => {
    console.log(req.file);
    res.send('ok');
}

