from flask     import *
from util.data import *
import requests

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
  if request.args:
    search = request.args['search']

    filtro = {
      "filter": [
        {"name": search},
        {"description": search},
        {"brand": search},
        {"type": search}
      ]
    }

    data_search = requests.post('http://localhost:5001/product', json=filtro)

    return render_template('/pages/search.html', \
                            name='Busqueda', \
                            **data, \
                            search=data_search.text, \
                            message=messages['search'])
  else:
    return redirect('/home')