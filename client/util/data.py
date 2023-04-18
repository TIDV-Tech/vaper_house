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
  ]
}