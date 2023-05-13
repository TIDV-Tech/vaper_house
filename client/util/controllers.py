import requests
from var import *

def register_user(name,birth,email,passw):
  data = {
    "fullName": name,
    "email": email,
    "dateBirth": birth,
    "password": passw
  }
  
  r = requests.post(API_REST+REG_USR_END, json=data).json()
  return r

def login_user(email,passw):
  data = {
    "email": email,
    "password": passw
  }

  r = requests.post('http://localhost:4000/login', json=data).json()
  return r