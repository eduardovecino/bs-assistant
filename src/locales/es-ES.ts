import { Ssml } from "ssml-gib";

export const SPANISH_TRANSLATIONS = {
    'intent.product.welcome.permission': ` para dirigirme a usted por su nombre y conocer su ubicación`,
    'intent.product.get_permission.answer_%name%': `Bienvenido a Banco Sabadell, ${Ssml.break({ s: 1 })} {{ name }}`,
    'intent.product.get_permission.failure': `¡No puedo leer tu mente ahora mismo! ¡Mis poderes místicos han fallado!`,
    'intent.product.login': `Vamos a iniciar sesión`,
    'intent.product.get_signin.ok': `¡Genial, gracias por iniciar sesión!`,
    'intent.product.get_signin.failure': `No podré guardar tus datos, pero ¿qué quieres hacer a continuación?`,
    'intent.product.cancel': `Gracias por Contactar con Banco Sabadell, ¡Te esperamos pronto!`,
    'intent.product.help': `Puedes preguntar sobre tus tarjetas, tus cuentas o las oficinas más cercanas. ¿Qué deseas hacer?`,
}
