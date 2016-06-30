
dim username,password
username=Request.Form("username")
password=Request.Form("password")
Response.Write("Dear " & username & ". ")
Response.Write("Hope you live well in " & password & ".")
