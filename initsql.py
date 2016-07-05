import MySQLdb
import time,hashlib

t = time.time()

md5 = hashlib.md5()
md5.update('admintpp')
password = md5.hexdigest()

conn=MySQLdb.connect(host='127.0.0.1',user='root',passwd='thunlp',port=3306)
conn.select_db('thunlp')

cursor=conn.cursor()
cursor.execute("INSERT INTO user(id, email, token, admin, password, create_at, last_login, token_time) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)", ('admin', 'admin@textplusplus.com', 'qC7pRO8LH912194p36DH', True, password, t, t, t))
cursor.execute("INSERT INTO lac(user) VALUES('admin')")
cursor.execute("INSERT INTO tokeninfo(user, lac_limit_times, lac_last_time, lac_frequen) VALUES(%s,%s,%s,%s)", ('admin', 100000, 0, 0))

conn.commit()