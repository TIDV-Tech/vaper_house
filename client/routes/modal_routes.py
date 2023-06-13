from flask            import *
from util.data        import *
from util.var         import *
from util.controllers import *
import json

modal_router = Blueprint("modal", __name__)

@modal_router.route(MODAL_DATA)
def modal_data():
  modal_data = json.dumps(data["modal"])
  response = Response(modal_data, headers={"Access-Control-Allow-Origin": "*"})
  
  return response

@modal_router.route(MODAL)
def modal():
  '''
    getting the users
  '''
  users = get_users()
  
  columns_users   = data["modal"][0]["options"][0]["filters"]
  registers_users = [dict(register = list(register.values())) for register in users["data"]]
  
  for register in registers_users:
    register["register"].pop(4)
  
  users_data = {
    "cols": columns_users,
    "rows": registers_users
  }
  '''
    getting the purchases
  '''
  purchases = get_purchases()
  
  columns_purchases   = data["modal"][1]["options"][0]["filters"]
  registers_purchases = [dict(register = list(register.values())) for register in purchases["data"]]
  
  purchases_data = {
    "cols": columns_purchases,
    "rows": registers_purchases
  }
  
  '''
    getting the products
  '''
  products = get_products()
  
  columns_products   = data["modal"][2]["options"][0]["filters"]
  registers_products = [dict(register = list(register.values())) for register in products["data"]]
  
  for register in registers_products:
    register["register"].pop(7)
  
  products_data = {
    "cols": columns_products,
    "rows": registers_products
  }
  
  data["modal"][0]["options"][0]["data"] = users_data
  data["modal"][1]["options"][0]["data"] = purchases_data
  data["modal"][2]["options"][0]["data"] = products_data
  
  modal = get_template_attribute("macros/modal.html", "modal")
  
  modals = [
    modal(data["modal"][0]["options"][0]),
    modal(data["modal"][0]["options"][1]),
    modal(data["modal"][1]["options"][0]),
    modal(data["modal"][1]["options"][1]),
    modal(data["modal"][2]["options"][0]),
    modal(data["modal"][2]["options"][1]),
    modal(data["modal"][2]["options"][2]),
  ]

  response = Response(modals, headers={"Access-Control-Allow-Origin": "*"})
  
  return response