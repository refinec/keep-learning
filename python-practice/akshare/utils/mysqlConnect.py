from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, Column, Integer, String, Text

USERNAME = 'root'
PASSWORD = 'CFKzxc123.'
HOST = 'localhost'
PORT = 3306
DB = 'akshare'

DB_URI = f'mysql+pymysql://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DB}'
sqlEngine = create_engine(DB_URI)
sessionmaker = sessionmaker
declarative_base = declarative_base
Column = Column
Integer = Integer
String = String
Text = Text
