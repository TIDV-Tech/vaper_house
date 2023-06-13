from dotenv import load_dotenv
import os
load_dotenv()

ROOT        = os.getenv('ROOT')
HOME        = os.getenv('HOME')
MAYOR       = os.getenv('MAYOR')
ACCESS      = os.getenv('ACCESS')
MANAGE      = os.getenv('MANAGE')
PRODUCT     = os.getenv('PRODUCT')
SEARCH      = os.getenv('SEARCH')
SECRET      = os.getenv('SECRET')
LOGOUT      = os.getenv('LOGOUT')
ADMIN       = os.getenv('ADMIN')
MODAL_DATA  = os.getenv('MODAL_DATA')
MODAL       = os.getenv('MODAL')
USERS       = os.getenv("USERS")
FILTER      = os.getenv("FILTER")

# SERVER
DATABASE = os.getenv('DATABASE')
API_REST = os.getenv('API_REST')

# ENDPOINTS DATABASE
PRS_GET_END = os.getenv('PRS_GET_END')
PRD_FIL_END = os.getenv('PRD_FIL_END')
PRS_RCN_END = os.getenv('PRS_RCN_END')
PRS_RND_END = os.getenv('PRS_RND_END')
PRD_BID_END = os.getenv('PRD_BID_END')
PRD_REL_END = os.getenv('PRD_REL_END')

# ENDPOINTS API REST
REG_USR_END = os.getenv('REG_USR_END')
LOG_USR_END = os.getenv('LOG_USR_END')

USR_GET_END = os.getenv('USR_GET_END')
USR_FIL_END = os.getenv('USR_FIL_END')
USR_ID_END  = os.getenv("USR_ID_END")

PUR_GET_END = os.getenv('PUR_GET_END')
PUR_FIL_END = os.getenv('PUR_FIL_END')