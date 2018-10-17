import { Ssml } from "ssml-gib";

export const SPANISH_TRANSLATIONS = {
    'intent.product.welcome.answer': `para dirigirme a usted por su nombre y conocer su ubicación`,
    'intent.product.welcome.answer_%name%': `Bienvenido a Banco Sabadell, ${Ssml.break({ s: 1 })} {{ name }}`
}
