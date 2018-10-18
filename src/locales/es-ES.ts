import { Ssml } from "ssml-gib";

export const SPANISH_TRANSLATIONS = {
    //GENERAL
    'intent.service.failure': `No ha funcionado, vuelve a intentarlo`,

    //PRODUCTS
    'intent.product.welcome.permission': ` para dirigirme a usted por su nombre y conocer su ubicación`,
    'intent.product.get_permission.answer_%name%': `Bienvenido a Banco Sabadell, ${Ssml.break({ s: 1 })} {{ name }}`,
    'intent.product.get_permission.failure': `¡No puedo leer tu mente ahora mismo! ¡Mis poderes místicos han fallado!`,
    'intent.product.login': `Vamos a iniciar sesión`,
    'intent.product.get_signin.ok': `¡Genial, gracias por iniciar sesión!`,
    'intent.product.get_signin.failure': `No podré guardar tus datos, pero ¿qué quieres hacer a continuación?`,
    'intent.product.cancel': `Gracias por Contactar con Banco Sabadell, ¡Te esperamos pronto!`,
    'intent.product.help': `Puedes preguntar sobre tus tarjetas, tus cuentas o las oficinas más cercanas. ¿Qué deseas hacer?`,

    //ACCOUNTS
    'intent.account.null_response': `No se ha encontrado ninguna cuenta, prueba en decir el tipo de cuenta o los 4 últimos numeros`,
    'intent.account.help': `Puedes preguntarme por el saldo o los movimientos de una cuenta`,
    'intent.account.account_list_%number%': `Tienes {{ number }} cuentas. Terminadas en: `,
    'intent.account.selected_account_%account%': `Has seleccionado la {{ account }}. `,
    'intent.account.selected_account.failure_%account%': `No podemos mostrar la cuenta terminada en {{ account }}.`,
    'intent.account.simple_response_%number%_%accounts%': `Tienes {{ number }} cuentas. Terminadas en: {{ accounts }} ¿Cúal deseas seleccionar?`,

    //INFORMATION
    'intent.information.simple_response_%offices%': `Las oficinas cercanas a tu posición son: {{ offices }}. ¿Cúal quieres seleccionar?`,
    

}
