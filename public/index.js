

var cogg;
$("#d_copp").click(function(){
    if(cogg==null){
        $(".sidebar-nav").width("350px");
        cogg=true;
    }
    else{
        $(".sidebar-nav").width("190px");
        cogg=null
    }
    return false;
});


$("#tagop").click(function () {
    $("#tagedit").slideToggle("slow");
});
$("#tagtask").click(function () {
});

$("#save").click(save=function () {
    // var filename = $('#WikiContent').data("file");
    $.ajax({
        url: '/wikiSave',
        data:{ filename: currfile,  wikiContent: CK?CK.getData():$("#WikiContent").html()},
        method:"POST",
        success:function (data) {
            $.globalMessenger().post({
                message: data,
                hideAfter:1,
                type: 'error',
                showCloseButton: true
            })
        },
        error:function(err){
            $.globalMessenger().post({
                message: err.status,
                hideAfter:1,
                type: 'error',
                showCloseButton: true
            })
            console.log("出错");
        },
    });
});
$("#upload").click(function () {
    //$.globalMessenger().post("#upload");
    $("#uppc")[0].click();
    upac();
});
$("#newfile").click(function(){
    $.post('/wikiAdd', {
        filename:thfilename.value,
    },function(data){
        $.globalMessenger().post({
            message: data,
            hideAfter:1,
            type: 'error',
            showCloseButton: true
        });
        $("#myModal").hide();
        refreshTree();
        //window.location.href = "/"+thfilename.value
    });
});
$("#runcurr").click(function () {
    // var filename = $('#WikiContent').data("file");

    $.ajax({
        url: '/caseRun',
        data:{ filename: currfile},
        method:"POST",
        success:suc=function(data){
            var json;
            try{
                json= JSON.parse(data)
            }catch(e){
                json={"转换为:":data};
                console.log("转换出错");
            }
            editor_out_json.set(json);
            editor_out_raw.set(data);
            $('#tabs-154688 li:eq(4) a').tab('show');
            $.globalMessenger().post({
                message: 'ok',
                hideAfter:1,
                type: 'error',
                showCloseButton: true
            });
        },
        error:function(err){
            if(err.status==200){
                suc(err.responseText)

            }
            $('#tabs-154688 li:eq(3) a').tab('show');
            console.log("出错");
            $.globalMessenger().post({
                message: err.status,
                hideAfter:1,
                type: 'error',
                showCloseButton: true
            });
        }
    });
});
var CK;
$("#edit").click(function(){
    console.log("其实可以进入编辑态 document.designMode = 'on' 之后就可以粘贴doc;");
    if(CK==null)
    {
        CK=CKEDITOR.replace('WikiContent');
        //CK.setData(window.frames.if.document.body.innerHTML) //设置内容

        CKEDITOR.on('instanceReady', function (e) {

            $('.cke_contents').css('height', "calc(100% - 120px)");


            //frames[0].addEventListener('paste',doparst);//设置可粘贴
            //setTimeout("$('.cke_contents').css('height', $('body').height()-200);",100) ;//设置一个超时对象:自动变高
        });
    }else{
        $("#WikiContent")[0].innerHTML=CK.getData();
        CK.destroy();
        CK=null;
    }
});


function refreshTree(){

    $('#treeroot').yutree({
        url:"/wikiList?root="+$("myroot").val(),
        click:function() {
            // currfile=$(this)[0].href; //中文会转义
            currfile = $(this).attr("href");
            $("#d_filename").text(currfile);
            $.ajax({
                url: currfile,
                method: "GET",
                success: suc = function (data) {
                    $("#WikiContent").html(data);
                    if (CK)   CK.destroy();
                    CK = null;
                },
                error: function (err) {
                    if (err.status == 200) {
                        suc(err.responseText)
                    }
                    console.log("出错");
                }
            });
            return false;
        },
        rclick:function () {

        }

    });

}



document.onkeydown = function (event) {
    var e = event || window.event;
    var keyCode = e.keyCode || e.which;
    if (e.ctrlKey && (keyCode == 83 )) { // CTRL +S
        // console.log("保存");     // $("#f").submit();    //  save();
        $("#save").trigger("click");
        e.returnValue = false;
    }else if(e.ctrlKey && (keyCode == 82 )){ // CTRL+R
        $("#runcurr").trigger("click");
        e.returnValue = false;
    }
};

$(document).ready( function () {
    refreshTree();

});
$._messengerDefaults = {
    extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-left',
    theme: 'flat',
    hideAfter: 1
};



