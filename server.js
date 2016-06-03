#!/usr/bin/env node



var fs=require("fs");
var logger = require('morgan');
var path = require('path');
var express = require('express');
var methodOverride = require('method-override');
var app = express();

var bodyParser = require('body-parser');

////////////////////////////////////////////////////////////////////////
app.set('port', process.env.PORT || 8008);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger("dev"));
app.use(methodOverride());

app.use(bodyParser.json({limit: '50mb'}));
app.use("/",bodyParser.urlencoded({limit: '50mb', extended: false }));
app.use(bodyParser.raw());

app.use(express.static(path.join(__dirname, 'doc')));
app.use(express.static(path.join(__dirname, 'www')));


app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

////////////////////////////////////////////////////////////////////////
app.all("/*.*", function(request, response, next) {
    var tmpcache=fs.readFileSync(path.join(__dirname, 'www/pad.html'));
  //  console.log(request.params[0]);
  var filename=path.join(__dirname,"doc", request.params[0]+".html");
  if(request.query.edit!=null){
    if( fs.existsSync(filename) && request.params[1]=="html"){
      tmpcache= fs.readFileSync(path.join(__dirname, 'pad.html') );
      fs.readFile(filename,function(err,data){
        if(err){
          //response.send("有错误");
          console.log("------"+err);
        }
        response.send(tmpcache.toString().replace("${page}",data).replace("${filename}",filename));
        //next();
      });
    }else {
      console.log(filename+"文件不存在");
      next();//存在就用原来的方式
    };
  }else{
    next();
  }
});

app.use("/wikiSave", function(request, response, next) {

  //if(request.body.filename )
  var filename=path.join(__dirname,"doc",request.body.filename);
  fs.writeFile(filename,request.body.wikiContent,function(err){
    if(err){
      console.log(filename,request.body.wikiContent);
      response.send(err.code);
    }else{
      var exec = require('child_process').exec;
      exec('git add * && git commit -m "ok" ',
          function (error, stdout, stderr) {
            if (error !== null) {
              console.log('git error: ' + error);
            }
            console.log(' 成功加入git版本控制 ' );
          });
      response.send("ok");
    }



  });

  //   next();
  // console.log(request.body.filename,request.body.wikiContent);

});

app.use("/wikiAdd", function(request, response, next) {

  var newfilename=path.join(__dirname,"doc",request.body.filename);

  mkdirsSync(request.body.filename,0o777);
  if(!fs.existsSync(newfilename))
    fs.writeFile(newfilename,"空白内容",function(err){
      if(err)
        console.log(err+"新建文件出错"+newfilename);

      // response.location("/"+request.body.filename);
    });
  // response.location("/"+request.body.filename);
  // response.end();
  //   next();
  // console.log(request.body.filename,request.body.wikiContent);
  response.set({
    'Location': "/"+request.body.filename
  });
  response.write("ok");
  response.end();
});

app.use("/wikiList", function(request, response, next) {

  var filetree=new Object();

  //process.chdir("../www");
//console.log(geFileList("."));
  response.send( JSON.stringify(geFileList( __dirname+"/doc") ));


});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.write(JSON.stringify({
        message: err.message
    }));
    res.end();
});



////////////////////////////////////////////////////////////////////////
function geFileList(path){
  var filesList =new Object();
  readFile(path,filesList);
  return filesList;
}
//遍历读取文件
function readFile(path,filesList){
  files = fs.readdirSync(path);//需要用到同步读取
  files.forEach(walk);
  function walk(file)
  {
    states = fs.statSync(path+'/'+file);
    if(states.isDirectory())
    {
      if(
          file=="css"
          ||file=="js"
          ||file=="ckeditor"
          ||file=="fonts") return;
      filesList[file]=new Object();//目录节点
      readFile(path+'/'+file,filesList[file]);
    }
    else
    {
      //filesList[file]
      //创建一个对象保存信息
      // var obj = new Object();
      // obj.size = states.size;//文件大小，以字节为单位
      // obj.name = file;//文件名
      //   obj.path = path+'/'+file; //文件绝对路径
      if( !filesList.filename  ) filesList.filename=[];
      filesList.filename.push(file);
    }
  }
}

function mkdirsSync(dirpath, mode) {

  process.chdir(path.join(__dirname,"doc"));
  if (!fs.existsSync(dirpath)) {
    var pathtmp;
    // var count;
    dirpath.split(path.sep).forEach(function(dirname) {
      if ((dirname.indexOf(".html") > -1
          ||dirname.indexOf(".htm")  > -1
          ||dirname.indexOf(".")  > -1
          || dirname.indexOf(".txt")  >-1 )) return;
      if(dirname=="") return;
      if (pathtmp) {
        pathtmp = path.join(pathtmp, dirname);
      }
      else {
        pathtmp = dirname;
      }
      if (!fs.existsSync(pathtmp)) {
        if (!fs.mkdirSync(pathtmp, mode)) {
          return false;
        }
      }
    });
  }
  return true;
}

