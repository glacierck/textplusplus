// JavaScript Document
$(document).ready(function() {

    //首先将#scrollUpf隐藏
    $(".scrollUpf").hide();
    //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
    $(function() {
        $(window).scroll(function() {
            if ($(window).scrollTop() > 100) {
                $(".scrollUpf").fadeIn();
            } else {
                $(".scrollUpf").fadeOut();
            }
        });
        //当点击跳转链接后，回到页面顶部位置
        $("#scrollUp").click(function() {
            $('body,html').animate({
                    scrollTop: 0
                },
                500);
            return false;
        });
    });

    //结束
});
