from sqlalchemy import Column, String, Integer, create_engine, MetaData, Table, ForeignKey
from sqlalchemy.orm import sessionmaker,mapper
from sqlalchemy.dialects.mysql import BOOLEAN,REAL,VARCHAR
from sqlalchemy.types import BOOLEAN

metadatau = MetaData()
metadatat = MetaData()
engine = create_engine('mysql+mysqlconnector://root:thunlp@localhost:3306/thunlp')

userTable = Table(
	'user',metadatau,
	Column('id', VARCHAR(50), primary_key=True, nullable=False),
	Column('email', VARCHAR(50), unique=True, nullable=False),
	Column('password', VARCHAR(50), nullable=False),
	Column('token', VARCHAR(50), nullable=False),
	Column('phone', VARCHAR(50), nullable=False),
	Column('create_at', REAL, nullable=False),
	Column('last_login', REAL, nullable=False),
	Column('token_time', REAL, nullable=False),
	Column('admin', BOOLEAN, nullable=False)
)

class User(object):
	id = Column(VARCHAR(50), primary_key=True, nullable=False)
	email = Column(VARCHAR(50), unique=True, nullable=False)
	password = Column(VARCHAR(50), nullable=False)
	token = Column(VARCHAR(50), nullable=False)
	phone = Column(VARCHAR(50), nullable=False)
	create_at = Column(REAL, nullable=False)
	last_login = Column(REAL, nullable=False)
	token_time = Column(REAL, nullable=False)
	admin = Column(BOOLEAN, nullable=False)

	def is_authenticated(self):
		return True
 
	def is_active(self):
		return True
	 
	def is_anonymous(self):
		return False
 
	def get_id(self):
		return unicode(self.id)


mapper(User, userTable)

tokenTable = Table(
	'tokeninfo',metadatat,
	Column('id', VARCHAR(100), primary_key=True, nullable=False),
	Column('user', VARCHAR(50)),#, ForeignKey('user.id')),
	Column('api', VARCHAR(50), nullable=False),
	Column('times', Integer, nullable=False),
	Column('limit_times', Integer, nullable=False),
	Column('last_time', REAL, nullable=False),
	Column('frequen', REAL, nullable=False)
)

class Tokeninfo(object):
	pass

# build the database
#metadatat.create_all(engine)
#metadatau.create_all(engine)

mapper(Tokeninfo,tokenTable)
DBSession = sessionmaker(bind=engine)