import { Ssml } from "ssml-gib";

export const ENGLISH_TRANSLATIONS= {
    'intent.product.welcome.answer': 'In order to forward you by your name and know your location,',
    'intent.product.welcome.answer_%name%': `Welcome to Banco Sabadell, ${Ssml.break({ s: 1 })} {{ name }}`
}