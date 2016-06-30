//滚屏触发
(function() {
   $backToTopFuna = function() {
		var sta = $(document).scrollTop();
		(sta > 200)? $(".article_col_head").addClass("active"): null;
		(sta > 280)? $(".barline_1").addClass("active"): null;
		(sta > 280)? $(".article_col_1 .col_text").addClass("active"): null;
		(sta > 280)? $(".col_ani_1").addClass("active"): null;
		(sta > 680)? $(".barline_2").addClass("active"): null;
		(sta > 680)? $(".article_col_2 .col_text").addClass("active"): null;
		(sta > 680)? $(".col_ani_2").addClass("active"): null;
		(sta > 1100)? $(".barline_3").addClass("active"): null;
		(sta > 1100)? $(".article_col_3 .col_text").addClass("active"): null;
		(sta > 1100)? $(".col_ani_3").addClass("active"): null;
		(sta > 1420)? $(".barline_4").addClass("active"): null;
		(sta > 1420)? $(".article_col_4 .col_text").addClass("active"): null;
		(sta > 1420)? $(".col_ani_4").addClass("active"): null;
		(sta > 1800)? $(".section_container").addClass("active"): null;
		(sta > 265)? $(".side_help_wrap").addClass("active"): $(".side_help_wrap").removeClass("active");

		// (sta > 0)? $(".mod_sidebar").addClass("active"): null;
		
	};
	$(window).bind("scroll", $backToTopFuna);
	$(function() { $backToTopFuna(); });
})()

$(".focus_item").hover(function(){
	$(this).addClass('current');
},function(){
	$(this).removeClass('current');
})

// 首页幻灯片切换
	$(function(){
		var Ani;       // 定义动画变量
		var Time = 3200;      // 自动播放间隔时间 毫秒
		var num = 800;       // 切换图片的时间 毫秒
		var page = 0;         // 定义变量
		var len = $( ".focus_wrap .focus_item" ).length;     // 获取图片的数量
		$( ".focus_wrap .focus_item" ).css( "opacity", 0 );   // 设置全部的图片透明度为0
		$( ".focus_wrap .focus_item:first" ).css( "opacity", 1 ); // 设置默认第一张图片的透明度为1
		function fun(){      // 封装
			// $( ".banner_btn li" ).eq( page ).addClass( "current" ).siblings().removeClass( "current" );       // 切换小点
			$( ".focus_wrap .focus_item" ).eq( page ).animate({ "opacity" : 1 }, num ).siblings().animate( { "opacity" : 0 }, num );     // 切换图片
		}
		function run(){         // 封装
			if( !$(".focus_wrap .focus_item" ).is( ":animated" )){    // 判断li是否在动画
				if( page == len - 1 ){ // 当图片切换到了最后一张的时候
					page = 0;    // 把page设置成0 又重新开始播放动画
					fun();
				}else{     // 继续执行下一张
					page++;
					fun();
				}			}
		}
		// $(".banner_btn li").click( function(){  // 点击小点
		// 	if( !$( ".banner_list li" ).is( ":animated" ) ){   // 判断li是否在动画
		// 		var index = $( ".banner_btn li" ).index( this );   // 获取点击小点的位置
		// 		page = index;    // 同步于page
		// 		fun();
		// 	}
		// });
		$( ".focus_wrap .focus_item" ).hover( function(){    // 鼠标放上去图片的时候清除动画
			$(this).css( "opacity", 1 ); 
			clearInterval( Ani );
		}, function(){     // 鼠标移开图片的时候又开始执行动画
			Ani = setInterval( run, Time );
		});
		Ani = setInterval( run, Time );
	});

// 导航切换
$(".side_category").click(function(){
	var _siblingCategory = $(this).parent().siblings().children('.side_category');
	$(this).addClass("current").next(".side_cate_sub").slideToggle(300).siblings(".side_cate_sub").slideUp("slow");
	_siblingCategory.removeClass("current");
});
//计数器
var number =2;
$(".openbtn").on('click',function(){
	(number%2 == 0) ? $(".side_cate_sub").slideUp(300) : $(".side_cate_sub").slideDown(300);
	number ++
	if ($(this).hasClass('down')) {
		$(this).removeClass('down');
		$(this).addClass('normal');
	} else {
		$(this).addClass('down');
		$(this).removeClass('normal');
	}
});

// 编辑
// $("#help_edit").dblclick(function(e){
// 	var _this = $(e.target);
// 	_this.attr("contentEditable","true");
	
// });

function autoDiv(){
	$(".manage_main_wrap, .login_container").css('min-height',$(window).height()-183);
	$(".pop_control").css("margin-top",-$(".pop_control").height()/2);
	$(".side_help_wrap").css("height",$(".mod_main").height());
	//console.log($('.mod_main').css("height"));
}
$(window).resize(function(){
	autoDiv();
})
autoDiv();

$(".table_line tr:even").css("background-color","#f9f9f9");


$(".app_button").click(function() {
	$(".databar_wrap").addClass("active");
});

/*
$(".mod_topbar_btn").hover(function(){
	console.log(123);
	$('.drop_list').toggle();
},function(){
	console.log(234);
	$('.drop_list').toggle();
});
*/