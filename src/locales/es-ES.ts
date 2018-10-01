import { Ssml } from "ssml-gib";

export const SPANISH_TRANSLATIONS = {
    'intent.product.welcome.answer': `You have three seconds to think about it blablaab... ${Ssml.break({ s: 3 })} para dirigirme a usted por su nombre y conocer su ubicación`,
    'intent.product.welcome.answer_%name%': `You have three seconds to think about it blablaab... ${Ssml.break({ s: 3 })} para dirigirme a usted por su nombre y conocer su ubicación`
}
