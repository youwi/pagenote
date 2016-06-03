(function () {
    //Section 1 : 按下自定义按钮时执行的代码


    var pluginid='fellstyle';




    CKEDITOR.plugins.add(pluginid, {
        init: function (editor) {
            editor.addCommand("labelgreen", {
                exec: function (editor) {
                    var ss='<span style="' +
                        'padding: 0px 10px;' +

                        'border-radius:10px;' +
                        'background-color:rgb(78, 200, 59); ' +
                        ' color: rgb(255, 255, 255); ">' + editor.getSelection().getSelectedText() + '</span>';
                    editor.insertHtml(ss ,"html" );
                    console.log("plgggg");

                }
            });

            editor.addCommand("labelblue",  {
                exec: function (editor) {
                    editor.insertHtml( '<span style=" ' +
                        'padding: 0px 10px; ' +
                        'color: rgb(255, 255, 255);    ' +
                        'border-radius: 10px;            ' +
                        'background-color: rgb(115, 51, 241); ">' + editor.getSelection().getSelectedText() + '</span>' );
                    console.log("plgggg");

                }
            });
            var config = editor.config,
                lang = editor.lang.format;
            var tags = []; //new Array();
            //this.add('value', 'drop_text', 'drop_label');
            var s_label=    "display: inline;" +
                "padding: .2em .6em .2em; " +
             //   "font-size: 75%;    " +
                "font-weight: bold;     " +
                "line-height: 1;     " +
                "color: #fff;    " +
                "text-align: center;    " +
                "white-space: nowrap;   " +
                "vertical-align: baseline;    " +
                "border-radius: .25em;";

            var _all={
                    s_green:s_label+"background-color: #5cb85c;    " ,
                  s_blue:s_label+"background-color: #428bca;   ",
                  s_black:s_label+"background-color: #777;",
                  s_red:s_label+"background-color:#d9534f ;",
                  s_warn:s_label+"background-color: #f0ad4e; ",

                  g_blue:"color: #fff;background-color:#428bca; line-height: 1;",
                  g_info:"background-color: #d9edf7;line-height: 1;",
                  g_suc:"background-color: #dff0d8;line-height: 1;",
                  g_dgr:"background-color: #f2dede;line-height: 1;",
                  g_warn:"background-color: #fcf8e3;line-height: 1;"
            };


            tags[0]=["s_warn", "<span style='"+_all.s_warn+"'>橙色标签</span>", "橙色标签"];
            tags[1]=["s_black", "<span style='"+_all.s_black+"'>黑色标签</span>", "黑色标签"];
            tags[2]=["s_blue",  "<span style='"+_all.s_blue+"'>蓝色标签</span>", "蓝色标签"];
            tags[3]=["s_red",   "<span style='"+_all.s_red+"'>红色标签</span>", "红色标签"];
            tags[4]=["s_green", "<span style='"+_all.s_green+"'>橙色标签</span>", "绿色标签"];
            tags[5]=["g_blue", "<span style='"+_all.g_blue+"'>蓝色/背景</span>", "蓝色/背景块"];
            tags[6]=["g_info", "<span style='"+_all.g_info+"'>浅色/背景</span>", "浅色/背景块"];
            tags[7]=["g_suc", "<span style='"+_all.g_suc+"'>绿色/背景</span>", "绿色/背景块"];
            tags[8]=["g_dgr", "<span style='"+_all.g_dgr+"'>红色/背景</span>", "红色/背景块"];
            tags[9]=["g_warn", "<span style='"+_all.g_warn+"'>告示/背景</span>", "告示/背景块"];

            editor.ui.addRichCombo("labels",{
                label: '着色',
                command: "blue,green",
                title :"Insert tokens",
                voiceLabel : "Insert tokens",
                className : 'cke_format',
                multiSelect : false,

                panel :
                {
                    css : [ config.contentsCss, CKEDITOR.getUrl( "skins/"+CKEDITOR.skinName + '/editor.css' ) ],
                    voiceLabel : 'sfawe'
                },

                init : function()
                {
                    this.startGroup( "标签" );
                   // this.add('value', 'drop_text', 'drop_label');
                    for (var this_tag in tags){
                        this.add(tags[this_tag][0], tags[this_tag][1], tags[this_tag][2]);
                    }
                },

                onClick : function( value )
                {
                   // editor.focus();
                    //editor.fire( 'saveSnapshot' );
                    //editor.getSelectedHtml().getHtml()
                    //editor.getSelection().getSelectedText()
                    var out;
                    if(editor.getSelectedHtml)
                        out=editor.getSelectedHtml().getHtml();
                    else
                        out=editor.getSelection().getSelectedText()
                    if(value.startsWith("g")){
                        editor.insertHtml("<div style='"+_all[value]+"'>"+out+"</div>","unfiltered_html");
                    }else
                        editor.insertHtml("<span style='"+_all[value]+"'>"+out +"</span>","unfiltered_html");
                   // editor.fire( 'saveSnapshot' );
                }
            });


            //   $(".cke_button__yulable_icon").css("width","50px");
            //   $(".cke_button__yulable_icon").css("background-size","45px");

        }
    });


})();