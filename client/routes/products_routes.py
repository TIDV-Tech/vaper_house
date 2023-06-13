from flask            import *
from util.data        import *
from util.var         import *
from util.controllers import *
import requests

product_router = Blueprint("product", __name__)

@product_router.route(PRODUCT, methods=['GET'])
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

  return render_template('/pages/cart.min.html', \
                          name=pages[4], \
                          **data, \
                          id=0, \
                          message=messages['cart'])