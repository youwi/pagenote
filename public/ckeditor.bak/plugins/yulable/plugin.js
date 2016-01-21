(function () {
    //Section 1 : 按下自定义按钮时执行的代码
    var a = {
            exec: function (editor) {
              //  show();
                console.log("plgggg");

            }
        },
        b = 'yulable';
    CKEDITOR.plugins.add('yulable', {
        init: function (editor) {
            editor.addCommand(b, a);
            editor.ui.addButton('yulable', {
                label: '添加图片',
               // icon: this.path + 'yulable.png',
                icon: this.path + '../icons.png'-25,
                command: b
            });
         //   $(".cke_button__yulable_icon").css("width","50px");
         //   $(".cke_button__yulable_icon").css("background-size","45px");

        }
    });


})();