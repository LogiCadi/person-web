$(function () {
    $("#fullPage").fullpage({
        //内容是否垂直居中,true:是
        verticalCentered: false,
        sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        navigation: true,
        //页面结构生成后的回调函数，或者说页面初始化完成后的回调函数
        afterRender: function () {
            $(".more").on("click", function () {
                $.fn.fullpage.moveSectionDown();
            });

            //动画执行完毕
            /*$(".screen04 .content .cart").on("transitionend", function () {
                $(".screen04 .content .address").fadeIn();
            });*/
            //第八屏hand跟随鼠标移动
            $(".screen08").on("mousemove", function (e) {
                var hand = $(".screen08 .hand");
                hand.offset({left: e.pageX - 60, top: e.pageY + 10});
            });
            //重新播放
            $(".screen08").find(".again").on("click", function () {
                $(".now,.leaved,.going").removeClass("now").removeClass("leaved").removeClass("going");
                $(".content [style]").attr("style", "");
                $.fn.fullpage.moveTo(1);
            });
        },
        //滚动到某一屏后的回调函数，接收 anchorLink 和 index 两个参数，anchorLink 是锚链接的名称，index 是序号，从1开始计算
        afterLoad: function (anchorLink, index) {
            $(".screen0" + index).addClass("now");
        },
        //滚动前的回调函数，接收 index、nextIndex 和 direction 3个参数：
        // index 是离开的“页面”的序号，从1开始计算；
        // nextIndex 是滚动到的“页面”的序号，从1开始计算；
        // direction 判断往上滚动还是往下滚动，值是 up 或 down。
        onLeave: function (index, nextIndex, direction) {
            //显示more
            $(".more").show();
            if (nextIndex == 3) {
                $(".screen02").addClass("leaved");
            } else if (nextIndex == 4) {
                $(".screen03").addClass("leaved");
            } else if (nextIndex == 6) {
                $(".screen05").addClass("leaved");
                $(".screen06").addClass("going");
            } else if (nextIndex == 7) {
                $(".screen07").addClass("going");
                //星星逐个显示
                $(".screen07 .content .star li").each(function (i) {
                    //delay() 方法对队列中的下一项的执行设置延迟。
                    $(this).delay(i * 500).fadeIn();
                });
            } else if (nextIndex == 8) {
                //隐藏more
                $(".more").hide();
            }
        },
        // 滚动速度，单位为毫秒
        scrollingSpeed: 1000
    });

});