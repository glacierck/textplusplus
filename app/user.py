from flask import *
import time, random, string, hashlib, re
from app import app, conn

def token():
	slcNum = [random.choice(string.digits) for i in range(10)]
	slcLetter = [random.choice(string.ascii_letters) for i in range(10)]
	slcChar = slcNum + slcLetter
	random.shuffle(slcChar)
	token = ''.join([i for i in slcChar])
	return token

@app.route('/api/register', methods=['GET','POST'])
def register():
	if not request.form:
		return json.dumps({ 'code': 201,'message': 'format error' }), 400

	cursor=conn.cursor()
	user = request.form
	uid = user['id'].encode('utf-8')
	uemail = user['email'].encode('utf-8')

	cursor.execute('select * from user where id = %s', (uid,))
	u = cursor.fetchone()

	if(u is not None):
		return json.dumps({ 'code': 301, 'message': 'the id is existed' }), 203

	cursor.execute('select * from user where email = %s', (uemail,))
	u = cursor.fetchone()

	if(u is not None):
		return json.dumps({ 'code': 302, 'message': 'the email is existed' }), 203

	t = time.time()
	cursor.execute("INSERT INTO user(id, email, token, admin, password, create_at, last_login, token_time) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)", (uid, uemail, token, False, user['password'].encode('utf-8'), t, t, t))
	conn.commit()
	return json.dumps({'code': 100,'message': 'success','user': uid})

@app.route('/api/login', methods=['GET','POST'])
def log_in():
	if not request.form:
		return json.dumps({ 'code': 201,'message': 'format error' }), 400

	cursor=conn.cursor()
	user = request.form
	uid = user['id'].encode('utf-8')

	cursor.execute('select * from user where id = %s', (uid,))
	u = cursor.fetchone()

	if(u is None):
		return json.dumps({ 'code': 306, 'message': 'the id is not existed' }), 203

	print u
	if(u[2] != user['password'].encode('utf-8')):
		return json.dumps({ 'code': 307, 'message': 'the password is wrong' }), 203
	
	t = time.time()
	cursor.execute('update user set last_login = %s where id = %s', (t,uid))
	conn.commit()

	session['id'] = uid
	return json.dumps({'code': 100,'message': 'success','user': uid})

@app.route('/api/console/tag_info', methods=['GET','POST'])
def tag_info():
	uid = session['id']
	cursor = conn.cursor()
	cursor.execute('select * from lac where user = %s', (uid,))
	u = cursor.fetchone()
	print uid
	print u

	max_count = 1000
	dt =86400
	t = time.time()
	time.strftime('%m%d',time.localtime(time.time()))
	res = []
	num = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
	sign = 0

	for i in num:
		md = time.strftime('%m%d',time.localtime(t))
		t = t - dt

		if (len(u) == i):
			sign = 1
		if (sign == 1):
			res.append({'date':md, 'num':0})
		else:
			res.append({'date':md, 'num':u[-i]})

	res.reverse()
	return json.dumps({'used': u[-1],'unused': max_count-u[-1],'used_data': res})

# @app.route('/api/gettoken', methods=['GET','POST'])
# def get_token():
# 	if not request.json:
# 		return json.dumps({ 'code': 201,'message': 'format error' }), 400

# 	cursur = DBSession()
# 	user = request.json
# 	uid = user['id'].encode('utf-8')

# 	t = token()

# 	cursur.query(User).filter(User['id']==uid).update({'token_time' : time.time(),'token' : t})
# 	cursur.commit()
# 	cursur.close()

# 	return json.dumps({'token': t})

# @app.route('/api/update', methods=['GET','POST'])
# def update():
# 	if not request.json:
# 		return json.dumps({ 'code': 201,'message': 'format error' }), 400

# 	cursur = DBSession()
# 	user = request.json
# 	uid = user['id'].encode('utf-8')

# 	for i in user:
# 		if(i == 'phone'):
# 			cursur.query(User).filter(User.id==uid).update({'phone' : user[i]})
# 		if(i == 'password'):
# 			cursur.query(User).filter(User.id==uid).update({'password' : user[i]})

# 	cursur.commit()
# 	cursur.close()
# 	return json.dumps({'user': uid})