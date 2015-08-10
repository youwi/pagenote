var express = require('express');
var router = express.Router();
var fs=require("fs");
var path = require('path');

var tmpcache="";
fs.readFile(path.join(__dirname, 'pad.html'),function(err,data){
    tmpcache=data;
});


router.all("/*.*", function(request, response, next) {

  //  console.log(request.params[0]);
    var filename=path.join(__dirname,'..',"public", request.params[0]+".html");
    if( fs.existsSync(filename)){

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

});


router.use("/wikiSave", function(request, response, next) {


    fs.writeFile(request.body.filename,request.body.wikiContent,function(err){
        if(err)
            console.log(err+request.body.filename,request.body.wikiContent);
        var exec = require('child_process').exec;
            exec('git add *& git commit -m "ok" ',
                function (error, stdout, stderr) {
                    if (error !== null) {
                        console.log('git error: ' + error);
                    }

                });

    });
    response.send("ok");
 //   next();
   // console.log(request.body.filename,request.body.wikiContent);

});


router.use("/wikiAdd", function(request, response, next) {

    var newfilename=path.join(__dirname,'..',"public",request.body.filename);

    mkdirsSync(request.body.filename,0777);
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
    response.end();
});


router.use("/wikiList", function(request, response, next) {

    var filetree=new Object();

    //process.chdir("../public");
//console.log(geFileList("."));
    response.send( JSON.stringify(geFileList( __dirname+"/../public") ));



});
function geFileList(path)
{
    var filesList =new Object();
    readFile(path,filesList);
    return filesList;
}

//遍历读取文件
function readFile(path,filesList)
{
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

    process.chdir(path.join(__dirname,"..","public"));
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
//
//process.chdir("../public");
//console.log(geFileList("../public"));



module.exports = router;
