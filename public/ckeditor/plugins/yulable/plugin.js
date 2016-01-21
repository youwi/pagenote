(function () {
    //Section 1 : 按下自定义按钮时执行的代码
    var cmd = {
            exec: function (editor) {
                editor.insertHtml( '<span style=" ' +
                    'padding: 0px 10px; ' +
                  //  'display: inline;       ' +
                   // 'float: left;' +
                   // 'font-size: 12px;  ' +
                    'color: rgb(255, 255, 255);    ' +
                    'border-radius: 10px;            ' +
                    'background-color: rgb(78, 200, 59); ">' + editor.getSelection().getSelectedText() + '</span>' );
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