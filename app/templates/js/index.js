$(document).ready(function() {
   	$.get("api/islogined",function(data) {
   		var ret = eval("(" + data + ")");
   		var islogined = ret.islogined;
   		var username = ret.username;
   		if(islogined) {
            $("#sign_state").append('<a href="userinfo" class="button button-primary button-small">欢迎您, ' + username + '</a>');
            $("#sign_state").append('<button id="quit_button" class="button button-action button-small">退出</button>');
            $("#sign_state").prepend('<script>$("#quit_button").click(function() {$.get("api/logout",function(data) {window.location.reload(); });});</script>')
         }
   		else {
            $("#sign_state").append('<a href="login" class="button button-primary button-small">登录</a>');
            $("#sign_state").append('<a href="register" class="button button-action button-small">注册</a>');
         }
  	});
});
