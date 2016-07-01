$(document).ready(function() {
   	$.get("api/console",function(data) {
   		var user = eval("(" + data + ")");
   		var name = user.name;
   		var email = user.email;
   		var register_time = user.register_time;
   		var token = user.token;
   		$("#userinfo").append('<li>用户名: ' + name + '</li>');
   		$("#userinfo").append('<li>Email: ' + email + '</li>');
   		$("#userinfo").append('<li>注册时间: ' + register_time + '</li>');
   		$("#userinfo").append('<li>Token: ' + token + '</li>');
  	});
})

$(document).ready(function() {
	var use_date = new Array();
	var use_num = new Array();
	var used=0;
	var unused=0;
	// use_date[0] = "0601";
	// use_num[0] = 100;
	// use_num[1] = 200;
	// var data = '{"used" : "1000","unused" : "2000","used_data" : [{"date": "0601", "num":"100"}, {"date":"0602", "num":"200"}, {"date":"0603", "num":"300"}],}';
	$.get("api/console/tag_info", function(data) {
		var user_data = eval("(" + data + ")");
		used = parseInt(user_data.used);
		unused = parseInt(user_data.unused);
		for (var i = 0; i < user_data.used_data.length; i++) {
			use_date[i] = user_data.used_data[i].date;
			use_num[i] = parseInt(user_data.used_data[i].num);

		}
		draw_pic1();
	});
    function draw_pic1() {
    $('#chart_container').highcharts({
        chart: {
        	backgroundColor: 'rgba(0,0,0,0)',
        },
        title: {
            text: '分词使用情况',
            x: -20 //center
        },
        subtitle: {
        	text: '今日已使用' + used + '次, 剩余' + unused + '次',
        	x: -20
        },
        xAxis: {
            categories : use_date
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
            data: use_num
        }, ]
    });
}
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
