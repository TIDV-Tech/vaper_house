from flask            import *
from util.data        import *
from util.var         import *

admin_router = Blueprint("admin", __name__)

@admin_router.route(ADMIN)
def admin ():
  return render_template('/pages/admin.min.html', \
                          name=pages[6], \
                          **data, \
                          message=messages['admin'],
                          )