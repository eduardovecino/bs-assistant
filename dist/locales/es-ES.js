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
    'intent.account.ask': `¿Qué más quieres saber acerca de tu cuenta?`,
    'intent.account.selected_account_%account%': `Has seleccionado la {{ account }}. `,
    'intent.account.selected_account.failure_%account%': `No podemos mostrar la cuenta terminada en {{ account }}.`,
    'intent.account.simple_response_%number%_%accounts%': `Tienes {{ number }} cuentas. Terminadas en: {{ accounts }} ¿Cúal deseas seleccionar?`,
    'intent.account.list.title': 'Mis Cuentas',
    'intent.account.balance_%account%_%balance%': `El saldo  de tu {{ account }} es de {{ balance }} €. ¿Qué más quieres saber acerca de tu cuenta?`,
    'intent.account.movements.simple_response.pre_%concept%_%import%': `{{ concept }} con un importe de {{ import }} €, `,
    'intent.account.movements.simple_response_%number%_%movements%': `Este mes tienes {{ number }} movimientos: {{ movements }} ¿Qué más quieres saber acerca de tu cuenta?`,
    'intent.account.movements.table.simple_response_%number%': `Este mes tienes {{ number }} movimientos: `,
    'intent.account.movements.no_movements': `No hay movimientos recientes en esta cuenta`,
    'intent.account.movements.table.column.first': 'Concepto',
    'intent.account.movements.table.column.second': 'Fecha',
    'intent.account.movements.table.column.third': 'Importe',
    //CARDS
    'intent.card.null_response': `No se ha encontrado ninguna tarjeta, prueba en decir el tipo de cuenta o los 4 últimos numeros`,
    'intent.card.help': `Puedes preguntame por el saldo, últimos movimientos, fecha liquidación, limites o bloquear tarjeta`,
    'intent.card.simple_response_%number%_%cards%': `Tienes {{ number }} tarjetas. Terminadas en: {{ cards }} ¿Cúal deseas seleccionar?`,
    'intent.card.selected_card_%card%': `Has seleccionado la tarjeta finalizada en {{ card }}. `,
    'intent.card.selected_card.failure_%card%': `No podemos mostrar la tarjeta terminada en {{ card }}.`,
    'intent.card.list.title': 'Mis Tarjetas',
    'intent.card.balance_%card%_%balance%': `El saldo  de tu tarjeta {{ card }} es de {{ balance }} €. ¿Qué más quieres saber acerca de tu tarjeta?`,
    'intent.card.block_%card%': `Tu tarjeta finalizada en: {{ card }}. Ha sido bloqueada exitosamente, para desbloquearla deberás utilizar la APP del Banco Sabadell. ¿Qué más quieres saber acerca de tu tarjeta?`,
    'intent.card.settlement%card%_%date%': `La fecha próxima de liquidación de tu tarjeta finalizada en {{ card }} es de {{ date }}. ¿Qué más quieres saber acerca de tu tarjeta?`,
    'intent.card.limit%card%_%authorized_limit%_%credit_limit%': `Los límites de tu tarjeta finalizada en {{ card }} son, limite autorizado: {{ authorized_limit }} € y limite crédito: {{ credit_limit }} €. ¿Quieres saber algo más de la tarjeta?`,
    'intent.card.movements.simple_response.pre_%concept%_%import%': `{{ concept }} con un importe de {{ import }} €, `,
    'intent.card.movements.simple_response_%number%_%movements%': `Este mes tienes {{ number }} movimientos: {{ movements }} ¿Quieres saber algo más de tu tarjeta?`,
    'intent.card.movements.no_movements': `No hay movimientos recientes en esta tarjeta`,
    'intent.card.movements.table.column.first': 'Concepto',
    'intent.card.movements.table.column.second': 'Fecha',
    'intent.card.movements.table.column.third': 'Importe',
    //INFORMATION
    'intent.information.offices.simple_response_%offices%': `Las oficinas cercanas a tu posición son: {{ offices }}. ¿Cúal quieres seleccionar?`,
    'intent.information.open_app.simple_response.screen': `Descargate la app, para más información`,
    'intent.information.open_app.simple_response.no_screen': `Accede a la tienda de aplicaciones de tu dispositivo móvil y busca la aplicación App Banco Sabadell. Tu banca móvil`,
    'intent.information.open_app.basic_card.title': `Abrir App`,
    'intent.information.contact.simple_response': `Puedes contactarnos, cualquier día y a cualquier hora, a través del teléfono: 902 323 000`,
};
//# sourceMappingURL=es-ES.js.map