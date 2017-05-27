<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>系统登录</title>
<link rel="stylesheet" type="text/css" href="css/StyleSheet1.css"/>
<script type="text/javascript" src="easyui/jquery.min.js"></script>
<script type="text/javascript" src="easyui/jquery.easyui.min.js"></script>
<link rel="stylesheet" type="text/css" href="easyui/themes/icon.css"/>
<link rel="stylesheet" type="text/css" href="easyui/themes/default/easyui.css"/>
</head>

<body style="background:#1A8C0D;">
 	<div style="border-radius:5px; margin:100px auto; border:solid 1px #00FF00; height:230px; width:300px; font-size:13px;">
        <div style="margin-top: 60px; height: 35px; text-align:left; margin-left:50px;">
            用户名：<input name="TextBox2" type="text" id="username" class="textboxForUserName" />
        </div>
        <div style="margin-top:10px; height: 35px; text-align:left; margin-left:63px;">
            密码：<input name="TextBox1" type="password" id="password" class="textboxForPassword" />
        </div>
        <div style="margin-top:10px; height: 35px; text-align:left; margin-left:180px;">
            <input type="submit" name="Button1" onclick="loginCheck();" value="马上登录" id="Button1" />
        </div>
         <div style="margin-top:5px; height: 35px; text-align:left; margin-left:63px;">
            <span id="Label1"></span>

    </div>
    <script type="text/javascript">
	function loginCheck()
	{
		//读取用户名和密码
		var username=$("#username").val();
		var password=$("#password").val();
		if(username==""||password=="")
		{
			$.messager.alert("错误提示","用户名和密码不能为空，请填写完整！","error");
		}
		else
		{
			$.ajax({
				type:"POST",
				async:true,
				dataType:"text",
				data:{username:username,password:password},
				url:"business/user.php?action=logincheck",
				success: function(msg){
					   if(msg=="1")
					   {
						   //如果登录成功，跳转到后台主页
						   window.location.href="index.html";
					   }
					   else if(msg=="0")
					   {
						   $.messager.alert("错误提示","用户名和密码不匹配，登录失败！","error");
					   }
					}
				});
			
		}
		
		
	}
	
	</script>
</body>
</html>