from os import *

file_base = 'resources'
logo_base = 'resources/logo'
links     = listdir(f'static/css')
scripts   = listdir(f'static/js')
files     = listdir(f'static/{file_base}')
logo      = str(listdir(f'static/{logo_base}'))

data = {
  'title': 'Vaper House',
  'language': 'es',
  'message': 'Bienvenido',
  'logo': {
    'name': logo.split('.')[0][2:],
    'ext': logo.split('.')[1][:-2],
    'base': f'{logo_base}/{logo[2:-2]}'
  },
  'external': [
    'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'
  ],
  'styles': [link for link in links if '.' in link],
  'script': [script for script in scripts if '.' in script],
  'images':  [file for file in files if '.' in file],
  'saldo': 15.99,
  'user': 'Andi M',
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
    {
      'name': 'Lo más nuevo',
      'img': 'resources/categories/lo_mas_nuevo.jfif'
    },
    {
      'name': 'Promociones',
      'img': 'resources/categories/promociones.jfif'
    },
    {
      'name': 'Accesorios',
      'img': 'resources/categories/accesorios.jpg'
    },
    {
      'name': 'Tanques',
      'img': 'resources/categories/tanques.jpg'
    },
    {
      'name': 'e-liquids',
      'img': 'resources/categories/e_liquids.jpg'
    },
    {
      'name': 'Kits',
      'img': 'resources/categories/kits.jpg'
    },
  ],
  'categories2': [
    {
      'name': 'Baterias',
      'img': 'resources/categories2/baterias.jpg'
    },
    {
      'name': 'Mijo_Vape',
      'img': 'resources/categories2/mijo_Vape.png'
    },
    {
      'name': 'Equipos',
      'img': 'resources/categories2/equipos.png'
    },
    {
      'name': 'Resistencias',
      'img': 'resources/categories2/resistencias.jpg'
    },
  ],
  'products': [
    {
      'name': 'Titulo',
      'img': 'resources/products/6e575250e436fd98da66a14db8cf53f5.jpg',
      'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias commodi temporibus provident porro itaque saepe, quo repellat quod.',
      'price': 10.00
    },
    {
      'name': 'Tiulo',
      'img': 'resources/products/descarga.jpeg',
      'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias commodi temporibus provident porro itaque saepe, quo repellat quod.',
      'price': 10.00
    },
    {
      'name': 'Titulo',
      'img': 'resources/products/CBD_05_A.jpg',
      'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias commodi temporibus provident porro itaque saepe, quo repellat quod.',
      'price': 10.00
    },
    {
      'name': 'Titulo',
      'img': 'resources/products/draw_svg20210507-22909-pboesy.svg.png',
      'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias commodi temporibus provident porro itaque saepe, quo repellat quod.',
      'price': 10.00
    },
  ],
  'info': ['¿Quiénes somos?', '¿Qué ofrecemos?'],
  'politica': ['Términos y condiciones', 'Políticas de seguridad', 'Políticas de Cookies'],
  'social': [
    {
      'red': 'facebook',
      'ico': 'bx bxl-instagram bx-sm',
      'dir': 'vaperhouse.vzla'
    },
    {
      'red': 'instagram',
      'ico': 'bx bxl-facebook-circle bx-sm',
      'dir': 'Vaper House Café'
    },
  ],
  'direccion': 'Barrio Obrero carrera 20 entre calles 13 y 14, diagonal al Cine Pirineos, frente a cada Matina',
  'contacto': 'comprasvaperhouse@gmail.com',
  'numeros': ['+58412-1729864', '+58414-7573307']
}