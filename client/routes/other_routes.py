from flask            import *
from util.data        import *
from util.var         import *
from util.controllers import *
import requests

other_router = Blueprint("other", __name__)

@other_router.route(SEARCH, methods=['GET'])
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

    return render_template('/pages/search.min.html', \
                            name=pages[5], \
                            **data, \
                            search=data_search, \
                            q=search, \
                            cnt=len(data_search['data']), \
                            message=messages['search'])
  else:
    return redirect(ROOT)

@other_router.route(FILTER, methods=["POST"])
def filter_post():
  filter_info = request.get_json()
  found = set_filter(filter=filter_info["filter_selected"], value=filter_info["value"], from_filter=filter_info["from"])
  modal_content = get_template_attribute("macros/modal.html", "modal_content")
  
  table_content = {
    "cols": [],
    "rows": []
  }
  
  if filter_info["from"] == "User": 
    table_content["cols"] = data["modal"][0]["options"][0]["filters"]
    
    if type(found["data"]) == list:
      table_content["rows"] = [dict(register = list(register.values())) for register in found["data"]]
    else: table_content["rows"] = [dict(register = list(found["data"].values()))]

    for register in table_content["rows"]:
      register["register"].pop(4)
  
  if filter_info["from"] == "Purchase": 
    table_content["cols"] = data["modal"][1]["options"][0]["filters"]
    if type(found["data"]) == list:
      table_content["rows"] = [dict(register = list(register.values())) for register in found["data"]]
    else: table_content["rows"] = [dict(register = list(found["data"].values()))]
  
  if filter_info["from"] == "Product": 
    table_content["cols"] = data["modal"][2]["options"][0]["filters"]
    
    if type(found["data"]) == list:
      table_content["rows"] = [dict(register = list(register.values())) for register in found["data"]]
    else: table_content["rows"] = [dict(register = list(found["data"].values()))]
    for register in table_content["rows"]:
      register["register"].pop(7)
  
  table = modal_content(table_content)
  
  response = Response(table, headers={"Access-Control-Allow-Origin": "*"})
  
  return response