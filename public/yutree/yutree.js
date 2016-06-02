/**
 * set usege
 $.yutree({
    element:e,
    url:"getwikiList",
    click:function(){},
    rclick:function () {}
});
 *
 *
 *
 */



function buildElement(node,dir){
    //domtree+="<li>root";
    var domtree="";
    dir=dir||"";
    for(child in node){
        if(child!="filename")
        {
            domtree+="<li>"+"<span data-link='"+dir+"/"+child+"/index.html'>"+child+"</span>";
            domtree+=buildElement(node[child],dir+"/"+child);
            domtree+="</li>\n";
        }else{
            domtree+="<ul>"
            for(var i=0;i< node[child].length;i++)
                domtree+="\t\t<li><a href='"+dir+"/"+node[child][i]+"'>"+node[child][i]+"</a></li>\n";
        }
    }
    domtree+="</ul>\n";

    return domtree||"";

}

$(".branch span").click(function() {
    //$(this).prev().toggleClass("glyphicon-minus-sign" + " " + "glyphicon-plus-sign");
    $(this).parent().children().children().toggle();
    currfile = $(this).attr("data-link");
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
});

$.fn.extend({
    yutree: function (o) {


        $.getJSON(o.url,)






        var openedClass = 'glyphicon-minus-sign';
        var closedClass = 'glyphicon-plus-sign';

        if (typeof o != 'undefined') {
            if (typeof o.openedClass != 'undefined') {
                openedClass = o.openedClass;
            }
            if (typeof o.closedClass != 'undefined') {
                closedClass = o.closedClass;
            }
        }
        ;

//initialize each of the top levels
        var tree = $(this);
        tree.addClass("tree");
        tree.find('li').has("ul").each(function () {
            var branch = $(this); //li with children ul
            branch.prepend("<i class='indicator glyphicon " + closedClass + "'></i>");
            branch.addClass('branch');
            branch.on('click', function (e) {
                if (this == e.target) {
                    var icon = $(this).children('i:first');
                    icon.toggleClass(openedClass + " " + closedClass);
                    $(this).children().children().toggle();
                }
                // console.log("click++")
            })
            branch.children().children().toggle();
        });

        tree.find('.branch .indicator').each(function () {
            $(this).on('click', function () {
                $(this).closest('li').click();
                //  console.log("click++")
            });
        });

        tree.find('.branch>button').each(function () {
            $(this).on('click', function (e) {
                $(this).closest('li').click();
                e.preventDefault();
                // console.log("click++")
            });
        });
    }
});