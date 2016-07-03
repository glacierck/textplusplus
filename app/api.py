#coding=utf-8

from flask import Flask,json,request,abort,url_for
import time,random,string
from app import app, thulac, conn

def check_token(token):

	cursor=conn.cursor()
	cursor.execute('select * from user where token = %s', (token,))
	u = cursor.fetchone()
	if u is None:
		return False
	return True

def updata_time(token,name):

	cursor=conn.cursor()
	cursor.execute('select * from user where token = %s', (token,))
	u = cursor.fetchone()
	uid = u[0]

	cursor.execute('select * from ' + name + ' where user = %s', (uid,))
	u = cursor.fetchone()
	dt = 'd'+time.strftime('%Y%m%d',time.localtime(time.time()))
	t = u[-1]+1
	cursor.execute('update ' + name + ' set ' + dt + ' = %s where user = %s', (t,uid))

	s = name + '_last_time'
	t = time.time()
	cursor.execute('select * from tokeninfo where user = %s', (uid,))
	u = cursor.fetchone()
	cursor.execute('update tokeninfo set ' + s + ' = %s where user = %s', (t,uid))
	conn.commit()

	

def check_tokentime(token,name,order):

	cursor=conn.cursor()
	cursor.execute('select * from user where token = %s', (token,))
	u = cursor.fetchone()
	uid = u[0]

	cursor.execute('select * from tokeninfo where user = %s', (uid,))
	u = cursor.fetchone()

	s = order*3

	limit = u[s+1]
	lastt = float(u[s+2])	
	fre = u[s+3]	
	

	cursor.execute('select * from ' + name + ' where user = %s', (uid,))
	u = cursor.fetchone()
	t = u[-1]

	if t >= limit:
		return 1

	nowt = time.time()
	if(nowt - lastt < fre):
		return 2

	return 0

@app.route('/api/lac', methods=['GET','POST'])
def lac():
	if not request.json:
		return json.dumps({ 'code': 201,'message': 'format error' }), 400
	
	result = []	
	raws = request.json
	token = request.headers.get_all('Token')[0].encode('utf-8')
	

	if(check_token(token) == False):
		return json.dumps({'code': 205,'message': 'the token is invalid'}), 203
	
	tokenuse = check_tokentime(token, "lac", 0)	
	if(tokenuse == 1):
		return json.dumps({'code': 206,'message': 'count limit exceed'}), 203
	if(tokenuse == 2):
		return json.dumps({ 'code': 207,'message': 'frequency limit exceed' }), 203

	global thu1
	for i in raws:

		a = thulac.run(i.encode('utf-8'))
		b = a.split(" ")
		ans = []
		for j in b:
			c = j.split('_')
			ans.append((c[0], c[1]))
		result.append(ans)
		
	updata_time(token, "lac")

	return json.dumps({'code': 100,'message': 'success','result': result})