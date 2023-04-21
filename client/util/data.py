from os import *

file_base = 'resources'
logo_base = 'resources/logo'
files     = listdir(f'static/{file_base}')
logo      = str(listdir(f'static/{logo_base}'))

data = {
  'title': 'Vaper House',
  'language': 'es',
  'logo': {
    'name': logo.split(".")[0][2:],
    'ext': logo.split(".")[1][:-2],
    'base': f'{logo_base}/{logo[2:-2]}'
  },
  'files': [file for file in files if '.' in file],
  'warning_msg': '''Advertencia: Prohibida la venta a menores de 18 años.
    Algunos productos contienen nicotina, una sustancia
    altamente adictiva''',
  'options': [
    { 'name': 'Inicio' },
    { 'name': 'Dispositivos',},
    { 'name': 'Atomizadores', },
    { 'name': 'E-Liquids', },
    { 'name': 'Salt Nic', },
    { 'name': 'Accesorios', },
    { 'name': 'Puffs', },
    { 'name': 'Promociones', },
    { 'name': 'Destacado', },
    { 'name': 'Contacto', }
  ],
  'categories': [
    {"name": "Lo más nuevo", "img": "resources/categories/lo_mas_nuevo.jfif"},
    {"name": "Promociones", "img": "resources/categories/promociones.jfif"},
    {"name": "Accesorios", "img": "resources/categories/accesorios.jpg"},
    {"name": "Tanques", "img": "resources/categories/tanques.jpg"},
    {"name": "e-liquids", "img": "resources/categories/e_liquids.jpg"},
    {"name": "Kits", "img": "resources/categories/kits.jpg"},
  ],
  "categories2": [
    {"name": "Baterias", "img": "resources/categories2/baterias.jpg"},
    {"name": "Mijo_Vape", "img": "resources/categories2/mijo_Vape.png"},
    {"name": "Equipos", "img": "resources/categories2/equipos.png"},
    {"name": "Resistencias", "img": "resources/categories2/resistencias.jpg"},
  ],
  "products": [
    {"name": "Titulo", "img": "resources/products/6e575250e436fd98da66a14db8cf53f5.jpg"},
    {"name": "Tiulo", "img": "resources/products/descarga.jpeg"},
    {"name": "Titulo", "img": "resources/products/CBD_05_A.jpg"},
    {"name": "Titulo", "img": "resources/products/draw_svg20210507-22909-pboesy.svg.png"},
    {"name": "Titulo", "img": "resources/products/vaper.jpg"},
    {"name": "Titulo", "img": "resources/products/istockphoto-1409455895-612x612.jpg"},
    {"name": "Titulo", "img": "resources/products/hombre.jpg"},
    {"name": "Titulo", "img": "resources/products/cannacoil-cannabis-coil-logo-vaping-260nw-1324480643.jpg"},
    {"name": "Titulo", "img": "resources/products/Logo-Chilivaper-Final-05-300x180.png"},
    {"name": "Titulo", "img": "resources/products/logo-1.svg"},
    {"name": "Titulo", "img": "resources/products/cart-top-image.png"},
    {"name": "Titulo", "img": "resources/products/vape-store-logo-design_626969-479.jpg"},
  ]
}