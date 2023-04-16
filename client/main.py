from flask     import *
from util.data import *

app = Flask(__name__)

@app.route('/')
def index ():
  return render_template('/pages/index.html', \
                          name='Index', \
                          **data)