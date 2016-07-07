from flask import *
import os
from app import app

def handle_static(res, name):
	return send_from_directory(os.path.dirname(os.path.realpath(__file__))+"/templates/"+res, name)

@app.route("/js/<path:name>")
def static_js(name):
	return handle_static("js", name)

@app.route("/css/<path:name>")
def static_css(name):
	return handle_static("css", name)

@app.route("/images/<path:name>")
def static_images(name):
	return handle_static("images", name)

@app.route("/index")
def index():
	return render_template("index.html")

@app.route("/login")
def login():
	if('id' in session['id']):
		return render_template("console.html")
	else:
		return render_template("login.html")

@app.route("/register")
def regist():
	if('id' in session['id']):
		return render_template("console.html")
	else:
		return render_template("register.html")

@app.route("/semantic")
def semantic():
	return render_template("semantic.html")

@app.route("/userinfo")
def userinfo():
	return render_template("console.html")