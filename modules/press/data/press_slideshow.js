//* ASSETS
import getImage from '@/assets/index.server'

const {
    Press_Repubblica,
    Press_TG5,
    Press_TG1,
    Press_24_Sole,
    Press_StartupItalia
} = getImage('press')

const press_logos = [{
        "id": "press-startupitalia",
        "img": {
            "src": Press_StartupItalia,
            "alt": "startupitalia"
        }
    },
    {
        "id": "press-repubblica",
        "img": {
            "src": Press_Repubblica,
            "alt": "repubblica"
        }
    },
    {
        "id": "press-tg5",
        "img": {
            "src": Press_TG5,
            "alt": "tg5"
        }
    },
    {
        "id": "press-tg1",
        "img": {
            "src": Press_TG1,
            "alt": "tg1"
        }
    },
    {
        "id": "press-24-sole",
        "img": {
            "src": Press_24_Sole,
            "alt": "24-sole"
        }
    },
    {
        "id": "press-startupitalia",
        "img": {
            "src": Press_StartupItalia,
            "alt": "startupitalia"
        }
    },
    {
        "id": "press-repubblica",
        "img": {
            "src": Press_Repubblica,
            "alt": "repubblica"
        }
    }
]

export default press_logos