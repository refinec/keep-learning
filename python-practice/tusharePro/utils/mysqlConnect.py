from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, Column, Integer, String, Text, FLOAT

USERNAME = 'root'
PASSWORD = 'CFKzxc123.'
HOST = 'localhost'
PORT = 3306
DB = 'tusharepro'

DB_URI = f'mysql+pymysql://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DB}'
sqlEngine = create_engine(DB_URI)
sessionmaker = sessionmaker
automap_base = automap_base
declarative_base = declarative_base
Column = Column
Integer = Integer
String = String
Text = Text
