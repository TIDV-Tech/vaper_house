# API REST
- ##### Registro de usuarios:
Se aplicaron las siguientes validaciones:
- Validación del email para que tenga un formato de correo, es decir: user12@root.com
- Validación de la contraseña para que tenga: letras mayúsculas y minúsculas, números, símbolos y que no sea menor de 8 dígitos. Ejemplo: User12//

Si se cumplen las dos, se registra la persona. Además de, una validación que revisa si el correo que están ingresando ya existe o no, en caso de que exista manda un mensaje de: el email ya existe, sino,  entonces registra el usuario.
La información que se pasa para registrar el usuario es: fullName, email, dateBirth, password.
`

    {
    	"fullName": "mi nombre",
    	"email": "micorreo@root.com",
    	"dateBirth": "2023-05-09",
    	"password": "Mi_usuario12/"
    }`


- ##### Inicio de Sesión:
Se hicieron las siguientes validaciones:
- Validación para email y password, en caso de que se ingresen datos que no estén registrados, manda un mensaje de: Correo o contraseña incorrectos 
- Validación de campos vacíos, si email o password no tienen datos, manda un mensaje de: Los campos no se pueden dejar vacíos
- Validación de que en caso de que el correo si esté registrado, verifica la contraseña hasheada, en caso de que esta coincida, manda un mensaje de: Correcto, has iniciado sesión. En caso contrario, dice: Contraseña incorrecta

Se ingresan los siguientes datos: email, password


    {
    	"email": "micorreo@root.com",
    	"password": "Mi_usuario12/"
    }

Su ruta es: /login