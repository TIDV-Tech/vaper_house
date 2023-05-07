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
    {
      'name': 'Inicio',
      'url': '/home'
    },
    {
      'name': 'Dispositivos',
      'url': '/dispositivo'
    },
    {
      'name': 'Atomizadores',
      'url': '/atomizador'
    },
    {
      'name': 'E-Liquids',
      'url': '/eliquid'
    },
    {
      'name': 'Salt Nic',
      'url': '/saltnic'
    },
    {
      'name': 'Accesorios',
      'url': '/accesorio'
    },
    {
      'name': 'Puffs',
      'url': '/puff'
    },
    {
      'name': 'Promociones',
      'url': '/promocion'
    },
    {
      'name': 'Destacado',
      'url': '/destacado'
    },
    {
      'name': 'Contacto',
      'url': '/contacto'
    }
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
      'id': 1,
      'name': 'LUXE 80',
      'img': 'resources/products/6e575250e436fd98da66a14db8cf53f5.jpg',
      'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias commodi temporibus provident porro itaque saepe, quo repellat quod.',
      'price': 10.00
    },
    {
      'id': 2,
      'name': 'Air Factory Eliquid 100mL',
      'img': 'resources/products/descarga.jpeg',
      'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias commodi temporibus provident porro itaque saepe, quo repellat quod.',
      'price': 30.00
    },
    {
      'id': 3,
      'name': 'Titulo',
      'img': 'resources/products/CBD_05_A.jpg',
      'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias commodi temporibus provident porro itaque saepe, quo repellat quod.',
      'price': 9.99
    },
    {
      'id': 4,
      'name': 'Titulo',
      'img': 'resources/products/draw_svg20210507-22909-pboesy.svg.png',
      'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias commodi temporibus provident porro itaque saepe, quo repellat quod.',
      'price': 15.00
    },
    {
      'id': 5,
      'name': 'Titulo',
      'img': 'resources/products/6e575250e436fd98da66a14db8cf53f5.jpg',
      'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias commodi temporibus provident porro itaque saepe, quo repellat quod.',
      'price': 11.00
    },
    {
      'id': 6,
      'name': 'Vaper para machos pecho peluo',
      'img': 'resources/products/descarga.jpeg',
      'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias commodi temporibus provident porro itaque saepe, quo repellat quod.',
      'price': 25.00
    },
    {
      'id': 7,
      'name': 'Titulo terriblemente largo',
      'max': 5,
      'img': 'resources/products/CBD_05_A.jpg',
      'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias commodi temporibus provident porro itaque saepe, quo repellat quod.',
      'price': 6.80
    },
    {
      'id': 8,
      'name': 'Titulo',
      'img': 'resources/products/draw_svg20210507-22909-pboesy.svg.png',
      'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias commodi temporibus provident porro itaque saepe, quo repellat quod.',
      'price': 17.50
    },
  ],
  'info': ['¿Quiénes somos?', '¿Qué ofrecemos?', 'Contacto'],
  'politica': ['Términos y condiciones', 'Políticas de seguridad', 'Políticas de Cookies'],
  'social': [
    {
      'red': 'facebook',
      'ico': 'bx bxl-facebook-circle bx-sm',
      'dir': 'Vaper House Café'
    },
    {
      'red': 'instagram',
      'ico': 'bx bxl-instagram bx-sm',
      'dir': 'vaperhouse.vzla'
    },
  ],
  'direccion': 'Barrio Obrero carrera 20 entre calles 13 y 14, diagonal al Cine Pirineos, frente a casa Matina',
  'contacto': 'vaperhouse.sc@gmail.com',
  'numeros': ['+58412-1729864', '+58414-7573307'],
}

messages = {
  'error': 'Error: Página no encontrada',
  'index': 'Bienvenido - Encuentra todo para tu vapeo',
  'mayor': 'Bienvenido - Ventas al mayor',
  'cart':  'Carrito de ventas',
}