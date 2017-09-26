$(function() {

    $(window).on("load", function() {
        imgLocation();
        var dataImg = {
            "data": [{ "src": "1.jpg" },
                { "src": "2.jpg" },
                { "src": "3.jpg" },
                { "src": "4.jpg" },
                { "src": "5.jpg" },
                { "src": "6.jpg" },
                { "src": "7.jpg" },
                { "src": "8.jpg" },
                { "src": "9.jpg" },
                { "src": "10.jpg" }
            ]
        };
        window.onscroll = function() {
            if (scrollside()) {
                $.each(dataImg.data, function(index, value) {
                    var box = $("<div>").addClass("box").appendTo($("#container"));//添加box
                    var content = $("<div>").addClass("content").appendTo(box);//添加content
                    var img = $("<img>").attr("src", "./img/" + $(value).attr("src")).appendTo(content);//添加图片
                });
                window.onresize=function(){

                }
                imgLocation();
            }
        }
    });
    window.onresize=function(){
    	imgLocation();
    }
});
 //判断文档滚动的位置
function scrollside() {
    var box = $(".box");
    var lastBoxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height() / 2);
    var windowHeight = $(window).height();
    var scrollHeight = $(document).scrollTop();
    return (lastBoxHeight < windowHeight + scrollHeight) ? true : false;
}
//实现瀑布流布局的函数
function imgLocation() {
    var box = $(".box");//获取到所有的类名为box的元素
    var boxWidth = box.eq(0).width();
    var num = Math.floor($(window).width() / boxWidth);//宽度都是一样,获取第一个高度
    var boxHeightArr = [];
    box.each(function(index, value) {
    	value.style.cssText="";
        var boxHeight = box.eq(index).height();//遍历所有box并获取高度
        if (index < num) {
            boxHeightArr[index] = boxHeight;//获得第一行box高度
        } else {
            var minboxHeight = Math.min.apply(null, boxHeightArr);//获得最小box高度
            var minboxIndex = $.inArray(minboxHeight, boxHeightArr);//获取到数组最小值对应的排序
            $(value).css({
                "position": "absolute",
                "top": minboxHeight,//设置top为数组中最小值
                "left": box.eq(minboxIndex).position().left
            });
            boxHeightArr[minboxIndex] += $(value).height();//更新数组
        }
    });
}