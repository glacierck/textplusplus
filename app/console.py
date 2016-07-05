from flask import *
import time, random, string, hashlib, re
from app import app, conn

@app.route('/api/console/tag_info', methods=['GET','POST'])
def tag_info():
	uid = session['id']
	cursor = conn.cursor()
	cursor.execute('select * from lac where user = %s', (uid,))
	u = cursor.fetchone()

	max_count = 1000
	dt =86400
	t = time.time()
	time.strftime('%m%d',time.localtime(time.time()))
	res = []
	num = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

	for i in num:
		md = time.strftime('%m%d',time.localtime(t))
		t = t - dt

		if (len(u) <= i):
			res.append({'date':md, 'num':0})
		else:
			if(u[-i] is None):
				res.append({'date':md, 'num':0})
			else:
				res.append({'date':md, 'num':u[-i]})

	res.reverse()
	return json.dumps({'used': res[-1]['num'],'unused': max_count-res[-1]['num'],'used_data': res})

@app.route('/api/console', methods=['GET','POST'])
def console_info():
	uid = session['id']
	cursor = conn.cursor()
	cursor.execute('select * from user where id = %s', (uid,))
	u = cursor.fetchone()

	return json.dumps({'name': u[0],'email': u[1],'register_time': time.strftime('%Y-%m-%d',time.localtime(u[4])),'token': u[3]})

@app.route('/api/islogined', methods=['GET','POST'])
def islogined():
	print request.form

	if (request.form == ([])):
		uid = request.form['isloged']
		if(uid == False):
			session['id'] = None
			return json.dumps({'islogined': 0, 'username': 'null'})

	else:
		if(session['id'] is None):
			return json.dumps({'islogined': 0, 'username': 'null'})
		else:
			return json.dumps({'islogined': 1, 'username': session['id']})