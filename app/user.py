from flask import *
import time, random, string, hashlib, re
from app import app, model
from model import engine, User, DBSession

def token():
	slcNum = [random.choice(string.digits) for i in range(10)]
	slcLetter = [random.choice(string.ascii_letters) for i in range(10)]
	slcChar = slcNum + slcLetter
	random.shuffle(slcChar)
	token = ''.join([i for i in slcChar])
	return token

@app.route('/api/register', methods=['GET','POST'])
def register():
	if not request.json:
		return json.dumps({ 'code': 201,'message': 'format error' }), 400

	cursur = DBSession()
	user = request.json
	uid = user['id'].encode('utf-8')
	uemail = user['email'].encode('utf-8')

	u = cursur.query(User).filter(User.id==uid).first()
	if(u is not None):
		return json.dumps({ 'code': 301, 'message': 'the id is existed' }), 203

	u = cursur.query(User).filter(User.email==uemail).first()
	if(u is not None):
		return json.dumps({ 'code': 302, 'message': 'the email is existed' }), 203

	t = time.time()
	new_user = User()
	
	new_user.id = uid
	new_user.email = uemail
	new_user.token = token()
	new_user.admin = False
	new_user.password = user['password'].encode('utf-8')
	new_user.phone = user['phone'].encode('utf-8')
	new_user.create_at = t
	new_user.last_login = t
	new_user.token_time = t

	cursur.add(new_user)
	cursur.commit()
	cursur.close()
	return json.dumps({'code': 100,'message': 'success','user': uid})

@app.route('/api/login', methods=['GET','POST'])
def log_in():
	print request.form
	if not request.form:
		return json.dumps({ 'code': 201,'message': 'format error' }), 400

	cursur = DBSession()
	user = request.form
	uid = user['id'].encode('utf-8')

	u = cursur.query(User).filter(User.id==uid).first()
	if(u is None):
		return json.dumps({ 'code': 306, 'message': 'the id is not existed' }), 203
	if(u.password != user['password'].encode('utf-8')):
		return json.dumps({ 'code': 307, 'message': 'the password is wrong' }), 203
	
	cursur.query(User).filter(User.id==uid).update({'last_login' : time.time()})
	cursur.commit()
	cursur.close()

	return json.dumps({'code': 100,'message': 'success','user': uid})

@app.route('/api/gettoken', methods=['GET','POST'])
def get_token():
	if not request.json:
		return json.dumps({ 'code': 201,'message': 'format error' }), 400

	cursur = DBSession()
	user = request.json
	uid = user['id'].encode('utf-8')

	t = token()

	cursur.query(User).filter(User.id==uid).update({'token_time' : time.time(),'token' : t})
	cursur.commit()
	cursur.close()

	return json.dumps({'token': t})

@app.route('/api/update', methods=['GET','POST'])
def update():
	if not request.json:
		return json.dumps({ 'code': 201,'message': 'format error' }), 400

	cursur = DBSession()
	user = request.json
	uid = user['id'].encode('utf-8')

	for i in user:
		if(i == 'phone'):
			cursur.query(User).filter(User.id==uid).update({'phone' : user[i]})
		if(i == 'password'):
			cursur.query(User).filter(User.id==uid).update({'password' : user[i]})

	cursur.commit()
	cursur.close()
	return json.dumps({'user': uid})


