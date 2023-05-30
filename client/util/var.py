from dotenv import load_dotenv
import os
load_dotenv()

ROOT     = os.getenv('ROOT')
HOME     = os.getenv('HOME')
MAYOR    = os.getenv('MAYOR')
ACCESS   = os.getenv('ACCESS')
MANAGE   = os.getenv('MANAGE')
PRODUCT  = os.getenv('PRODUCT')
SEARCH   = os.getenv('SEARCH')
SECRET   = os.getenv('SECRET')
LOGOUT   = os.getenv('LOGOUT')
ADMIN    = os.getenv('ADMIN')

# SERVER
DATABASE = os.getenv('DATABASE')
API_REST = os.getenv('API_REST')

# ENDPOINTS DATABASE
PRD_FIL_END = os.getenv('PRD_FIL_END')
PRS_RCN_END = os.getenv('PRS_RCN_END')
PRS_RND_END = os.getenv('PRS_RND_END')
PRD_BID_END = os.getenv('PRD_BID_END')
PRD_REL_END = os.getenv('PRD_REL_END')

# ENDPOINTS API REST
REG_USR_END = os.getenv('REG_USR_END')
LOG_USR_END = os.getenv('LOG_USR_END')