import getImage from '@/assets/index.server'

const {
    FT_x4_Combo,
    FT_x4_Black,
    FT_x4_Blue,
    FT_x4_Red,
    FT_x4_White,
    FT_Black_Front,
    FT_Blue_Front,
    FT_Red_Front,
    FT_White_Front,
    PreviewGallery_Img_1,
    PreviewGallery_Img_2,
    PreviewGallery_Img_3,
    PreviewGallery_Img_4,
    PreviewGallery_Img_5
} = getImage('products')

const {
    I_FT_Black,
    I_FT_Blue,
    I_FT_Red,
    I_FT_White,
    I_FT_Mix
} = getImage('icons')

const filo_tag_x1 = {
    "bundle": "single",
    "name": "1x Filo Tag",
    "variants": ["red", "black", "blue", "white"],
    "price": "24,90 €"
}

const filo_tag_x4 = {
    "bundle": "x4",
    "name": "4x Filo Tag",
    "variants": ["red", "black", "blue", "white", "mix"],
    "price": "64,90 €"
}

const wc_details = [{
        "id": 144,
        "name": "Filo Tag - Bluetooth Tracker",
        "bundle": "1x",
        "color": "black",
        "img": {
            "src": FT_Black_Front,
            "alt": "ft-black",
        }
    },
    {
        "id": 145,
        "name": "Filo Tag - Bluetooth Tracker",
        "bundle": "1x",
        "color": "cyan",
        "img": {
            "src": FT_Blue_Front,
            "alt": "ft-blue",
        }
    },
    {
        "id": 146,
        "name": "Filo Tag - Bluetooth Tracker",
        "bundle": "1x",
        "color": "red",
        "img": {
            "src": FT_Red_Front,
            "alt": "ft-red",
        }
    },
    {
        "id": 147,
        "name": "Filo Tag - Bluetooth Tracker",
        "bundle": "1x",
        "color": "white",
        "img": {
            "src": FT_White_Front,
            "alt": "ft-white",
        }
    },
    {
        "id": 148,
        "name": "Filo Tag - Bluetooth Tracker",
        "bundle": "4x",
        "color": "black",
        "img": {
            "src": FT_x4_Black,
            "alt": "ft-x4-black",
        }
    },
    {
        "id": 149,
        "name": "Filo Tag - Bluetooth Tracker",
        "bundle": "4x",
        "color": "cyan",
        "img": {
            "src": FT_x4_Blue,
            "alt": "ft-x4-blue",
        }
    },
    {
        "id": 150,
        "name": "Filo Tag - Bluetooth Tracker",
        "bundle": "4x",
        "color": "red",
        "img": {
            "src": FT_x4_Red,
            "alt": "ft-x4-red",
        }
    },
    {
        "id": 151,
        "name": "Filo Tag - Bluetooth Tracker",
        "bundle": "4x",
        "color": "white",
        "img": {
            "src": FT_x4_White,
            "alt": "ft-x4-white",
        }
    },
    {
        "id": 152,
        "name": "Filo Tag - Bluetooth Tracker",
        "bundle": "4x",
        "color": "mix",
        "img": {
            "src": FT_x4_Combo,
            "alt": "ft-x4-mixed",
        }
    },
]

const gallery_details = [{
        "id": "ft-gallery-1",
        "img": {
            "src": PreviewGallery_Img_1,
            "alt": "ft-gallery-1"
        }
    },
    {
        "id": "ft-gallery-2",
        "img": {
            "src": PreviewGallery_Img_2,
            "alt": "ft-gallery-2"
        }
    },
    {
        "id": "ft-gallery-3",
        "img": {
            "src": PreviewGallery_Img_3,
            "alt": "ft-gallery-3"
        }
    },
    {
        "id": "ft-gallery-4",
        "img": {
            "src": PreviewGallery_Img_4,
            "alt": "ft-gallery-4"
        }
    },
    {
        "id": "ft-gallery-5",
        "img": {
            "src": PreviewGallery_Img_5,
            "alt": "ft-gallery-5"
        }
    },
]

const colors_details = [{
        "id": "ft-i-black",
        "color": "black",
        "img": {
            "src": I_FT_Black,
            "alt": "ft-i-black"
        }
    },
    {
        "id": "ft-i-blue",
        "color": "cyan",
        "img": {
            "src": I_FT_Blue,
            "alt": "ft-i-blue"
        }
    },
    {
        "id": "ft-i-red",
        "color": "red",
        "img": {
            "src": I_FT_Red,
            "alt": "ft-i-red"
        }
    },
    {
        "id": "ft-i-white",
        "color": "white",
        "img": {
            "src": I_FT_White,
            "alt": "ft-i-white"
        }
    },
    {
        "id": "ft-i-mix",
        "color": "mix",
        "img": {
            "src": I_FT_Mix,
            "alt": "ft-i-mix"
        }
    },
]

export {
    filo_tag_x1,
    filo_tag_x4,
    wc_details,
    gallery_details,
    colors_details
}