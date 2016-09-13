from flask import Flask,json,request,abort,url_for
import time,random,string
from app import	 app
from config import *
import MySQLdb
import socket
import os

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

def updata_time(token,name):

	conn=MySQLdb.connect(host='127.0.0.1',user=dbuser,passwd=dbpw,port=3306)
	conn.select_db('thunlp')
	cursor=conn.cursor()
	cursor.execute('select * from user where token = %s', (token,))
	u = cursor.fetchone()
	uid = u[0]

	cursor.execute('select * from ' + name + ' where user = %s', (uid,))
	u = cursor.fetchone()
	dt = 'd'+time.strftime('%Y%m%d',time.localtime(time.time()))

	t = u[-1]
	if(t is not None):
		t = t + 1
	else:
		t = 1

	cursor.execute('update ' + name + ' set ' + dt + ' = %s where user = %s', (str(t),uid))

	s = name + '_last_time'
	t = time.time()
	cursor.execute('select * from tokeninfo where user = %s', (uid,))
	u = cursor.fetchone()
	cursor.execute('update tokeninfo set ' + s + ' = %s where user = %s', (t,uid))
	conn.commit()
	conn.close()

	
def check_tokentime(token,name,order):

	conn=MySQLdb.connect(host='127.0.0.1',user=dbuser,passwd=dbpw,port=3306)
	conn.select_db('thunlp')
	cursor=conn.cursor()
	cursor.execute('select * from user where token = %s', (token,))
	u = cursor.fetchone()
	uid = u[0]

	cursor.execute('select * from tokeninfo where user = %s', (uid,))
	u = cursor.fetchone()

	s = order*3

	limit = int(u[s+1])
	lastt = float(u[s+2])
	fre = float(u[s+3])
	

	cursor.execute('select * from ' + name + ' where user = %s', (uid,))
	u = cursor.fetchone()
	conn.close()

	if(u[-1] is not None):
		t = int(u[-1])
	else:
		return 0

	if t >= limit:
		return 1

	nowt = time.time()
	if(nowt - lastt < fre):
		return 2

	return 0

@app.route('/api/lac', methods=['GET','POST'])
def lac():
	if (not request.json) or ('content' not in request.json):
		return json.dumps({ 'code': 201,'message': 'format error' }), 400
	
	result = []	
	raws = request.json['content'].encode("utf-8")
	token = request.headers.get_all('Token')[0].encode('utf-8')
	

	if(check_token(token) == False):
		return json.dumps({'code': 205,'message': 'the token is invalid'}), 203
	
	tokenuse = check_tokentime(token, "lac", 0)	
	if(tokenuse == 1):
		return json.dumps({'code': 206,'message': 'count limit exceed'}), 203
	if(tokenuse == 2):
		return json.dumps({ 'code': 207,'message': 'frequency limit exceed' }), 203

	client = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
	client.connect("/tmp/lac.sock")
	
	client.send(raws+"\0\0")
	a = client.recv(65536)
	client.close()

	b = a.split(" ")
	ans = []
	for j in b:
		c = j.split('_')
		ans.append((c[0], c[1]))
	result = ans

		
	updata_time(token, "lac")

	return json.dumps({'code': 100,'message': 'success','result': result})

@app.route('/api/ctc', methods=['GET','POST'])
def ctc():
	if (not request.json) or ('content' not in request.json):
		return json.dumps({ 'code': 201,'message': 'format error' }), 400
	
	result = []	
	raws = request.json['content'].encode("utf-8")
	token = request.headers.get_all('Token')[0].encode('utf-8')
	

	if(check_token(token) == False):
		return json.dumps({'code': 205,'message': 'the token is invalid'}), 203
	
	tokenuse = check_tokentime(token, "ctc", 0)	
	if(tokenuse == 1):
		return json.dumps({'code': 206,'message': 'count limit exceed'}), 203
	if(tokenuse == 2):
		return json.dumps({ 'code': 207,'message': 'frequency limit exceed' }), 203

	client = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
	client.connect("/tmp/ctc.sock")
	
	client.send(raws+"\0\0")
	a = client.recv(65536)
	client.close()
	b = a.split('\n')
	ans = {'classification':"",'possibility':0}
	result = []
	for i in b:
		c = i.split('\t')
		if(len(c) > 1):
			ans['classification'] = c[0]
			ans['possibility'] = c[1]
			result.append(ans)	
	updata_time(token, "ctc")

	return json.dumps({'code': 100,'message': 'success','result': ans})