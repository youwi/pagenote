function doparst(e){

    var reader = new FileReader();
    var tout;

    if(e.clipboardData.types.indexOf('Files') > -1)
    {
        console.log("data:" + e.clipboardData);
        console.log("types:"+ e.clipboardData.types);
        console.log("getData:"+ e.clipboardData.getData("img/*"));
        //console.log("files[0]:"+ e.clipboardData.files[0]);
        console.log("items[0]:"+ e.clipboardData.items[0]);

        var it=e.clipboardData.items[0];
        //	console.log("items[0].getData():"+ it.getData());
        reader.readAsDataURL( it.getAsFile());
        console.log("tout:",tout);
        console.log("reader",reader);
        console.log("text:"+reader.result.toString());//为结果文件
        xio=reader; //注意读取有时间限制!! 要使用onload来读取结果
        e.clipboardData.setData("text/plain", '<img src="' + reader.result +'" >');
        console.log(e.srcElement);
        reader.onload=function(ev){
            console.log("<img src=\"" + reader.result+"\" >");
            $(e.srcElement).append(  "<img src=\"" + reader.result+"\" >" )  ;
        };
        e.preventDefault();
        console.log(e);
        //  	'<img src="' + reader.result +'" >';//生成图片,然后把图片加入就好了.
    }

};