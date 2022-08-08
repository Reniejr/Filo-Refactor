import React, { useState } from 'react'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* COMPONENTS
import { LinkCTA } from './CTA'
import Image from 'next/future/image'

//* STYLES
import styles from '../styles/Slider.module.scss'
import globals from '@/styles/Main.module.scss'

const Slider = ({slider_details, add_class_style}) => {

    //* DATA
    const { slider_id, slider_type, slides, content_label } = slider_details

    const t = useTranslations(`homepage.${content_label}`)

    //* STATE
    const [slider_info, setSliderInfo] = useState({
        slide_active: 0,
    })

    const { slide_active } = slider_info

    //* HANDLERS
    const handleForward = () => slide_active === slides.length - 1 ? 
        setSliderInfo({slide_active: 0}) :
        setSliderInfo({slide_active: slide_active + 1})

    const handleBack = () => slide_active === 0 ? 
        setSliderInfo({slide_active: slides.length - 1}) :
        setSliderInfo({slide_active: slide_active - 1})

    //* DYNAMIC STYLES
    const slide_container_style = {
        width: `calc( 100% * ${slides.length})`,
        marginLeft: `calc( -100% * ${slide_active})`
    }

    const dot_nav_style = (dot_index) => {
        return{
            backgroundColor: dot_index === slide_active ? "#FF3545" : "rgba(0, 0, 0, 0.75)"
        }
    }

  return (
    <section
        className={`${styles["slider"]} ${slider_type === "no-number" ? styles["slider-no-number"] : styles["slider-with-number"]} ${add_class_style ? add_class_style : ""}`}
        id={styles[slider_id]}
    >
        <div 
            className={styles["slide-container"]}
            style={slide_container_style}
            >
            {
                slides.map((slideInfo, i) => {

                    const { slide_id } = slideInfo
                    const props_Slide = {
                        ...slideInfo,
                        title: t(`title_${i}`),
                        description: t(`description_${i}`),
                    }

                    return(
                        <Slide 
                            slideInfo={props_Slide} 
                            key={`slide-${slide_id}`}
                            slide_n={slides.length}
                            />
                    )
                })
            }
        </div>
        <ion-icon 
            name="chevron-forward-outline"
            // className={styles["slider-nav"]}
            onClick={()=> handleForward()}
            ></ion-icon>
        <ion-icon 
            name="chevron-back-outline"
            // className={styles["slider-nav"]}
            onClick={()=> handleBack()}
            ></ion-icon>
        <div className={styles["slider-nav-dot-container"]}>
            {
                /* eslint-disable-next-line */
                slides.map( (slide, i) => {
                    return(
                        <span 
                            key={`${slider_id}-dot-nav-${i}`}
                            className={styles["slider-nav-dot"]}
                            style={dot_nav_style(i)}
                        ></span>
                    )
                })
            }
        </div>
    </section>
  )
}

const Slide = ({slideInfo, slide_n}) => {

    const t = useTranslations("general")

    const { 
            title, 
            description, 
            cta, 
            bg, 
            bg_mob 
    } = slideInfo

    const mob_size = typeof window !== 'undefined' ? window.innerWidth < 576 : false

    const slide_bg = mob_size ? bg_mob : bg

    //* DYNAMIC STYLES
    const slide_style = {
        width: `calc( 100% / ${slide_n})`,
        backgroundColor: slide_bg["color"],
        backgroundImage: mob_size ? "none" : 'url("' + slide_bg["image"] + '")'
    }

    return(
        <div 
            className={`${styles["slide"]}`}
            style={slide_style}
            >
            {
                mob_size ?
                <div className={styles["bg-mob"]}>
                    <Image 
                        src={bg_mob.image}
                        alt={`slide-${title}-bg-mob`}
                        width={576}
                        height={400}
                        />
                </div> : null
            }
            <div className={`${styles["slide-content"]} ${globals["container"]}`}>
                <h2 className={styles["slide-title"]}>
                    {title}
                </h2>
                <p className={`${styles["slide-description"]}`}>
                    {description}
                </p>
                <div className={styles["slide-cta-container"]}>
                    {
                        cta.length > 0 ?
                            cta.map((buttonInfo, i) => {
                                const { href, classes, text_label} = buttonInfo
                                return(
                                    <LinkCTA 
                                        key={`slide-${title}-cta-${text_label}-${i}`}
                                        href={ href }
                                        classes={classes}
                                        text_label={t(`${text_label}`)}
                                    />
                                )
                            }) :
                        null
                    }
                </div>
            </div>
        </div>
    )
}

export default Slider