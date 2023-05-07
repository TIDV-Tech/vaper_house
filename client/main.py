from flask     import *
from util.data import *

app = Flask(__name__)

@app.errorhandler(404)
def page_not_found(e):
  return render_template('/pages/404.html', \
                         name='Error404', \
                         **data, \
                         message=messages['error'])

@app.route('/')
def index ():
  return render_template('/pages/home_detal.html', \
                          name='VentasDetal', \
                          **data, \
                          message=messages['index'])

@app.route('/home')
def home ():
  return redirect('/')

@app.route('/mayor/')
def index2 ():
  return render_template('/pages/home_mayor.html', \
                          name='VentasMayor', \
                          **data, \
                          message=messages['mayor'])

@app.route('/producto/<int:id_article>')
def index3 (id_article):
  return render_template('/pages/cart.html', \
                          name='DecripcionProducto', \
                          **data, \
                          id=id_article-1, \
                          message=messages['cart'])