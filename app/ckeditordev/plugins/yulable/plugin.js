(function () {
    //Section 1 : 按下自定义按钮时执行的代码
    var cmd = {
            exec: function (editor) {
                var ss='<span style="' +
                    'padding: 0px 10px;' +

                    'border-radius:10px;' +
                    'background-color:rgb(78, 200, 59); ' +
                    ' color: rgb(255, 255, 255); ">' + editor.getSelection().getSelectedText() + '</span>';
                editor.insertHtml(ss ,"html" );
                console.log("plgggg");

            }
        };

    var pluginid='yulable';




    CKEDITOR.plugins.add(pluginid, {
        init: function (editor) {
            editor.addCommand("green", cmd);
            editor.ui.addButton('green', {
                label: '文字',
               // icon: this.path + 'yulable.png',
               // icon: this.path + '../icons.png'-25,
                command: "green"
            });


            editor.addCommand("blue",  {
                exec: function (editor) {
                    editor.insertHtml( '<span style=" ' +
                        'padding: 0px 10px; ' +
                        'color: rgb(255, 255, 255);    ' +
                        'border-radius: 10px;            ' +
                        'background-color: rgb(115, 51, 241); ">' + editor.getSelection().getSelectedText() + '</span>' );
                    console.log("plgggg");

                }
            });
            editor.ui.addRichCombo("tttt",{
                label: '文字',
                command: "blue,green"
            });
            editor.ui.addButton('blue', {
                label: '文字',
                command: "blue"
            });

         //   $(".cke_button__yulable_icon").css("width","50px");
         //   $(".cke_button__yulable_icon").css("background-size","45px");

        }
    });


})();