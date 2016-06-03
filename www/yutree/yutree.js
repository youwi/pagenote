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
    domtree+="<ul>";
    for(child in node){
        if(child!="filename")
        {
            domtree+="<li>"+"<span data-link='"+dir+"/"+child+"/index.html'>"+child+"</span>";
            domtree+=buildElement(node[child],dir+"/"+child);
            domtree+="</li>\n";
        }else{

            for(var i=0;i< node[child].length;i++)
                domtree+="\t\t<li><a href='"+dir+"/"+node[child][i]+"'>"+node[child][i]+"</a></li>\n";
        }
    }
    domtree+="</ul>\n";

    return domtree||"";

}



$.fn.extend({
    yutree: function (o) {
        var root=$(this);
        jQuery.ajax({
            type: 'get',
            url: o.url,
            data: undefined,
            success: function (json) {
                root.empty();
                root.append(buildElement(json));
               // o.click();
            },
            dataType: "json",
            async:false
        });




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
        tree.addClass("yutree");
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

        $(".yutree a").click(o.click);
        $(".yutree .branch span").click(o.dclick);
    }
});