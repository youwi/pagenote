var express = require('express');
var router = express.Router();
var fs=require("fs");
var path = require('path');

var tmpcache="";
fs.readFile(path.join(__dirname, 'pad.html'),function(err,data){
    tmpcache=data;
});


router.all("/*.html", function(request, response, next) {

    console.log(request.params[0]);
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
        next();//存在就用原来的方式
    };

});


router.use("/wikiSave", function(request, response, next) {


    fs.writeFile(request.body.filename,request.body.wikiContent,function(err){
        if(err)
            console.log(err+request.body.filename,request.body.wikiContent);

    });
    response.send("ok");
 //   next();
   // console.log(request.body.filename,request.body.wikiContent);

});


router.use("/wikiAdd", function(request, response, next) {

    var newfilename=path.join(__dirname,'..',"public",request.body.filename);

    fs.writeFile(newfilename,"空白内容",function(err){
        if(err)
            console.log(err+request.body.filename);
        response.redirect("/"+request.body.filename);
    });

    //   next();
    // console.log(request.body.filename,request.body.wikiContent);

});

module.exports = router;
