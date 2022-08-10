//? HIW_S = HomePage_TopSlider

//* STYLES
import globals from '@/styles/Main.module.scss';
//* ASSETS
import getImage from '@/assets/index.server';

const {
    HIW_Top_Slider_1,
    HIW_Top_Slider_2,
    HIW_Top_Slider_3,
    HIW_Top_Slider_Mob_1,
    HIW_Top_Slider_Mob_2,
    HIW_Top_Slider_Mob_3
} = getImage("hiw")

//? console.log(Top_Slider_1_Mobile)

const hiw_slider_data = {
    "slider_id": "hiw_slider",
    "slider_type": "no-number",
    "content_label": "Slider",
    "slides": [{
            "slide_id": "HIW_S_0",
            "bg": {
                "image": HIW_Top_Slider_1,
                "color": "#ECECEC"
            },
            "bg_mob": {
                "image": HIW_Top_Slider_Mob_1,
                "color": "#ECECEC"
            },
            "cta": [{
                "href": "/products/filo-tag",
                "classes": `${globals["btn"]} ${globals["btn-primary"]}`,
                "text_label": "buy-now"
            }]
        },
        {
            "slide_id": "HIW_S_1",
            "bg": {
                "image": HIW_Top_Slider_2,
                "color": "#ECECEC"
            },
            "bg_mob": {
                "image": HIW_Top_Slider_Mob_2,
                "color": "#ECECEC"
            },
            "cta": [{
                "href": "/products/filo-tag",
                "classes": `${globals["btn"]} ${globals["btn-primary"]}`,
                "text_label": "buy-now"
            }]
        },
        {
            "slide_id": "HIW_S_2",
            "bg": {
                "image": HIW_Top_Slider_3,
                "color": "#ECECEC"
            },
            "bg_mob": {
                "image": HIW_Top_Slider_Mob_3,
                "color": "#ECECEC"
            },
            "cta": [{
                "href": "/products/filo-tag",
                "classes": `${globals["btn"]} ${globals["btn-primary"]}`,
                "text_label": "buy-now"
            }]
        }
    ]
}

export default hiw_slider_data