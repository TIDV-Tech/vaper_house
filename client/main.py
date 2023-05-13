from flask            import *
from util.data        import *
from util.var         import *
from util.controllers import *
import requests

app = Flask(__name__)
app.secret_key = SECRET

@app.errorhandler(404)
def page_not_found(e):
  return render_template('/pages/404.min.html', \
                         name=pages[0], \
                         **data, \
                         message=messages['error'])

@app.route(ROOT)
def index ():
  if 'data_user' in session:
    print(session)
    data['user'] = session['data_user']
  else:
    data['user'] = {}

  promoFilter = {
    "filter": {
      "promotion": True
    }
  }
    
  data_promotions_search     = requests.post(DATABASE+PRD_FIL_END, json=promoFilter).json()
  data_newProducts_search    = requests.get(DATABASE+PRS_RCN_END).json()
  data_randomProducts_search = requests.get(DATABASE+PRS_RND_END).json()

  data['promotions']   = data_promotions_search['data'][0:4]
  data['new_products'] = data_newProducts_search['data'][0:4]
  data['products']     = data_randomProducts_search['data'][0:8]

  return render_template('/pages/home_detal.html', \
                          name=pages[1], \
                          **data, \
                          message=messages['index'])

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
    msg  = messages[page]
    msg  = messages[page] if page == 'login' else msg

    return render_template('/pages/acceso.html', \
                            name=pages[3], \
                            **data, \
                            page=page, \
                            message=msg)
  else:
    return render_template('/pages/acceso.html', \
                            name=pages[3], \
                            **data, \
                            page='login', \
                            message=messages['login'])
  
@app.route(MANAGE, methods=['GET'])
def manage (action, obj):
  if request.args:
    if obj == 'user':
      """
        User CRUD
      """
      if action == 'register':
        """
          Different use cases for CRUD
          - Register a new User
        """
        name  = request.args['name']
        birth = request.args['birthdate']
        email = request.args['email']
        passw = request.args['password']

        nUser = register_user(name,birth,email,passw)
        print(nUser)

        if nUser['message'] == 'Email already exists':
          return redirect(ACCESS)
        else:
          d = list()
          d.append(nUser['data'])
          session['data_user'] = d
          return redirect(ROOT)
        
      elif action == 'login':
        """
          Login a User
        """
        email = request.args['email']
        passw = request.args['password']

        User = login_user(email,passw)

        if User['message'] == 'Incorrect password':
          return redirect(ACCESS)
        else:
          session['data_user'] = User['data']
          return redirect(ROOT)

  else:
    return redirect(ACCESS)

@app.route(PRODUCT, methods=['GET'])
def product (id_product):
  idProduct = {"productId": id_product}

  data_product    = requests.post(DATABASE+PRD_BID_END, json=idProduct).json()
  related_product = requests.post(DATABASE+PRD_REL_END, json=idProduct).json()

  data['products'].clear()
  data['products'].append(data_product['data'])
  data['related_products'].clear()
  related1 = list(related_product['data']['randomBrands'])
  related2 = list(related_product['data']['randomTypes'])
  related1.extend(related2)
  data['related_products'] = related1

  return render_template('/pages/cart.html', \
                          name=pages[4], \
                          **data, \
                          id=0, \
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
    
    data_search = requests.post(DATABASE+PRD_FIL_END, json=filtro).json()
    print(data_search)

    return render_template('/pages/search.html', \
                            name=pages[5], \
                            **data, \
                            search=data_search, \
                            q=search, \
                            cnt=len(data_search['data']), \
                            message=messages['search'])
  else:
    return redirect(ROOT)
  
@app.route(LOGOUT)
def logout():
  session.pop('data_user', None)
  return redirect(ROOT)