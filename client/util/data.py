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
  'images': [file for file in files if '.' in file],
  'sheets': {
    'Error404': {
      'css': [
        'root.min.css',
        '404.min.css',
        'main.min.css',
        'footer.min.css',
      ],
      'js': [
        'toggle_menu.min.js',
      ]
    },
    'VentasDetal': {
      'css': [
        'root.min.css',
        'flickity.min.css',
        'carousel.min.css',
        'main.min.css',
        'categories.min.css',
        'products.min.css',
        'modal.min.css',
        'footer.min.css',
      ],
      'js': [
        'toggle_menu.min.js',
        'flickity.min.js',
        'confirm_age.min.js',
      ]
    },
    'VentasMayor': {
      'css': [
        'root.min.css',
        'flickity.min.css',
        'carousel.min.css',
        'main.min.css',
        'categories2.min.css',
        'products.min.css',
        'modal.min.css',
        'footer.min.css',
      ],
      'js': [
        'toggle_menu.min.js',
        'flickity.min.js',
        'confirm_age.min.js',
      ]
    },
    'Acceso': {
      'css': [
        'root.min.css',
        'font-awesome/css/font-awesome.min.css',
        'acceso-util.min.css',
        'acceso.min.css',
      ],
      'js': [
        'jquery.min.js',
        'tilt.jquery.min.js',
        'acceso.min.js',
      ]
    },
    'DecripcionProducto': {
      'css': [
        'root.min.css',
        'main.min.css',
        'modal.min.css',
        'products.min.css',
        'footer.min.css',
      ],
      'js': [
        'toggle_menu.min.js',
        'confirm_age.min.js',
        'product.min.js',
      ]
    },
    'Busqueda': {
      'css': [
        'root.min.css',
        'main.min.css',
        'modal.min.css',
        'products.min.css',
        'footer.min.css',
        'search.min.css',
      ],
      'js': [
        'toggle_menu.min.js',
        'confirm_age.min.js',
      ]
    },
  },
  'saldo': 0.00,
  'user': {},
  'warning_msg': '''Advertencia: Prohibida la venta a menores de 18 años.
    Algunos productos contienen nicotina, una sustancia
    altamente adictiva''',
  'options': [
    {
      'name': 'Inicio',
      'url': '/'
    },
    {
      'name': 'Dispositivos',
      'url': '/'
    },
    {
      'name': 'Atomizadores',
      'url': '/'
    },
    {
      'name': 'E-Liquids',
      'url': '/'
    },
    {
      'name': 'Salt Nic',
      'url': '/'
    },
    {
      'name': 'Accesorios',
      'url': '/'
    },
    {
      'name': 'Puffs',
      'url': '/'
    },
    {
      'name': 'Promociones',
      'url': '/'
    },
    {
      'name': 'Destacado',
      'url': '/'
    },
    {
      'name': 'Contacto',
      'url': '/'
    }
  ],
  'responsiveOptions': [
    {
      'name': 'Inicio',
      'url': '/'
    },
    {
      'name': 'Ventas al mayor',
      'url': '/'
    },
    {
      'name': 'Dispositivos',
      'url': '/'
    },
    {
      'name': 'Atomizadores',
      'url': '/'
    },
    {
      'name': 'E-Liquids',
      'url': '/'
    },
    {
      'name': 'Salt Nic',
      'url': '/'
    },
    {
      'name': 'Accesorios',
      'url': '/'
    },
    {
      'name': 'Puffs',
      'url': '/'
    },
    {
      'name': 'Promociones',
      'url': '/'
    },
    {
      'name': 'Destacado',
      'url': '/'
    },
    {
      'name': 'Contacto',
      'url': '/'
    },
    {
      'name': 'Carrito',
      'url': '/'
    },
    {
      'name': 'Perfil',
      'url': '/'
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
  'promotions': [],
  'new_products': [],
  'products': [],
  'related_products': [],
  'info': ['¿Quiénes somos?', '¿Qué ofrecemos?', 'Contacto'],
  'politica': ['Términos y condiciones', 'Políticas de seguridad', 'Políticas de Cookies'],
  'social': [
    {
      'red': 'facebook',
      'url': 'https://m.facebook.com/VaperHousesc/',
      'ico': 'bx bxl-facebook-circle bx-sm',
      'dir': 'Vaper House'
    },
    {
      'red': 'instagram',
      'url': 'https://instagram.com/vaperhouse.vzla?igshid=YmMyMTA2M2Y=',
      'ico': 'bx bxl-instagram bx-sm',
      'dir': 'vaperhouse.vzla'
    },
  ],
  'direccion': 'Barrio Obrero carrera 20 entre calles 13 y 14, diagonal al Cine Pirineos, frente a casa Matina',
  'contacto': 'vaperhouse.sc@gmail.com',
  'numeros': ['+58412-1729864', '+58414-7573307'],
}

messages = {
  'error':    'Error: Página no encontrada',
  'index':    'Bienvenido - Encuentra todo para tu vapeo',
  'mayor':    'Bienvenido - Ventas al mayor',
  'cart':     'Carrito de ventas',
  'search':   'Resultados de tu busqueda',
  'login':    'Accede a tu cuenta',
  'register': 'Crea una cuenta',
}

pages = [
  'Error404',
  'VentasDetal',
  'VentasMayor',
  'Acceso',
  'DecripcionProducto',
  'Busqueda',
]