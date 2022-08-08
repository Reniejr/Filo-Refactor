//? HP_TS = HomePage_TopSlider

//* STYLES
import globals from '@/styles/Main.module.scss';
//* ASSETS
import getImage from '@/assets/index.server';

const {
    Top_Slider_1,
    Top_Slider_2,
    Top_Slider_3,
    Top_Slider_1_Mobile,
    Top_Slider_2_Mobile,
    Top_Slider_3_Mobile
} = getImage("homepages")

const top_slider_data = {
    "slider_id": "homepage_top_slider",
    "slider_type": "no-number",
    "content_label": "Top Slider",
    "slides": [{
            "slide_id": "HP_TS_0",
            "bg": {
                "image": Top_Slider_1,
                "color": "#ECECEC"
            },
            "bg_mob": {
                "image": Top_Slider_1_Mobile,
                "color": "#ECECEC"
            },
            "cta": [{
                    "href": "/products/filo-tag",
                    "classes": `${globals["btn"]} ${globals["btn-primary"]}`,
                    "text_label": "buy-now"
                },
                {
                    "href": "/how-it-works",
                    "classes": `${globals["btn"]} ${globals["btn-secondary"]}`,
                    "text_label": "how-it-works"
                }
            ]
        },
        {
            "slide_id": "HP_TS_1",
            "bg": {
                "image": Top_Slider_2,
                "color": "#ECECEC"
            },
            "bg_mob": {
                "image": Top_Slider_2_Mobile,
                "color": "#ECECEC"
            },
            "cta": [{
                "href": "/how-it-works",
                "classes": `${globals["btn"]} ${globals["btn-primary"]}`,
                "text_label": "how-it-works"
            }]
        },
        {
            "slide_id": "HP_TS_2",
            "bg": {
                "image": Top_Slider_3,
                "color": "#ECECEC"
            },
            "bg_mob": {
                "image": Top_Slider_3_Mobile,
                "color": "#ECECEC"
            },
            "cta": [{
                "href": "/how-it-works",
                "classes": `${globals["btn"]} ${globals["btn-primary"]}`,
                "text_label": "how-it-works"
            }]
        }
    ]
}

export default top_slider_data