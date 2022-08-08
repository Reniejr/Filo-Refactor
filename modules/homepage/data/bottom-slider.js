//? HP_BS = HomePage_TopSlider

//* STYLES
import globals from '@/styles/Main.module.scss';
//* ASSETS
import getImage from '@/assets/index.server';

const {
    Bottom_Slider_1,
    Bottom_Slider_2,
    Bottom_Slider_3,
    Bottom_Slider_4,
} = getImage("homepages")

//? console.log(Bottom_Slider_1)

const bottom_slider_data = {
    "slider_id": "homepage_bottom_slider",
    "slider_type": "with-number",
    "content_label": "Bottom_Slider",
    "slides": [{
            "slide_id": "HP_BS_0",
            "bg": {
                "image": Bottom_Slider_1,
                "color": "#ECECEC"
            },
            "bg_mob": {
                "image": Bottom_Slider_1,
                "color": "#ECECEC"
            },
            "cta": [{
                "href": "/how-it-works",
                "classes": `${globals["btn"]} ${globals["btn-secondary"]}`,
                "text_label": "learn-more"
            }]
        },
        {
            "slide_id": "HP_BS_1",
            "bg": {
                "image": Bottom_Slider_2,
                "color": "#ECECEC"
            },
            "bg_mob": {
                "image": Bottom_Slider_2,
                "color": "#ECECEC"
            },
            "cta": [{
                "href": "/how-it-works",
                "classes": `${globals["btn"]} ${globals["btn-secondary"]}`,
                "text_label": "learn-more"
            }]
        },
        {
            "slide_id": "HP_BS_2",
            "bg": {
                "image": Bottom_Slider_3,
                "color": "#ECECEC"
            },
            "bg_mob": {
                "image": Bottom_Slider_3,
                "color": "#ECECEC"
            },
            "cta": [{
                "href": "/how-it-works",
                "classes": `${globals["btn"]} ${globals["btn-secondary"]}`,
                "text_label": "learn-more"
            }]
        },
        {
            "slide_id": "HP_BS_3",
            "bg": {
                "image": Bottom_Slider_4,
                "color": "#ECECEC"
            },
            "bg_mob": {
                "image": Bottom_Slider_4,
                "color": "#ECECEC"
            },
            "cta": [{
                "href": "/how-it-works",
                "classes": `${globals["btn"]} ${globals["btn-secondary"]}`,
                "text_label": "learn-more"
            }]
        }
    ]
}

export default bottom_slider_data