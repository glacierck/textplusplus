
// semantic js
$(document).ready(function() {
	if (typeof (JSON) == 'undefined') {
	     $.getScript('/public/wenzhi/js/json2.js');
	}

	var $fixTop = $('.fix_top');
	var $cateNav = $('#cate_nav');
	var $headerTopbar = $('.header_topbar');


	var sectionMark =['no', 'no', 'no', 'no', 'no', 'no', 'no'];
	var base_dep_rel_array={
		'SBV': '主谓关系',
		'VOB': '动宾关系',
		'IOB': '间宾关系',
		'FOB': '前置宾语',
		'DBL': '兼语',
	    'ATT': '定中关系',
		'ADV': '状中结构',
		'CMP': '动补结构',
		'COO': '并列关系',
		'POB': '介宾关系',
		'LAD': '左附加关系',
		'RAD': '右附加关系',
	    'IS': '独立结构',
		'HED': '核心关系',
		'WP': '标点符号'
		};
	

	function navDown(){
		// $fixTop.height(70);
		$cateNav.removeClass('slideup');
		$headerTopbar.removeClass('hide');
	}
	function navUp(){
		// $fixTop.height(70);
		$cateNav.addClass('slideup');
		$headerTopbar.addClass('hide');
	}
	function showNav(){
		$fixTop.on('mouseover', function() {
			//navDown();
		});
		// bind
		$fixTop.on('mouseout', function() {
			//navUp();
		})
	}
	$(document).on('click', '#fullPage-nav li', function() {
		var $index = $('#fullPage-nav li').index($(this))
		if($index === 0) {
			navDown();
		}
	});
	$('.col_3_wrap .show_tabs ul li').on('click', function(event) {
        event.preventDefault();
        $('.col_3_wrap .show_tabs ul li').removeClass('on');
        $(this).addClass('on');
        var tab_num = parseInt($(this).attr('data-tab'));
        $('.col3_tab').removeClass('show');
        $('.col3_tab' + tab_num).addClass('show');
    });

    $('#input_sec1').limitTextarea({
        maxNumber: 110, //最大字数
        position: 'bottom',
        //输入后，字数未超出时调用的函数
        onOk: function() {
            $('.txt_warm').fadeOut();
        },
        //输入后，字数超出时调用的函数，这里把文本区域的背景变为粉红色
        onOver: function() {
            $('.txt_warm').fadeIn();
            $('#input_sec1').val($('#input_sec1').val().substring(0, 110) + "...");
        }
    });

    $('#input_sec2_1').limitTextarea({
        maxNumber: 230, //最大字数
        position: 'bottom',
        //输入后，字数未超出时调用的函数
        onOk: function() {
            $('.txt_warm').fadeOut();
        },
        //输入后，字数超出时调用的函数，这里把文本区域的背景变为粉红色
        onOver: function() {
            $('.txt_warm').fadeIn();
            $('#input_sec2_1').val($('#input_sec2_1').val().substring(0, 230) + "...");
        }
    });

    $('#input_sec2_2').limitTextarea({
        maxNumber: 20, //最大字数
        position: 'bottom',
        //输入后，字数未超出时调用的函数
        onOk: function() {
            $('.txt_warm').fadeOut();
        },
        //输入后，字数超出时调用的函数，这里把文本区域的背景变为粉红色
        onOver: function() {
            $('.txt_warm').fadeIn();
            $('#input_sec2_2').val($('#input_sec2_2').val().substring(0, 20) + "...");
        }
    });

    $('.word.normal').hover(function() {
        $(this).removeClass('normal').addClass('hover');
        $(this).parent().find('.arc_arrow').addClass('hover');
    }, function() {
        $(this).removeClass('hover').addClass('normal');
        $(this).parent().find('.arc_arrow').removeClass('hover');
    });

	 $('.circle').hover(function() {
        $(this).find('circle').css({
            'transform': 'scale(1.2)'
        });
    }, function() {
        $(this).find('circle').css({
            'transform': 'scale(1)'
        });
    });

	$('.dependency_chart').on('click','.show_all',function(){
		$('.sentence_svg .link').show();
		$('.sentence_svg .sentence_speech_en').show();
	});

		$.fn.fullpage({
			'verticalCentered': false,
			'anchors': ['page1', 'page2', 'page3', 'page4', 'page5', 'page6'],
			'css3': true,
			'easing': 'easeInQuart',
        	'easingcss3': 'ease-in-out',
			'slidesColor': ['#3c8ed5', '#49aac7', '#68c39f', '#043d5d' ,'#3c8ed5','#0b2838'],
			'navigation': true,
			'navigationPosition': 'right',
			//'navigationTooltips': ['产品体验','词法类API', '句法类API', '篇章类API', '下载类API', '开始使用'],
			'menu': '#cate_nav',
			'normalScrollElements': '.analysis_wrap, .analysis_textarea, .result_words,	.detail , .result_sentence .text, .box_1_demo, .img_show, .box_2_demo, .text_show ',
			'resize' : false,

			'afterLoad': function(anchorLink, index){		// 滚动之后
				if(index == 1){
					// unbind
					$('.fix_top').off('mouseout');

				}
			},

			'onLeave': function(index, direction){			// 开始滚动
				showNav();

				if ( direction == 'down'){
					$('#section' + index).find('.mod_col_wrap').addClass('ani_col_1');
					$('#section' + index).find('.col_bg').addClass('ani_col_2');
				};

				if(index == 1 && direction == 'down'){
					$('#cate_nav').addClass('slideup');
					$('.header_topbar').addClass('hide');
				}else if(index == 2 && direction == 'up'){
					$('#cate_nav').removeClass('slideup');
					$('.header_topbar').removeClass('hide');
				}
			},
			'onSlideLeave': function(){
				//alert(1);
			},

			afterLoad: function(anchorLink, index){
				if (index == 2 && sectionMark[2] == 'no') {
					// get_words();
					sectionMark[2] = 'yes';
				}
				else if (index == 4 && sectionMark[4] == 'no') {
					get_sentiment();
					get_classes();
					get_keywords();
					sectionMark[4] = 'yes';
				}
				else if (index == 3 && sectionMark[3] == 'no') {
					get_synonyms();
					get_check();
					get_dependency();
					sectionMark[3] = 'yes';
				}
				else if (index == 5 && sectionMark[5] == 'no') {
					showImg(0);
					sectionMark[5] = 'yes';
				}
			},

			'afterRender': function(){
				
			}
		});

	/* 第五屏的tabs切换 */
		var num = 0;
		var $downNext = $('.col_5_tabs .next');
		var $downPrev = $('.col_5_tabs .prev');
		$('.col_5_tabs').addClass('current_0');

		$downNext.on('click', function() {
			$('.col_5_tabs ').removeClass('current_'+num);
			if (num <2) {
				num++;
			} else{
				num = 0;
			};
			$('.col_5_tabs ').addClass('current_'+num);
			if (num === 0) {
				$('.col_5_tabs .prev').hide();
			} else {
				$('.col_5_tabs .prev').show();
			}
		});

		$downPrev.on('click', function() {
			$('.col_5_tabs ').removeClass('current_'+num);
			if(num > 0){
				num--;
				$('.col_5_tabs ').addClass('current_'+num);
			}else{
				return false;
			}

			if (num === 0) {
				$('.col_5_tabs .prev').hide();
			} else {
				$('.col_5_tabs .prev').show();
			}
		});


	/* 第五屏 示例切换 */

		var demoLink =[ 'http://appz.hsw.cn/mb/Index/index/p/6',
						'http://fj.people.com.cn/GB/339045/341407/369088/index.html',
						'http://news.sina.com.cn/c/zg/ztx/2015-02-03/1409652.html',
						'http://zhidao.baidu.com/liuyan/detail?id=5798',
						'http://news.sina.com.cn/c/2015-02-02/095131470948.shtml',
						'http://news.sina.com.cn/c/2015-02-08/213531496784.shtml',
						'http://tp.zjol.com.cn/ydy/',
						'http://m.gmw.cn/2015-01/31/content_14698599.htm',
						'http://bbs.dahe.cn/read-htm-tid-992894973.htm',
						'http://bbs.hupu.com/11481459.html',
						'http://bbs.tianya.cn/list-828-1.shtml',
						'http://www.chinadaily.com.cn/business/2015-02/11/content_19551166.htm'];

		var demoLinkLength = demoLink.length;

		var template = function(n) {
			return '<img data-src="/public/wenzhi/data/p' + n + '.png" src="/public/wenzhi/data/reader_loading.gif" alt="">'
		}

		var html = '';
		for (var i = 0; i < demoLinkLength; i++) {
			//html += template(i + 1);
		}
		html += template(1);
		//$('.img_show').html(html);



		var obj_num = 0;
		//alert(obj_link);
		$('.search_btn').on('click',function(){
			$('.col_5_tabs').addClass('current_0').removeClass('current_2').removeClass('current_1');
			if ( obj_num < demoLink.length - 1 ) {
				obj_num++;
				num = 0;
			} else {
				obj_num = 0;

			}

			showImg(obj_num);

		});

		//showImg(0);

		function showImg(n) {
			

			$('.search_txt').val(demoLink[n]);
			var img = $('.img_show img').eq(n);
			img.show().siblings().hide();
			

			$.ajax({
				async:false,
				type:'post',
				url: '/public/wenzhi/api/get_con.php',
				dataType: 'json',
				data:{
					index: n
				},
				success:function(data){
					$('#phone_title_2').html(data["title"]);
					$('#mCSB_8_container').html(data["content"]);
					//$('#phone_web').html(data["phone"]);

					content = data["phone"];
					var array_con = content.split("/style>");
					var len = array_con.length;
					var ret = array_con[len-1];

					$('#phone_web').html(ret);
				}
			});
		}

		function autoDiv(){
			$(".section").height($(window).height());
			$(".col_bg").css('height',$(window).height());
		}
		$(window).resize(function(){
			autoDiv();
		})
		autoDiv();

	function checkDo(){
		var value = $('#input_stage').val();
		value = text_filter(value);

		var dat = {"text":value};
		$.ajax({
			async:true,
			type:'post',
			url: '/public/wenzhi/api/common_api1223.php',
			dataType: 'json',
			data:{
				'api':'4',
				'body_data': JSON.stringify(dat)
			},
			success:function(data){
				var temp = data["text_annotate"];
				var check_ret = temp.replace(/<em>/g, "<em class=\"focal\">");
				$('#check_ret').html(check_ret);
				$('#correction_right').html(data["text_annotate"]);
				var syn_value =  data["text"];
		    	var syn_dat = {"text":syn_value};
		    	var ret = '';

		    	var syn_src = '';
		    	var syn_des = '';

		    	$.ajax({
					async:true,
					type:'post',
					url: '/public/wenzhi/api/common_api1223.php',
					dataType: 'json',
					data:{
						'api':'3',
						'body_data': JSON.stringify(syn_dat)
					},
					success:function(data){
						var temp = data["syns"];
						var syn_ret = '';
						if (temp != undefined) {
							for (var i=0; i<temp.length; i++)
							{
								var value = temp[i];
								//console.log("value is:", value);
								var syns = value;
								//for (var j=0; j<syns.length; j++)
								//{
									//var syns_word = syns[j];
									var syns_word = syns;

									var word_ori = syns_word["word_ori"]["text"];
									//console.log("word_ori is:", word_ori);
									syn_ret += "<p class=\"result_sort_item\" ><b class=\"t\"><span class=\"w\">";
									syn_ret += word_ori;
									syn_ret += "</span><i class=\"l\"></i></b>";

									var word_syns = syns_word["word_syns"];
									for (var k=0; k<word_syns.length; k++)
									{
										var ret_word = word_syns[k]["text"];
										//console.log("ret_word is:", ret_word);
										if (k==0) {
											syn_ret += "<span class=\"w\">" + ret_word + '</span>';
										}
										else {
											syn_ret += "/<span class=\"w\">" + ret_word + '</span>';
										}
									}
									syn_ret += "</p>";
								//}
							}
						}
						//console.log("syn_ret", syn_ret);
						$('#syn_ret').html(syn_ret);
					}
				});
			}
		});
	}

	//$("#input_stage").keyup(function(){
	$('#input_stage').bind('input propertychange', function() {
		checkDo();
	});

	var $sec2Replaced = $('#sec2_replaced');
	var $sec2Clear = $('#sec2_clear');

	$sec2Clear.on('click', function() {
		$('#input_stage').val('');
		$('#check_ret').html('');

		var ret = '<p class="result_sort_item"></p>';
		$('#syn_ret').html(ret);
	});

	var senExam =['Craizer taylor swit',
					'zhongyangdianshitai',
					'联想5000左右的笔记本推荐',
					'LOL最厉害的hero',
					'北大piao亮mm',
					'半塘注意',
					'我是真的受了伤张学友',
					'dengnidenglenamejiu',
					'玲声多多一高an',
					'huazai的歌曲'
					];

	var senExamLength = senExam.length;
	var examNum = 0;
	$sec2Replaced.on('click', function() {
		if ( examNum < senExamLength - 1 ) {
			examNum++;
		} else {
			examNum = 0;
		}
		var wordInput = senExam[examNum];

		$('#input_stage').val(wordInput);
		checkDo();
	});


	//sec1
	//$("#input_sec1").keyup(function(){
	$('#input_sec1').bind('input propertychange', function() {
		// get_words();
	});


	var $sec1Replaced = $('#sec1_replaced');
	var $sec1Clear = $('#sec1_clear');

	$sec1Clear.on('click', function() {
		$('#input_sec1').val('');
		$('#wtype_ret').html('');
		$('#mCSB_2_container').html('');
	});

	var se1Exam =['央视网消息(新闻联播)：省部级主要领导干部学习贯彻十八届四中全会精神全面推进依法治国专题研讨班2日在中央党校开班。中共中央总书记、国家主席、中央军委主席习近平在开班式上发表重要讲话。',
					'由华夏视听出品，于正工作室承制，陈晓、陈妍希领衔主演的群星璀璨大戏《神雕侠侣》正在湖南卫视热播。随着故事剧情层层深入地铺陈展开，之前被戏谑为“小笼包”的小龙女陈妍希也凭借着暖萌的演技获得了许多观众的喜爱。',
					'刚刚在英国完成大婚的周杰伦，又有新消息传来。不过，不是粉丝们翘首以盼的“昆凌有喜”的信息，而是第四季《中国好声音》公布首位导师，周董确认加盟，成为“好声音”史上第八位导师。',
					'去年南京人购买最多的文学书籍中，有一本书也特别打眼，那就是马尔克斯的《百年孤独》。其中，凤凰书城的总榜单中，《百年孤独》排列第三， 先锋书店的总榜单中，《百年孤独》排列第五。',
					'洛克王国龙之谷，王国龙是谁',
					'北京市长春酒店',
					'中外科学名著'];

	var se1ExamLength = se1Exam.length;
	var se1ExamNum = 0;
	$sec1Replaced.on('click', function() {
		if ( se1ExamNum < se1ExamLength - 1 ) {
			se1ExamNum++;
		} else {
			se1ExamNum = 0;
		}
		var sec1Input = se1Exam[se1ExamNum];
		$('#input_sec1').val(sec1Input);
		// get_words();
	});





	// function get_words(){
	// 	var txt = $('#input_sec1').val();
	// 	txt = text_filter(txt);

	// 	$.ajax({
	// 		async:true,
	// 		type:'post',
	// 		url: '/api/thulac',
	// 		dataType: 'json',
	// 		data:{
	// 			'api':'2',
	// 			'body_data': JSON.stringify({"token":qC7pRO8LH912194p36DH, "text":txt,"type":1})
	// 		},
	// 		success:function(data){
	// 			var temp = data["tokens"];
	// 			var word_ret = '';
	// 			var wtype_ret = '';
	// 			var first_wtype = "True";

	// 			var count = new Array();

	// 			for (var i=0; i<temp.length; i++)
	// 			{
	// 				var value = temp[i];
	// 				var word = value["word"];
	// 				word = word.replace(/(^\s*)|(\s*$)/g, "");
	// 				var wtype = value["wtype"];

	// 				if (count.hasOwnProperty(wtype)) {
	// 					count[wtype] = count[wtype] + 1;
	// 				}
	// 				else {
	// 					count[wtype] = 1;
	// 				}

	// 				if(wtype_ret.indexOf(wtype) >= 0 ) {
	// 				}
	// 				else {
	// 					wtype_ret += "<a href=\"#\" onclick=\"select_type(this)\" title='" + wtype + "'>" + wtype +"</a>";
	// 				}
	// 				if (word.length > 0){
	// 					word_ret += '<span class="txt_bor normal" onclick="select_wtype(this)" option-data="' + wtype + '">' + word + '</span>';
	// 				}
	// 			}
	// 			var maxTypeNum = 0;
	// 			var maxType = '';
	// 			for (var key in count){
	// 				if (count[key] > maxTypeNum) {
	// 					maxType = key;
	// 					maxTypeNum = count[key];
	// 				}
	// 			}
	// 			//console.log(maxType, "--", maxTypeNum);

	// 			$('#wtype_ret').html(wtype_ret);
	// 			$('#mCSB_2_container').html(word_ret);

	// 			var $cur = $('.mod_result_content .current');
	// 			var cur_len = $cur.length;
	// 			if (cur_len == 0) {
	// 				//el = $('#first_mark');
	// 				el = $('[title="' + maxType + '"]')
	// 				select_type(el);
	// 			}
	// 		}
	// 	});
	// }

	$('.dependency_text').on('click','a',function(){
		var title = $(this).attr('title');
		$(this).siblings('.current').removeClass('current');
		$(this).addClass('current');
		$('.arc_arrow').hide();
		$('.'+title).show();
		$('.sentence_svg .link').hide();
		$('.sentence_svg .sentence_speech_en').hide();
		$('[data-relation="' + title + '"]').show();
	});

	/* $('.dependency_chart').on('mouseover','rect',function(){
		console.log("23");
		$('.dependency_chart rect').attr('stroke-width',"0");
		console.log($(this).siblings('rect'));
		$(this).siblings('rect').attr('stroke-width',"2");
	}); */
	$('.dependency_chart').on('click','rect',function(){
		cur_id = $('rect').index($(this));
		
		//$('.arc_arrow').hide();
		//$('.'+title).show();
		$('.sentence_svg .link').hide();
		$('.sentence_svg .sentence_speech_en').hide();
		$('[data-from="' + cur_id + '"]').show();
		$('[data-to="' + cur_id + '"]').show();
		$('.dependency_text a').removeClass('current')
		$('[data-from="' + cur_id + '"]').each(function(){
			title = $(this).data('relation')
			$('[title="'+title+'"]').addClass('current');
		});
		$('[data-to="' + cur_id + '"]').each(function(){
			title = $(this).data('relation')
			$('[title="'+title+'"]').addClass('current');
		});
		
	});
	$('.dependency_chart').on('click','text',function(){
		cur_id = $('text').index($(this));
		cur_id = cur_id / 2;
		
		//$('.arc_arrow').hide();
		//$('.'+title).show();
		$('.sentence_svg .link').hide();
		$('.sentence_svg .sentence_speech_en').hide();
		$('[data-from="' + cur_id + '"]').show();
		$('[data-to="' + cur_id + '"]').show();
		$('.dependency_text a').removeClass('current');
		$('[data-from="' + cur_id + '"]').each(function(){
			title = $(this).data('relation')
			$('[title="'+title+'"]').addClass('current');
		});
		$('[data-to="' + cur_id + '"]').each(function(){
			title = $(this).data('relation')
			$('[title="'+title+'"]').addClass('current');
		});
		
	});
	
	
	//sec2_1 synon+check
	$('#input_sec2_1').bind('input propertychange', function() {
		get_synonyms();
		get_check();
	});

	var $sec2_1Replaced = $('#sec2_1_replaced');
	var $sec2_1Clear = $('#sec2_1_clear');

	$sec2_1Clear.on('click', function() {
		$('#input_sec2_1').val('');
		$('.check_text').children().children().html('');
		$('.synonyms_text').children().children().html('');
	});

	var se2_1Exam =['刚刚在英国完成大婚的周杰伦，又有新消息传来。',
					'去年南京人购买最多的文学书籍中，有一本书也特别打眼',
					'洛克王国龙之谷，王国龙是谁',
					'北京市长春酒店',
					'我只想每天起来睡交吃饭。'];

	var se2_1ExamLength = se2_1Exam.length;
	var se2_1ExamNum = 0;
	$sec2_1Replaced.on('click', function() {
		if ( se2_1ExamNum < se2_1ExamLength - 1 ) {
			se2_1ExamNum++;
		} else {
			se2_1ExamNum = 0;
		}
		var sec2_1Input = se2_1Exam[se2_1ExamNum];
		$('#input_sec2_1').val(sec2_1Input);
		get_synonyms();
		get_check();
	});



	//sec2_2 dependency
	$('#input_sec2_2').bind('input propertychange', function() {
		get_dependency();
	});

	var $sec2_2Replaced = $('#sec2_2_replaced');
	var $sec2_2Clear = $('#sec2_2_clear');

	$sec2_2Clear.on('click', function() {
		$('#input_sec2_2').val('');
		$('.dependency_chart').html('');
		$('.dependency_text').html('');
	});
	var se2_2Exam =['荷兰足球巨星克鲁伊夫因癌症病逝 享年68岁',
					'旅客因藏匿6个柠檬被新西兰海关拒绝入境',
					'外交部就习近平出席核安全峰会举行吹风会',
					'科尔曝球员决定是否轮休 库里称单打乔丹很有趣',
					'高科生物一名董事因涉疫苗案被福建警方控制'];

	var se2_2ExamLength = se2_2Exam.length;
	var se2_2ExamNum = 0;
	$sec2_2Replaced.on('click', function() {
		if ( se2_2ExamNum < se2_2ExamLength - 1 ) {
			se2_2ExamNum++;
		} else {
			se2_2ExamNum = 0;
		}
		var sec2_2Input = se2_2Exam[se2_2ExamNum];
		$('#input_sec2_2').val(sec2_2Input);
		get_dependency();
	});

	/*
	var se3ExamLength = se3Exam.length;
	var se3ExamNum = 0;
	$sec3Replaced.on('click', function() {
		if ( se3ExamNum < se3ExamLength - 1 ) {
			se3ExamNum++;
		} else {
			se3ExamNum = 0;
		}
		var sec3Input = se3Exam[se3ExamNum];
		$('#input_sec3').val(sec3Input);
		get_sentiment();
		get_classes();
		get_keywords();
	});
	 */


	//sec3
	//$("#input_sec3").keyup(function(){
	$('#input_sec3').bind('input propertychange', function() {
		get_sentiment();
		//get_keywords();
		get_classes();
		get_keywords();
	});

	var $sec3Replaced = $('#sec3_replaced');
	var $sec3Clear = $('#sec3_clear');

	$sec3Clear.on('click', function() {
		$('#input_sec3').val('');
		$('#keywords_ret').html('');
		$('#classes_ret').html('');
		var temp = "50%";
		var ret_temp = "负面 50%";
		$('.plan_l').width(temp);
		$('.plan_r').width(temp);
		$('.txt_l').html(ret_temp);
		$('.txt_r').html(ret_temp);
	});

	var se3Exam =[  '苹果推出了新版iOS系统可以帮助iPhone做好准备，迎接Apple Watch的到来。但除此之外，该系统还修复了最近发现的FREAK安全漏洞。即使iPhone用户对Apple Watch不感兴趣，仍然应当出于安全考虑而安装iOS 8.2系统。该漏洞可能影响多款设备的浏览器，包括iOS、OSX和Apple TV。',
					'最终的投票结果显示，梅西获得了其中47.7%的选票，第二名C罗获得29.8%的选票。随后几名球员的得票率则很低，甚至没有一人能超过5%，其中内马尔得到了4.3%的投票排名第3，苏亚雷斯的得票率为3.8%排在第4，伊布获得了3.4%的票数，而来自德甲的莱万多夫斯基只获得了2.1%的投票。',
					'贾静雯2015年嫁给小9岁的修杰楷，婚后生下女儿咘咘，爱女可爱的萌样短时间内成为外界关注的焦点，甚至在出演亲子节目后，被封为“最小网红”，每次出现都成为话题，22日贾静雯又在脸书贴出了爱女的近照，被发现“越大越像修杰楷”，暴风成长引起许多粉丝讨论。贾静雯22日在脸书贴出两张咘咘的近照，表示女儿最近越来越不喜欢在头发夹上发夹，只见母女俩直勾勾地盯着镜头，爱女的手伸到头上，似乎“耍叛逆”想要将发饰扯下来，尽管如此她可爱的表情依旧是网友关注的焦点，有不少粉丝发现咘咘的脸颊肉看起来消风不少，已经渐渐散发出小萝莉的气息。然而，在贾静雯贴出的另一张照片中，只见咘咘以45度角面对镜头，从侧面看来她的五官突出，被不少网友发现越来越像爸爸修杰楷了，刚好照片中她的大拇指伸出来，就像在“比赞”表示认同一样，逗趣的模样不仅让贾静雯笑歪，让令大批网友再度融化于咘咘的魅力之中。',
					'随着VR技术的火热发展，互联网的大佬们都纷纷踏入了VR行业，创立了自己的产业生态链，扎克伯格说虚拟现实会成未示来的科技趋势，马化腾说颠覆微信的可能是VR，即使这样，还是有人不看好虚拟现实这个行业，例如，罗比.巴赫就表示对VR普及这方面不看好，而且这么说也不止他一个人，那么，为什么VR在这么火热发展的情况下还会有人唱反调，而看好VR行业的互联网大佬们在这个VR领域中都做了些什么等等问题都值得我们思虑。',
					'今日有人爆料：《爱情公寓5》即将开拍，陈赫因离婚出轨丑闻将不再出演，你心中认为谁更适合曾小贤这个角色？《爱情公寓》系列曾是“假期金牌节目”！没看到《爱情公寓》就如同没有放假一样，已经大红大紫的四季让人也无限期待第五部的开拍。可是天意弄人，就在眼看《爱5》要来之际，王牌曾小贤的扮演者陈赫却发生了离婚，出轨等负面新闻，所以《爱5》的拍摄以及人员一直是人们的关注点。之前爆料也是满天飞，有说子乔将不出演的；有说张翰刘诗诗要加盟《爱5》的；有说剧中胡一菲怀孕生子或变成现实的；如今又说曾小贤将换人……这动荡的娱乐圈什么时候能让人不心塞了呢！关于曾小贤的新人选，貌似，林丹的呼声最高~~~~~泥闷这样真的好么！！！把周杰伦放在什么位置了！！！！！【诶？有差吗？】曾小贤这个角色，你同意换人吗？如果要换的话，你觉得谁来饰演比较合适呢？',
					'"新年伊始，不少食品登上抽检“黑榜”。昨日本报从国家食品药品监督管理总局官网获悉，其公布的2015年第二期食品安全监督抽检信息显示，共抽检肉及肉制品样品2473批次，合格率为95%，55批次产品不合格；在被检测的食用油、油脂及制品中,21批次品牌产品被检出不合格，一线食用油品牌基本检查过关。"',
					'中国的景观旅游资源相当丰富。这些风景名胜区从不同的角度可以有不同的划分，以其主要景观的不同，大体上可分为如下八种类型：1.湖泊风景区（白洋淀、杭州西湖、武汉东湖，新疆天山天池、青海湖) 2.山岳风景区（燕山、泰山、衡山、华山、阿里山) 3.森林风景区(西双版纳、湖南张家界、四川卧龙、湖北神农架） 4.山水风景区(桂林漓江、长江三峡、武夷九曲溪） 5.海滨风景区(海南天涯海角、厦门、大连) 6.休闲疗养避暑胜地(河北北戴河、江西庐山) 7.宗教寺庙名胜区（九华山、敦煌莫高窟、洛阳龙门、嵩山、武当山等） 8.革命纪念地(延安、涉县、西柏坡、遵义)。',
					'活在北京这种节奏快浮躁的城市 不需要看沿途的风景 每天带上耳机 听听音乐 踏踏实实做好为梦想的一点一滴 然后在对的时间 带着对的人 一起去远方旅行 没有喧嚣 没有世俗 执子之手 与子偕老 这个社会人往往拥有的少 才会发现更多的幸福 有钱了 人往往迷失在路上 世界变化万千 望每个走在路上的双子不忘初心。',
					'胡萝卜鸡蛋海苔卷。材料：胡萝卜、鸡蛋、海苔（紫菜片也可）、大葱、盐。做法：胡萝卜切碎丁，鸡蛋搅碎，大葱切碎，三者搅拌到一起，加适量盐和酱油。平底锅抹油（为了控热不要放太多，最好有不粘锅）后，摊成蛋饼，在蛋饼上盖海苔片，用锅勺卷两次后成蛋卷。出锅切块装盘，可以撒点肉松。',
					'湖人总经理米奇-库普切克说，科比-布莱恩特不再是球队重建核心，湖人未来一个赛季不会围绕他进行重建。科比本人对此如何反应呢？据《洛杉矶每日新闻》报道，科比坦承和库总沟通过，库总说的也是他自己的意思。易言之，科比已经接受湖人重建现状，放弃作为重建核心，放弃总冠军目标。',
					'拥有财富、名声、势力，拥有整个世界的海贼王 – 哥尔罗杰，他在临刑前的一句话，让人们趋之若鹜奔向大海。“想要我的财宝吗？想要的话可以全部给你，去找吧！我把所有财宝都放在那里。”于是所有男子汉航向伟大的航道追逐梦想，让世界迎接“大海贼时代”。'
					];

	var se3ExamLength = se3Exam.length;
	var se3ExamNum = 0;
	$sec3Replaced.on('click', function() {
		if ( se3ExamNum < se3ExamLength - 1 ) {
			se3ExamNum++;
		} else {
			se3ExamNum = 0;
		}
		var sec3Input = se3Exam[se3ExamNum];
		$('#input_sec3').val(sec3Input);
		get_sentiment();
		get_classes();
		get_keywords();
	});

	function get_sentiment(){
		var text = $('#input_sec3').val();
		text = text_filter(text);

		var dat = {"content":text};
		$.ajax({
			async:true,
			type:'post',
			url: '/public/wenzhi/api/common_api1223.php',
			dataType: 'json',
			data:{
				'api':'6',
				'body_data': JSON.stringify(dat)
			},
			success:function(data){
				var negative = (Math.round(data["negative"]*100)).toString() + "%";
				var positive = (Math.round(data["positive"]*100)).toString() + "%";

				$('.plan_l').width(negative);
				$('.plan_r').width(positive);
				var ret_neg = "负面 " + negative;
				var ret_pos = "正面 " + positive;
				$('.txt_l').html(ret_neg);
				$('.txt_r').html(ret_pos);
			}
		});
	}

	function get_check(){
		var text = $('#input_sec2_1').val();
		text = text_filter(text);

		var dat = {"text":text};
		$.ajax({
			async:true,
			type:'post',
			url: '/public/wenzhi/api/common_api1223.php',
			dataType: 'json',
			data:{
				'api':'4',
				'body_data': JSON.stringify(dat)
			},
			success:function(data){
				check_ret = data["text_annotate"];
				check_ret = check_ret.replace('<em>','<em class="focal">');
				$('.check_text').children().children().html(check_ret);
			}
		});
	}

	function get_synonyms(){
		var text = $('#input_sec2_1').val();
		text = text_filter(text);

		var dat = {"text":text};
		$.ajax({
			async:true,
			type:'post',
			url: '/public/wenzhi/api/common_api1223.php',
			dataType: 'json',
			data:{
				'api':'3',
				'body_data': JSON.stringify(dat)
			},
			success:function(data){
				synonyms_ret = data["syns"];
			    synonyms_tpl = '<p class="synonyms_item">{ori} —— {syns}</p>';
				$('.synonyms_text').children().children().empty();
				if(synonyms_ret instanceof Array){
					for(var i = 0; i<synonyms_ret.length; i++){
						var temp = synonyms_ret[i];
						var temp_ori  = temp["word_ori"]["text"];
						var temp_syns = temp["word_syns"][0]["text"];
						var temp_tpl  = synonyms_tpl.replace("{ori}",temp_ori).replace("{syns}",temp_syns);
						$('.synonyms_text').children().children().append(temp_tpl);
					}
				}
			},
			error:function(data){
				synonyms_ret = data["syns"];
			    synonyms_tpl = '<p class="synonyms_item">{ori} —— {syns}</p>';
				$('.synonyms_text').children().children().empty();
				if(synonyms_ret instanceof Array){
					for(var i = 0; i<synonyms_ret.length; i++){
						var temp = synonyms_ret[i];
						var temp_ori  = temp["word_ori"]["text"];
						var temp_syns = temp["word_syns"][0]["text"];
						var temp_tpl  = synonyms_tpl.replace("{ori}",temp_ori).replace("{syns}",temp_syns);
						$('.synonyms_text').children().children().append(temp_tpl);
					}
				}
			}
		});
	}


	function get_dependency(){
		var text = $('#input_sec2_2').val();
		text = text_filter(text);

		var dat = {"content":text};
		$.ajax({
			async:true,
			type:'post',
			url: '/public/wenzhi/api/common_api1223.php',
			dataType: 'json',
			data:{
				'api':'11',
				'body_data': JSON.stringify(dat)
			},
			success:function(data){
				var url_obj   = {"nodes":[],"links":[]};
				var node_obj  = {};
				var links_obj = {};
				var dep_link_array = {};
				keywords_ret  = data["keywords"];
				if(keywords_ret instanceof Array){
					$('.dependency_chart').empty();
					deps = keywords_ret[0];
					node_obj = {"word": "root","pos": "","class": "root"};
					url_obj.nodes.push(node_obj);

					for(var i =0; i<deps.length; i++){
						node_obj = {};
						links_obj = {};
						node_obj["word"] = deps[i]["word"];
						node_obj["pos"] = base_attr_array[deps[i]["postag"]];
						node_obj["class"] = "term";
						links_obj["target"] = deps[i]["id"];
						links_obj["source"] = deps[i]["father_id"];
						links_obj["relation"] = deps[i]["dep_rel"];

						url_obj.nodes.push(node_obj);
						url_obj.links.push(links_obj);

						tmp_dep_rel   = deps[i]["dep_rel"];
						dep_link_array[tmp_dep_rel] = dep_link_array[tmp_dep_rel] || [];
						dep_link_array[tmp_dep_rel].push(i);
					}
					$('.dependency_text').children().empty();
					dep_rel_tpl = '<a href="#" title="{dep_rel}">{dep_rel}-{dep_chn}</a>';
					for( dep_rel in dep_link_array){
						var temp_dep_rel = dep_rel_tpl.replace(/{dep_rel}/g,dep_rel).replace('{dep_chn}',base_dep_rel_array[dep_rel]);
						$('.dependency_text').children().append(temp_dep_rel);
					}
				}
				$('.dependency_chart').append('<a href="##" class="show_all">显示全部</a>');

				url = encodeURIComponent(JSON.stringify(url_obj));
				DrawGraph(url);

				return;

				keywords_ret = data["keywords"];
				dep_rel_array  = [];
				dep_link_array = {};
				var width  = 0;
				var from_x = 0;
				var top_x  = 0;
				var top_y  = 0;
				var target_x = 0;
				var top    = 0;

				svg_html_tpl = '<div class="arc_arrow active {dep}"><svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" width="{width}px" height="136px" viewBox="0 0 {width} 136">'+
                        '<defs><marker id="Arrow" markerWidth="5" markerHeight="5" viewBox="-6 -6 12 12" refX="-2" refY="0" markerUnits="strokeWidth" orient="auto"><polygon points="-2,0 -5,5 5,0 -5,-5" fill="#249a0d" stroke="transparent" stroke-width="2px"></polygon></marker></defs>'+
                        '<path d="M {from_x},130 Q {top_x},{top_y} {target_x},130" stroke="#249a0d" fill="none" stroke-width="2px" marker-end="url(#Arrow)"></path></svg>'+
                        '<p class="word_name word_name_vob" style="top:{top}px">{dep}</p></div>';
				word_root_tpl = '<div class="word_wrap"><span class="root">Root</span></div>';
				word_wrap_tpl = '<div class="word_wrap"><a href="##" class="word normal">{word}</a><span class="word_attr">{attr}</span></div>';
				if(keywords_ret instanceof Array){
					$('.dependency_chart').empty();
					$('.dependency_chart').append(word_root_tpl);
					deps = keywords_ret[0];
					for(var i = 0; i < deps.length; i++){
						var tmp_dep_rel   = deps[i]["dep_rel"];
						var tmp_father_id = deps[i]["father_id"];
						var tmp_id        = deps[i]["id"];
						var tmp_postag    = deps[i]["postag"];
						var tmp_word      = deps[i]["word"];
						direction = tmp_father_id > tmp_id ? 'reverse' : 'straight';
						//console.log(tmp_father_id+'+'+tmp_id);
						abs       = Math.abs(tmp_father_id - tmp_id);
						//console.log(direction+abs);
						if(direction == 'straight'){
							from_x = 25-abs;
							target_x = 25-abs+ 35*abs+0.6*abs*abs;
							target_x = abs>6 ? target_x + 20: target_x;
						}else{
							target_x = 25-abs;
							from_x   = 25-abs+ 35*abs+0.6*abs*abs;
							from_x   = abs>6 ? form_x + 20 : from_x;
						}
						if(tmp_father_id == 0){
							target_x += 30;
						}
						top   = 90-10*abs;
						top   = Math.max(-3,top);
						top_x = (from_x + target_x)/2;
						top_y = 120-20*abs;
						top_y = Math.max(-100,top_y);

						width = Math.abs(from_x-target_x) + 35;


						var tmp_svg_html  = svg_html_tpl.replace(/{dep}/g,tmp_dep_rel).replace(/{width}/g,width).replace('{from_x}',from_x).replace('{target_x}',target_x).replace('{top_x}',top_x).replace('{top_y}',top_y).replace('{top}',top);
						var temp_word_wrap = word_wrap_tpl.replace('{word}',tmp_word).replace('{attr}',base_attr_array[tmp_postag]);
						$('.dependency_chart').append(temp_word_wrap);
						if(direction == 'straight'){
							$($('.dependency_chart .word_wrap').get(tmp_father_id)).append(tmp_svg_html);
						}else{
							$($('.dependency_chart .word_wrap').get(tmp_id)).append(tmp_svg_html);
						}
						dep_link_array[tmp_dep_rel] = dep_link_array[tmp_dep_rel] || [];
						dep_link_array[tmp_dep_rel].push(i);
					}
					$('.dependency_text').children().empty();
					dep_rel_tpl = '<a href="#" title="{dep_rel}">{dep_rel}-{dep_chn}</a>';
					for( dep_rel in dep_link_array){
						var temp_dep_rel = dep_rel_tpl.replace(/{dep_rel}/g,dep_rel).replace('{dep_chn}',base_dep_rel_array[dep_rel]);
						$('.dependency_text').children().append(temp_dep_rel);
					}


				}
			}
		});
	}

	function get_keywords(){
		var text = $('#input_sec3').val();
		text = text_filter(text);

		var dat = {"content":text,"title":text};
		$.ajax({
			async:true,
			type:'post',
			url: '/public/wenzhi/api/common_api1223.php',
			dataType: 'json',
			data:{
				'api':'5',
				'body_data': JSON.stringify(dat)
			},
			success:function(data){
        $('.circle').hide();
				var temp = data["keywords"];
				if(!temp[0]){
					temp = [{"keyword":"无关键词","score":1,"type":"keyword"}];
				}
				var keywords_ret = '';
				for (var i=0; i<temp.length; i++)
				{
					var value = temp[i];
					var keyword = value["keyword"];
					var score   = value["score"];
					$($('.circle').find('circle').get(i)).attr("r",Math.sqrt(score*100)*6);
					$($($('.circle').get(i)).find('tspan').get(0)).text(keyword);
					$($($('.circle').get(i)).find('tspan').get(1)).text(parseInt(score*100)+'%');

          $($('.circle').get(i)).show();
					/* if (i == 0) {
						keywords_ret += '<i class="icon_main icon_clock"></i><span class="text">' + keyword + '</span>';
					}
					else {
						keywords_ret += '<span>&nbsp</span><span class="text">' + keyword + '</span>';
					} */
				}
				$('#keywords_ret').html(keywords_ret);
			}
		});
	}

	function get_classes(){
		var text = $('#input_sec3').val();
		text = text_filter(text);

		var dat = {"content":text};
		$.ajax({
			async:false,
			type:'post',
			url: '/public/wenzhi/api/common_api1223.php',
			dataType: 'json',
			data:{
				'api':'7',
				'body_data': JSON.stringify(dat)
			},
			success:function(data){
				var temp = data["classes"];
				temp.sort(function(a, b) { return a.conf < b.conf ? 1 : -1;} );
            	var date_arr = [];

				var len = temp.length > 3 ? 3 : temp.length;
				var total_score = 0;
				for (var i=0; i<len; i++)
				{
					var value = temp[i];
					total_score += value["conf"];
				}
				for (var i=0; i<len; i++)
				{
					var value = temp[i];
					var class_name = value["class"];
					var score = value["conf"];
					var temp_arr = [];
					//var pro = parseFloat(score)/parseFloat(total_score);
					if ( score>0.01 ) {
						temp_arr.push(class_name);
						temp_arr.push(score);
						date_arr.push(temp_arr);
					}

				}
				//--------------highchart pie begin------------
				$('#classes_ret').highcharts({
	                chart: {
	                	backgroundColor: null,
	                    plotBackgroundColor: null,
	                    plotBorderWidth: null,
	                    plotShadow: false
	                },
	                exporting:{
	                    enabled: false
	                },
	                title:{
	                    text:null
	                },
	                colors: ['#F9C332', '#1DE05F', '#287DE7'],
	                tooltip: {
	                	enabled: false,
	                    pointFormat: '{point.percentage:.1f}%</b>'
	                },
	                plotOptions: {
	                    pie: {
	                        allowPointSelect: true,
	                        size: '50%',
	                        cursor: 'pointer',
	                        dataLabels: {
	                            enabled: true,
	                            color: '#FFFFFF',
	                            connectorColor: '#FFFFFF',
								style: {fontSize:"13px",fontWeight:"normal"},
	                            connectorPadding: 2,
	                            connectorWidth:0.5,
	                            distance:25,
	                            format: '{point.name}<br>{point.percentage:.1f}%'
	                        }
	                    }
	                },
	                legend: {
	                        layout: 'horizontal',
	                        align: 'left',
	                        verticalAlign: 'top',
	                        floating: true,
	                        borderWidth: 1,
	                        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
	                        shadow: true,
	                        reversed:true
	                },
	                credits:{
	                    enabled: false
	                },
	                series: [{
	                    type: 'pie',
	                    name: 'Browser share',
	                    innerSize:80,
	                    data: date_arr
	                }]
	            });

				$('.show_single_wrap>text').removeAttr("style").attr("style", "font-family: 'microsoft yahei', tahoma, Arial, 'hiragino sans gb', 'microsoft yahei', sans-serif; font-size:13px;font-weight:normal;color:#9ebfd8;line-height:13px;fill:#FFFFFF;");
				$('tspan').removeAttr("style").addClass('txt_r');
				//$('tspan').removeAttr("style").addClass('text');
				//--------------highchart pie end--------------
			}
		});
	}

	function text_filter(text){
		text = text.replace(/<[\/\s]*(?:(?!div|br)[^>]*)>/g, '');
		text = text.replace(/<\s*div[^>]*>/g, '<div>');
		text = text.replace(/<[\/\s]*div[^>]*>/g, '</div>');
		return text;
	}

	$('.dependency_chart').empty();
//DrawGraph('%7B%22nodes%22%3A%5B%7B%22word%22%3A%22root%22%2C%22pos%22%3A%22%22%2C%22class%22%3A%22root%22%7D%2C%7B%22word%22%3A%22%5Cu53bb%5Cu5e74%22%2C%22pos%22%3A%22%5Cu65f6%5Cu95f4%5Cu8bcd%22%2C%22class%22%3A%22term%22%7D%2C%7B%22word%22%3A%22%5Cu5357%5Cu4eac%5Cu4eba%22%2C%22pos%22%3A%22%5Cu540d%5Cu8bcd%22%2C%22class%22%3A%22term%22%7D%2C%7B%22word%22%3A%22%5Cu8d2d%5Cu4e70%22%2C%22pos%22%3A%22%5Cu52a8%5Cu8bcd%22%2C%22class%22%3A%22term%22%7D%2C%7B%22word%22%3A%22%5Cu6700%5Cu591a%22%2C%22pos%22%3A%22%5Cu5f62%5Cu5bb9%5Cu8bcd%22%2C%22class%22%3A%22term%22%7D%2C%7B%22word%22%3A%22%5Cu7684%22%2C%22pos%22%3A%22%5Cu52a9%5Cu8bcd%22%2C%22class%22%3A%22term%22%7D%2C%7B%22word%22%3A%22%5Cu6587%5Cu5b66%22%2C%22pos%22%3A%22%5Cu540d%5Cu8bcd%22%2C%22class%22%3A%22term%22%7D%2C%7B%22word%22%3A%22%5Cu4e66%5Cu7c4d%22%2C%22pos%22%3A%22%5Cu540d%5Cu8bcd%22%2C%22class%22%3A%22term%22%7D%2C%7B%22word%22%3A%22%5Cu4e2d%22%2C%22pos%22%3A%22%5Cu65b9%5Cu4f4d%5Cu8bcd%22%2C%22class%22%3A%22term%22%7D%2C%7B%22word%22%3A%22%2C%22%2C%22pos%22%3A%22%5Cu6807%5Cu70b9%5Cu7b26%5Cu53f7%22%2C%22class%22%3A%22term%22%7D%2C%7B%22word%22%3A%22%5Cu6709%22%2C%22pos%22%3A%22%5Cu52a8%5Cu8bcd%22%2C%22class%22%3A%22term%22%7D%2C%7B%22word%22%3A%22%5Cu4e00%22%2C%22pos%22%3A%22%5Cu6570%5Cu8bcd%22%2C%22class%22%3A%22term%22%7D%2C%7B%22word%22%3A%22%5Cu672c%22%2C%22pos%22%3A%22%5Cu91cf%5Cu8bcd%22%2C%22class%22%3A%22term%22%7D%2C%7B%22word%22%3A%22%5Cu4e66%22%2C%22pos%22%3A%22%5Cu540d%5Cu8bcd%22%2C%22class%22%3A%22term%22%7D%2C%7B%22word%22%3A%22%5Cu540d%5Cu5b57%22%2C%22pos%22%3A%22%5Cu540d%5Cu8bcd%22%2C%22class%22%3A%22term%22%7D%2C%7B%22word%22%3A%22%5Cu662f%22%2C%22pos%22%3A%22%5Cu52a8%5Cu8bcd%22%2C%22class%22%3A%22term%22%7D%2C%7B%22word%22%3A%22%5Cu300a%22%2C%22pos%22%3A%22%5Cu6807%5Cu70b9%5Cu7b26%5Cu53f7%22%2C%22class%22%3A%22term%22%7D%2C%7B%22word%22%3A%22%5Cu56f4%5Cu57ce%22%2C%22pos%22%3A%22%5Cu540d%5Cu8bcd%22%2C%22class%22%3A%22term%22%7D%2C%7B%22word%22%3A%22%5Cu300b%22%2C%22pos%22%3A%22%5Cu6807%5Cu70b9%5Cu7b26%5Cu53f7%22%2C%22class%22%3A%22term%22%7D%5D%2C%22links%22%3A%5B%7B%22target%22%3A1%2C%22source%22%3A2%2C%22relation%22%3A%22ATT%22%7D%2C%7B%22target%22%3A2%2C%22source%22%3A3%2C%22relation%22%3A%22SBV%22%7D%2C%7B%22target%22%3A3%2C%22source%22%3A8%2C%22relation%22%3A%22ATT%22%7D%2C%7B%22target%22%3A4%2C%22source%22%3A7%2C%22relation%22%3A%22ATT%22%7D%2C%7B%22target%22%3A5%2C%22source%22%3A4%2C%22relation%22%3A%22RAD%22%7D%2C%7B%22target%22%3A6%2C%22source%22%3A7%2C%22relation%22%3A%22ATT%22%7D%2C%7B%22target%22%3A7%2C%22source%22%3A3%2C%22relation%22%3A%22VOB%22%7D%2C%7B%22target%22%3A8%2C%22source%22%3A10%2C%22relation%22%3A%22ADV%22%7D%2C%7B%22target%22%3A9%2C%22source%22%3A8%2C%22relation%22%3A%22WP%22%7D%2C%7B%22target%22%3A10%2C%22source%22%3A15%2C%22relation%22%3A%22SBV%22%7D%2C%7B%22target%22%3A11%2C%22source%22%3A12%2C%22relation%22%3A%22ATT%22%7D%2C%7B%22target%22%3A12%2C%22source%22%3A13%2C%22relation%22%3A%22ATT%22%7D%2C%7B%22target%22%3A13%2C%22source%22%3A14%2C%22relation%22%3A%22ATT%22%7D%2C%7B%22target%22%3A14%2C%22source%22%3A10%2C%22relation%22%3A%22VOB%22%7D%2C%7B%22target%22%3A15%2C%22source%22%3A0%2C%22relation%22%3A%22HED%22%7D%2C%7B%22target%22%3A16%2C%22source%22%3A17%2C%22relation%22%3A%22WP%22%7D%2C%7B%22target%22%3A17%2C%22source%22%3A15%2C%22relation%22%3A%22VOB%22%7D%2C%7B%22target%22%3A18%2C%22source%22%3A17%2C%22relation%22%3A%22WP%22%7D%5D%7D');
//DrawGraph('%7B%22nodes%22%3A%5B%7B%22word%22%3A%22root%22%2C%22pos%22%3A%22%22%2C%22class%22%3A%22root%22%7D%2C%7B%22word%22%3A%22%5Cu53bb%5Cu5e74%22%2C%22pos%22%3A%22%5Cu65f6%5Cu95f4%5Cu8bcd%22%2C%22class%22%3A%22term%22%7D%2C%7B%22word%22%3A%22%5Cu5357%5Cu4eac%5Cu4eba%22%2C%22pos%22%3A%22%5Cu540d%5Cu8bcd%22%2C%22class%22%3A%22term%22%7D%2C%7B%22word%22%3A%22%5Cu8d2d%5Cu4e70%22%2C%22pos%22%3A%22%5Cu52a8%5Cu8bcd%22%2C%22class%22%3A%22term%22%7D%2C%7B%22word%22%3A%22%5Cu6700%5Cu591a%22%2C%22pos%22%3A%22%5Cu5f62%5Cu5bb9%5Cu8bcd%22%2C%22class%22%3A%22term%22%7D%2C%7B%22word%22%3A%22%5Cu7684%22%2C%22pos%22%3A%22%5Cu52a9%5Cu8bcd%22%2C%22class%22%3A%22term%22%7D%2C%7B%22word%22%3A%22%5Cu6587%5Cu5b66%22%2C%22pos%22%3A%22%5Cu540d%5Cu8bcd%22%2C%22class%22%3A%22term%22%7D%2C%7B%22word%22%3A%22%5Cu4e66%5Cu7c4d%22%2C%22pos%22%3A%22%5Cu540d%5Cu8bcd%22%2C%22class%22%3A%22term%22%7D%5D%2C%22links%22%3A%5B%7B%22target%22%3A1%2C%22source%22%3A2%2C%22relation%22%3A%22ATT%22%7D%2C%7B%22target%22%3A2%2C%22source%22%3A3%2C%22relation%22%3A%22SBV%22%7D%2C%7B%22target%22%3A3%2C%22source%22%3A0%2C%22relation%22%3A%22HED%22%7D%2C%7B%22target%22%3A4%2C%22source%22%3A7%2C%22relation%22%3A%22ATT%22%7D%2C%7B%22target%22%3A5%2C%22source%22%3A4%2C%22relation%22%3A%22RAD%22%7D%2C%7B%22target%22%3A6%2C%22source%22%3A7%2C%22relation%22%3A%22ATT%22%7D%2C%7B%22target%22%3A7%2C%22source%22%3A3%2C%22relation%22%3A%22VOB%22%7D%5D%7D');

});




function select_type(el){
	var type = $(el).html();
	$('.mod_result_content .current').removeClass('current');
	$(el).addClass('current');
	$('.stress').removeClass('stress').addClass('normal');
	$('[option-data="' + type + '"]').removeClass('normal').addClass('stress');
}

function select_wtype(el){
  var wtype = $(el).attr("option-data");
  $('.stress').removeClass("stress").addClass("normal");
  $(el).removeClass("normal").addClass("stress");
  $('.mod_result_content .current').removeClass("current");
  $('[title="'+ wtype +'"]').addClass("current");
}


$(function () {
    $('#chart_container').highcharts({
        chart: {
        	backgroundColor: 'rgba(0,0,0,0)',
        },
        title: {
            text: '分词使用情况',
            x: -20 //center
        },
        // subtitle: {
        //     text: 'Source: WorldClimate.com',
        //     x: -20
        // },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        credits: {
            enabled: false
        },
        exporting: {
        	enabled: false
        },
        yAxis: {
            title: {
                text: '次数'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '次'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: '使用情况',
            data: [100, 200, 300, 150, 175, 200, 200, 400, 345, 123, 223, ]
        }, ]
    });
});

$(function () {
    $('#chart_container2').highcharts({
        chart: {
        	backgroundColor: 'rgba(0,0,0,0)',
        },
        title: {
            text: '词性标注使用情况',
            x: -20 //center
        },
        // subtitle: {
        //     text: 'Source: WorldClimate.com',
        //     x: -20
        // },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        credits: {
            enabled: false
        },
        exporting: {
        	enabled: false
        },
        yAxis: {
            title: {
                text: '次数'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '次'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: '使用情况',
            data: [10, 20, 30, 15, 17, 20, 0, 40, 45, 13, 22, ]
        }, ]
    });
});

$(function () {
    $('#chart_container3').highcharts({
        chart: {
        	backgroundColor: 'rgba(0,0,0,0)',
        },
        title: {
            text: '情感分析使用情况',
            x: -20 //center
        },
        // subtitle: {
        //     text: 'Source: WorldClimate.com',
        //     x: -20
        // },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        credits: {
            enabled: false
        },
        exporting: {
        	enabled: false
        },
        yAxis: {
            title: {
                text: '次数'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '次'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: '使用情况',
            data: [10, 20, 30, 15, 17, 20, 0, 40, 45, 13, 22, ]
        }, ]
    });
});


$(document).ready(function(){
	var base_attr_array = {
		'a' : '形容词',
		'c' : '连词',
		'd' : '副词',
		'e' : '语气词',
		'f' : '方位词',
		'g' : '助词',
		'h' : '前接成分',
		'id' : '习语',
		'j' : '简称',
		'k' : '后接成分',
		'l' : '处所词',
		'm' : '数词',
		'mq' : '数量词',
		'n' : '名词',
		'ni' : '机构名',
		'np' : '人名',
		'ns' : '地名',
		'nz' : '其它专名',
		'o' : '拟声词',
		'p' : '介词',
		'q' : '量词',
		'r' : '代词',
		't' : '时间词',
		'u' : '助词',
		'v' : '动词',
		'w' : '标点',
		'x' : '其它',
		};
	function text_filter(text){
		text = text.replace(/<[\/\s]*(?:(?!div|br)[^>]*)>/g, '');
		text = text.replace(/<\s*div[^>]*>/g, '<div>');
		text = text.replace(/<[\/\s]*div[^>]*>/g, '</div>');
		return text;
	}
	var txt = $('#input_sec1').val();
		txt = text_filter(txt);
  	$("#analysis_button").click(function(){
	    $.post("api/thulac",
	    {
	    	"token" : "qC7pRO8LH912194p36DH",
	      	"text": $("#input_sec1").val(),
	    },
	    function(data){
	    	var obj = eval("(" + data + ")");
	      	var temp = obj.result;
				var word_ret = '';
				var wtype_ret = '';
				var first_wtype = "True";

				var count = new Array();
				for (var i=0; i<temp.length; i++)
				{
					var value = temp[i];

					var word = value["word"];
					word = word.replace(/(^\s*)|(\s*$)/g, "");
					var wtype = value["type"];

					if (count.hasOwnProperty(wtype)) {
						count[wtype] = count[wtype] + 1;
					}
					else {
						count[wtype] = 1;
					}

					if(wtype_ret.indexOf(wtype) >= 0 ) {
					}
					else {
						wtype_ret += "<a href=\"#\" onclick=\"select_type(this)\" title='" + wtype + "'>" + wtype +"</a>";
					}
					if (word.length > 0){
						word_ret += '<span class="txt_bor normal" onclick="select_wtype(this)" option-data="' + wtype + '">' + word + '</span>';
					}
				}
				var maxTypeNum = 0;
				var maxType = '';
				for (var key in count){
					if (count[key] > maxTypeNum) {
						maxType = key;
						maxTypeNum = count[key];
					}
				}

				$('#wtype_ret').html(wtype_ret);
				$('#mCSB_2_container').html(word_ret);

				var $cur = $('.mod_result_content .current');
				var cur_len = $cur.length;
				if (cur_len == 0) {
					el = $('[title="' + maxType + '"]')
					select_type(el);
				}
	    });
 	 });
});



