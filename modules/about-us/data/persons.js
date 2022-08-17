//* ASSETS
import getImage from '@/assets/index.server';

const {
    AboutUs_Boss,
    AboutUs_Gatto,
    AboutUs_Lapo,
    AboutUs_Stefy,
    AboutUs_Salvo_Giammarresi,
    AboutUs_Andrea_Febbraio,
} = getImage('about_us')

const team = [{
        "img": {
            "src": AboutUs_Boss,
            "alt": "team-boss"
        },
        "person": {
            "name": "Giorgio Sadolfo",
            "role": "ceo"
        }
    },
    {
        "img": {
            "src": AboutUs_Lapo,
            "alt": "team-lapo"
        },
        "person": {
            "name": "Francesco Ceccherelli",
            "role": "cco"
        }
    },
    {
        "img": {
            "src": AboutUs_Stefy,
            "alt": "team-stefy"
        },
        "person": {
            "name": "Stefania De Roberto",
            "role": "cto"
        }
    },
    {
        "img": {
            "src": AboutUs_Gatto,
            "alt": "team-gatto"
        },
        "person": {
            "name": "Andrea Gattini",
            "role": "cmo"
        }
    }
]
const advisors = [{
        "img": {
            "src": AboutUs_Andrea_Febbraio,
            "alt": "advisor-founder-teads"
        },
        "person": {
            "name": "Andrea Febbraio",
            "role": "co-founder teads"
        }
    },
    {
        "img": {
            "src": AboutUs_Salvo_Giammarresi,
            "alt": "advisor-paypal"
        },
        "person": {
            "name": "Salvatore Giammaresi",
            "role": "head of globalization at paypal"
        }
    }
]

export {
    team,
    advisors
}