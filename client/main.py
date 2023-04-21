from flask     import *
from util.data import *

app = Flask(__name__)

@app.route('/')
def index ():
  return render_template('/pages/index.html', \
                          name='Index', \
                          **data)
@app.route('/page2/')
def index2 ():
  return render_template('/pages/index2.html', \
                          name='Index2', \
                          **data)