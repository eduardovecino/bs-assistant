"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ssml_gib_1 = require("ssml-gib");
exports.SPANISH_TRANSLATIONS = {
    //GENERAL
    'intent.service.failure': `No ha funcionado, vuelve a intentarlo`,
    //START
    'intent.start.welcome.permission': ` para dirigirme a usted por su nombre y conocer su ubicación`,
    'intent.start.get_permission.answer_%name%': `Bienvenido a Banco Sabadell, ${ssml_gib_1.Ssml.break({ s: 1 })} {{ name }}`,
    'intent.start.get_permission.failure': `¡No puedo leer tu mente ahora mismo! ¡Mis poderes místicos han fallado!`,
    'intent.start.login': `Vamos a iniciar sesión`,
    'intent.start.get_signin.ok': `¡Genial, gracias por iniciar sesión!`,
    'intent.start.get_signin.failure': `No podré guardar tus datos, pero ¿qué quieres hacer a continuación?`,
    'intent.start.cancel': `Gracias por Contactar con Banco Sabadell, ¡Te esperamos pronto!`,
    'intent.start.help': `Puedes preguntar sobre tus tarjetas, tus cuentas o las oficinas más cercanas. ¿Qué deseas hacer?`,
    //ACCOUNTS
    'intent.account.null_response': `No se ha encontrado ninguna cuenta, prueba en decir el tipo de cuenta o los 4 últimos numeros`,
    'intent.account.help': `Puedes preguntarme por el saldo o los movimientos de una cuenta`,
    'intent.account.selected_account_%account%': `Has seleccionado la {{ account }}. `,
    'intent.account.selected_account.failure_%account%': `No podemos mostrar la cuenta terminada en {{ account }}.`,
    'intent.account.simple_response_%number%_%accounts%': `Tienes {{ number }} cuentas. Terminadas en: {{ accounts }} ¿Cúal deseas seleccionar?`,
    'intent.account.list.title': 'Mis Cuentas',
    'intent.account.balance_%account%_%balance%': `El saldo  de tu {{ account }} es de {{ balance }} €. ¿Qué más quieres saber acerca de tu cuenta?`,
    'intent.account.movements.simple_response.pre_%concept%_%import%': `{{ concept }} con un importe de {{ import }} €, `,
    'intent.account.movements.simple_response_%number%_%movements%': `Este mes tienes {{ number }} movimientos: {{ movements }} ¿Qué más quieres saber acerca de tu cuenta?`,
    'intent.account.movements.no_movements': `No hay movimientos recientes en esta cuenta`,
    'intent.account.movements.table.column.first': 'Concepto',
    'intent.account.movements.table.column.second': 'Fecha',
    'intent.account.movements.table.column.third': 'Importe',
    //INFORMATION
    'intent.information.simple_response_%offices%': `Las oficinas cercanas a tu posición son: {{ offices }}. ¿Cúal quieres seleccionar?`,
    //CARDS
    'intent.card.null_response': `No se ha encontrado ninguna tarjeta, prueba en decir el tipo de cuenta o los 4 últimos numeros`,
    'intent.card.help': `Puedes preguntame por el saldo, últimos movimientos, fecha liquidación, limites o bloquear tarjeta`,
    'intent.card.simple_response_%number%_%cards%': `Tienes {{ number }} tarjetas. Terminadas en: {{ cards }} ¿Cúal deseas seleccionar?`,
};
//# sourceMappingURL=es-ES.js.map