from flask import Flask,json,request,abort,url_for
import time,random,string
from app import app
from config import *
import socket
import MySQLdb

def check_token(token):

	conn=MySQLdb.connect(host='127.0.0.1',user=dbuser,passwd=dbpw,port=3306)
	conn.select_db('thunlp')
	cursor=conn.cursor()
	cursor.execute('select * from user where token = %s', (token,))
	u = cursor.fetchone()
	conn.close()
	if u is None:
		return False
	return True

@app.route('/api/thulac', methods=['GET','POST'])
def semlac():
	if not request.form:
		return json.dumps({ 'code': 201,'message': 'format error' }), 400
	
	result = []	
	raws = request.form
	token = raws['token']
	
	print raws
	if(check_token(token) == False):
		return json.dumps({'code': 205,'message': 'the token is invalid'}), 203

	raw = raws['text']

	client = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
	client.connect("/tmp/lac.sock")
	
	client.send(raw)
	raw1 = client.recv(65536)
	client.close()

	raw2 = raw1.strip().split(" ")

	ans = map(lambda x:{"word":x.split("_")[0], "type":x.split("_")[1]}, raw2)

	return json.dumps({'code': 100,'message': 'success','result': ans})

@app.route('/api/userinfo', methods=['GET','POST'])
def getuserinfo():
	pass