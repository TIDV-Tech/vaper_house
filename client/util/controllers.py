import requests
from util.var import *

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

  r = requests.post(API_REST+LOG_USR_END, json=data).json()
  return r

def set_filter(filter, value, from_filter):
  if from_filter == "User":
    match filter:
      case "ID del cliente":     
        data = dict()
        data["userId"] = value
        url = DATABASE+USR_ID_END
        r = requests.post(url, json=data).json()
        return r
      case "Nombre":              filter = "fullName" 
      case "Fecha de nacimiento": filter = "dateBirth" 
      case "Correo":              filter = "email" 
      case "Fecha de creación":   filter = "createdAt" 
      case "Fecha de edición":    filter = "updatedAt" 
    url = DATABASE+USR_FIL_END
  if from_filter == "Purchase":
    url = DATABASE+PUR_FIL_END
  if from_filter == "Product":
    url = DATABASE+PRD_FIL_END
  
  data = dict()
  data["filter"] = dict({filter: value})
  
  r = requests.post(url, json=data).json()
  return r

def get_users():
  r = requests.get(DATABASE+USR_GET_END).json()
  return r

def get_products():
  r = requests.get(DATABASE+PRS_GET_END).json()
  return r

def get_purchases():
  r = requests.get(DATABASE+PUR_GET_END).json()
  return r

