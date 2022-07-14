from sqlalchemy import create_engine

USERNAME = 'root'
PASSWORD = 'CFKzxc123.'
HOST = 'localhost'
PORT = 3306
DB = 'tushare'
DB_URI = f'mysql+pymysql://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DB}'

sqlEngine = create_engine(DB_URI)


