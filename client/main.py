from flask     import *
from util.data import *

app = Flask(__name__)

@app.route('/')
def index ():
  return render_template('/pages/home_detal.html', \
                          name='VentasDetal', \
                          **data)

@app.route('/marcas/')
def index2 ():
  return render_template('/pages/home_mayor.html', \
                          name='VentasMayor', \
                          **data)

@app.route('/product/')
def index3 ():
  return render_template('/pages/index3.html', \
                          name='DecripcionProducto', \
                          **data)