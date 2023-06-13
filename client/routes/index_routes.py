from flask            import *
from util.data        import *
from util.var         import *
from util.controllers import *
import requests

index_router = Blueprint("index", __name__)

@index_router.route(ROOT)
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

  return render_template('/pages/home_detal.min.html', \
                          name=pages[1], \
                          **data, \
                          message=messages['index'])

@index_router.route(MAYOR)
def mayor ():
  return render_template('/pages/home_mayor.min.html', \
                          name=pages[2], \
                          **data, \
                          message=messages['mayor'])