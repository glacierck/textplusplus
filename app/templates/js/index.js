$(document).ready(function() {
   	$.get("api/islogined",function(data) {
   		var ret = eval("(" + data + ")");
   		var islogined = ret.islogined;
   		var username = ret.username;
   		if(islogined) {
            $("#sign_state").append('<a href="userinfo" class="button button-primary button-small">欢迎您, ' + username + '</a>');
         }
   		else {
            $("#sign_state").append('<a href="login" class="button button-primary button-small">登录</a>');
            $("#sign_state").append('<a href="register" class="button button-action button-small">注册</a>');
         }
  	});
})