function showLoginPanel(jump_url)
{
	var to_url = "";
	if (jump_url == "" || (typeof jump_url == "undefined"))
		to_url = location.href;
	else
		to_url = jump_url;

	to_url = HtmlEncode(to_url);
	var panel_content = loginPanel(to_url);
	$('body').append(panel_content);
	$('body').append("<div id='disable_background' style='height:" +
		document.body.scrollHeight + "px;width:100%;background-color: Gray;position:absolute;left:0px;top:0px;filter:Alpha(Opacity=30);z-index:10;-moz-opacity:0.4;opacity: 0.4;" + "'></div>");

	
}

function HtmlEncode(str)
{
	var new_str = str;
	new_str = new_str.replace(/'/g,'&#39;');
	new_str = new_str.replace(/"/g,'&quot;');
	new_str = new_str.replace(/</g,'&lt;');
	new_str = new_str.replace(/>/g,'&gt;');
	return new_str;
}

function confirmLogout(n)
{
    switch(n)
    {
        case 0:
        default:
            alert("退出失败，请联系管理员处理");
            break;
        case 1:
        case 2:
            location.reload();
            break;
    }
}

function logOut(e)
{
    pt_logout.logout(confirmLogout);
	console.log("E is:", e);

	if (e && e.stopPropagation)
	{
		e.stopPropagation();
	}
	else
	{
		window.event.cancelBubble = true;
	}
}

function closeLoginPanel()
{
	$("#login_div").remove();
	$("#disable_background").remove();
}

function loginPanel(jump_url)
{
	var html = '<div id="login_div" style="position:absolute;width:621px;height:368px;padding:0;top:20%;left:35%;z-index:15">' +
		'<iframe id="login_frame"  name="login_frame" frameborder="0" scrolling="no" width="100%" height="100%" src=' +
		'"http://xui.ptlogin2.qq.com/cgi-bin/xlogin?style=20&appid=810000001&s_url=' + jump_url +
		'"></iframe></div>';
	return html;
}

function ptlogin2_onResize(width, height) {
		//获得浮动Div对象
		login_wnd = document.getElementById("login_div");
		if (login_wnd)	{
			//重新设置大小注意，一定要加px，否则firefox下有问题
			login_wnd.style.width = width + "px";
			login_wnd.style.height = height + "px";
			//最好重新调整登录框的位置， 这儿略....
			//先隐藏，在显示，这样可以避免滚动条的出现
			login_wnd.style.visibility = "hidden";
			login_wnd.style.visibility = "visible";
		}
}

function ptlogin2_onClose(){
		/*login_wnd = document.getElementById("login_div");	
		login_wnd.style.display="none"*/
	$("#login_div").remove();
	$("#disable_background").remove();
}

	/**
 * [str2JSON 降字符串转换成json对象（供业务参考）]
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function str2JSON(str) {
	eval('var __pt_json='+str);
	return __pt_json;
}
	            	
(function(){
if (typeof window.postMessage !== 'undefined') {
	window.onmessage = function(event) {
		var msg = event || window.event; // 兼容IE8
		var data;
		if (typeof  JSON !== 'undefined') // IE7兼容模式不存在JSON对象
			data = JSON.parse(msg.data);
		else
			data = str2JSON(msg.data);

		switch (data.action) {
			case 'close':
			ptlogin2_onClose();
			break;

			case 'resize':
			ptlogin2_onResize(data.width, data.height);
			break;

			default: 
			break;
		}
	}
}
})();
	           
