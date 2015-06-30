var express = require('express');
var formidable = require('formidable');
var fs = require('fs');

var app = express();

app.use(express.static(__dirname + '/'));

app.all('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/upload', function(req, res) {

    var form = new formidable.IncomingForm();
    form.uploadDir = "./upload";

    //设置上传数据的编码
    form.encoding='utf-8';
    //设置是否保持上传文件的拓展名
    form.keepExtensions = true;
    //文件上传过程中触发可以做上传进度查看
    form.on('progress', function(bytesReceived, bytesExpected) {
        if(bytesExpected>1024*1024*3){//bytesExpected为等待上传的文件的大小，超过大小就返回错手动触发error
            this.emit('error',"文件过大")
        };
    });
    //文件上传成功后触发
    form.on('file', function(name, file) {
        //成功上传，把临时文件移动到public文件夹下面ivfg
        fs.renameSync(file.path, "./upload/" + file.name);
    });
    //流程正常处理
    //form.on('end',function(){
    //    console.log(arguments);
    //});
    //出错
    //form.on('error',function(err){
    //    res.end(err);
    //})
    //执行文件上传任务
    form.parse(req,function(err, fields, files){
        res.send({
            success : true,
            file_path : '/upload/' + files.upfile.name
        });min
    });



});

app.listen(9999);