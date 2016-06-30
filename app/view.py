from flask import *
import os

def handle_static(res, name):
	return send_from_directory(os.path.dirname(os.path.realpath(__file__))+"/templates/"+res, name)

@app.route("/public/<path:name>")
def static_public(name):
	return handle_static("public", name)

@app.route("/index")
def index():
	return render_template("index.html")

@app.route("/login")
def login():
	return render_template("login.html")


@app.route("/register")
def regist():
	return render_template("register.html")

@app.route("/semantic")
def semantic():
	return render_template("semantic_static.html")