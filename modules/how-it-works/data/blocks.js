//* ASSETS
import getImage from '@/assets/index.server'

const {
    HIW_Img_1,
    HIW_Img_2,
    HIW_Img_3,
    HIW_Img_4,
    HIW_Img_5,
    HIW_Img_6
} = getImage("hiw")

const hiw_blocks_data = [{
        "id": "hiw-block-0",
        "img": HIW_Img_1,
        "direction": "normal"
    },
    {
        "id": "hiw-block-1",
        "img": HIW_Img_2,
        "direction": "reverse"
    },
    {
        "id": "hiw-block-2",
        "img": HIW_Img_3,
        "direction": "normal"
    },
    {
        "id": "hiw-block-3",
        "img": HIW_Img_4,
        "direction": "reverse"
    },
    {
        "id": "hiw-block-4",
        "img": HIW_Img_5,
        "direction": "normal"
    },
    {
        "id": "hiw-block-5",
        "img": HIW_Img_6,
        "direction": "reverse"
    }
];

export default hiw_blocks_data