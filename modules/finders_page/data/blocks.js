//* ASSETS
import getImage from '@/assets/index.server'

const {
    Finders_Phone_Img_1,
    Finders_Key,
    Finders_Luggage,
    Finders_Wallet
} = getImage("finders")

const finders_block_1_data = {
    "id": "finders_block_1",
    "img": Finders_Phone_Img_1,
    "direction": "reverse",
    "title_label": "title_1",
    "description_label": "description_1"
}
const finders_block_key = {
    "id": "finders_block_key",
    "img": Finders_Key,
    "direction": "normal",
    "title_label": "title",
    "description_label": "description"
}
const finders_block_luggage = {
    "id": "finders_block_luggage",
    "img": Finders_Luggage,
    "direction": "normal",
    "title_label": "title",
    "description_label": "description"
}
const finders_block_wallet = {
    "id": "finders_block_wallet",
    "img": Finders_Wallet,
    "direction": "normal",
    "title_label": "title",
    "description_label": "description"
}
const finders_block_phone = {
    "id": "finders_block_phone",
    "img": Finders_Phone_Img_1,
    "direction": "normal",
    "title_label": "title",
    "description_label": "description"
}

export {
    finders_block_1_data,
    finders_block_key,
    finders_block_luggage,
    finders_block_wallet,
    finders_block_phone
}