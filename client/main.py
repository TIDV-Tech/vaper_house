from flask     import *
from util.data import *
from util.var  import *
import requests

app = Flask(__name__)

@app.errorhandler(404)
def page_not_found(e):
  return render_template('/pages/404.html', \
                         name=pages[0], \
                         **data, \
                         message=messages['error'])

@app.route(ROOT)
def index ():
  print(ROOT, PRODUCT, ACCESS)
  return render_template('/pages/home_detal.html', \
                          name=pages[1], \
                          **data, \
                          message=messages['index'])

@app.route(HOME)
def home ():
  return redirect(ROOT)

@app.route(MAYOR)
def mayor ():
  return render_template('/pages/home_mayor.html', \
                          name=pages[2], \
                          **data, \
                          message=messages['mayor'])

@app.route(ACCESS, methods=['GET'])
def acceso ():
  if request.args:
    page = request.args['page']
    msg  = messages['regist']
    msg  = messages['login'] if page == 'login' else msg

    return render_template('/pages/acceso.html', \
                            name=pages[3], \
                            **data, \
                            page=page, \
                            message=msg)
  else:
    return redirect(HOME)

@app.route(PRODUCT, methods=['GET'])
def product (id_product):
  return render_template('/pages/cart.html', \
                          name=pages[4], \
                          **data, \
                          id=id_product-1, \
                          message=messages['cart'])

@app.route(SEARCH, methods=['GET'])
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

    data_search = requests.post('http://localhost:5001/product', json=filtro).json()

    return render_template('/pages/search.html', \
                            name=pages[5], \
                            **data, \
                            search=data_search, \
                            q=search, \
                            cnt=len(data_search['data']), \
                            message=messages['search'])
  else:
    return redirect(HOME)