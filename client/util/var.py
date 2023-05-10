from dotenv import load_dotenv
import os
load_dotenv()

ROOT     = os.getenv('ROOT')
HOME     = os.getenv('HOME')
MAYOR    = os.getenv('MAYOR')
ACCESS   = os.getenv('ACCESS')
PRODUCT  = os.getenv('PRODUCT')
SEARCH   = os.getenv('SEARCH')

# SERVER
DATABASE = os.getenv('DATABASE')

# ENDPOINTS
PRD_END  = os.getenv('PRD_END')
