
exports.helloUser = () =>{
    res.send('Hello User');
}

exports.helloParamQuery = () => {
    console.log('params = ',req.params);
    console.log('query = ', req.query);
    res.send('ok');
}