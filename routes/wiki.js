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

    if( fs.existsSync(path.join(__dirname,'..', 'public'))){
        tmpcache= fs.readFileSync(path.join(__dirname, 'pad.html') );

        fs.readFile(path.join(__dirname,'..',"public", request.params[0]+".html"),function(err,data){
            if(err){
                //response.send("有错误");
                console.log("------"+err);
            }
            response.send(tmpcache+data);
            //next();
        });
    }else {
        next();//存在就用原来的方式
    };

});

module.exports = router;
