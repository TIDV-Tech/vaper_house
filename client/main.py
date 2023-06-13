from flask            import *
from util.data        import *
from util.var         import *
from util.controllers import *

from routes.index_routes    import index_router
from routes.auth_routes     import auth_router
from routes.admin_router    import admin_router
from routes.products_routes import product_router
from routes.modal_routes    import modal_router
from routes.other_routes    import other_router

app = Flask(__name__)
app.secret_key = SECRET

@app.errorhandler(404)
def page_not_found(e):
  return render_template('/pages/404.min.html', \
                         name=pages[0], \
                         **data, \
                         message=messages['error'])

app.register_blueprint(index_router)
app.register_blueprint(auth_router)
app.register_blueprint(admin_router)
app.register_blueprint(product_router)
app.register_blueprint(modal_router)
app.register_blueprint(other_router)