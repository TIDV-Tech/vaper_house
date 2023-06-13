from flask            import *
from util.data        import *
from util.var         import *
from util.controllers import *

auth_router = Blueprint("auth", __name__)

@auth_router.route(ACCESS, methods=['GET'])
def acceso ():
  if request.args:
    page = request.args['page']
    msg  = messages[page]
    msg  = messages[page] if page == 'login' else msg

    return render_template('/pages/acceso.min.html', \
                            name=pages[3], \
                            **data, \
                            page=page, \
                            message=msg)
  else:
    return render_template('/pages/acceso.min.html', \
                            name=pages[3], \
                            **data, \
                            page='login', \
                            message=messages['login'])
    
@auth_router.route(LOGOUT)
def logout():
  session.pop('data_user', None)
  return redirect(ROOT)

@auth_router.route(MANAGE, methods=['GET'])
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
        print(nUser['message'])

        if nUser['message'] != 'Successful user registration':
          return redirect(f"{ACCESS}?page=register")
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