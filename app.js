var express = require('express');
var formidable = require('formidable');
var fs = require('fs');

var app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-File-Name');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
};

app.use(express.static(__dirname + '/'));

app.use(allowCrossDomain);

app.post('/upload', function(req, res) {

    var form = new formidable.IncomingForm();
    form.uploadDir = "./upload";

    //设置上传数据的编码
    form.encoding='utf-8';
    //设置是否保持上传文件的拓展名
    form.keepExtensions = true;
    //设置文件大小上限
    form.maxFieldsSize = 2 * 1024 * 1024;

    //文件上传成功后触发
    form.on('file', function(name, file) {
        // console.log(file)
    });
    //执行文件上传任务
    form.parse(req,function(err, fields, files){
        res.send({
            success : true,
            file_path : 'http://192.168.150.179:9999/' + files.upload_file.path
        });
    });
});

var PORT = 9999;

app.listen(PORT, function() {
    console.log('Now server listen to ' + PORT)
});