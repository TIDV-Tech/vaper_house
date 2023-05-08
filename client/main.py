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
def mayor ():
  return render_template('/pages/home_mayor.html', \
                          name='VentasMayor', \
                          **data, \
                          message=messages['mayor'])

@app.route('/producto/<int:id_article>', methods=['GET'])
def product (id_article):
  return render_template('/pages/cart.html', \
                          name='DecripcionProducto', \
                          **data, \
                          id=id_article-1, \
                          message=messages['cart'])

@app.route('/buscar', methods=['GET'])
def search ():
  q = request.args.get('search', type=str)

  return render_template('/pages/search.html', \
                          name='Busqueda', \
                          **data, \
                          params=q, \
                          message=messages['search'])