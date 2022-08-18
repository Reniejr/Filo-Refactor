import { useState } from 'react'

//* ASSETS
import Image from 'next/future/image';

//* DATA
import press_logos from '../data/press_slideshow'

//* STYLES
import styles from '../styles/PressSlideShow.module.scss';

const PressSlideShow = () => {

    const [ {actual_slide}, setActual ] = useState({
        actual_slide: 1
    })

    const handleForward = () => actual_slide === press_logos.slice(0, 5).length ? setActual({actual_slide: 1}) : setActual({actual_slide: actual_slide + 1})
    const handleBack = () => actual_slide === 1 ? setActual({actual_slide: press_logos.slice(0, 5).length}) : setActual({actual_slide: actual_slide - 1})

    //* DYNAMIC STYLES
    const slide_container_style = {
        width: `calc( 100% * ${press_logos.length})`,
        marginLeft: `calc( -100% * ${actual_slide} + 50%)`
    }
    const slide_style = {
        width: `calc( 100% / ${press_logos.length})`
    }

  return (
    <section className={styles["press-slideshow"]}>
        <div 
            className={styles["slide-container"]}
            style={slide_container_style}
            >
            {
                press_logos.map( press => {
                    
                    const { img, id } = press
                    
                    return(
                        <div
                            key={id} 
                            className={styles["press-slide"]}
                            style={slide_style}
                            >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                width={200}
                                height={100}
                            />
                        </div>
                    )
                })
            }
        </div>
        <div className={styles["nav-slideshow"]}>
            {
                press_logos.slice(0, 5).map( (press, i) => {
                    return(
                        <div
                            key={`nav-dot-${press.id}`} 
                            className={`${styles["nav-dot"]} ${actual_slide === i + 1 ? styles["active"] : styles["inactive"]}`}></div>
                    )
                })
            }
        </div>
        <ion-icon 
            name="chevron-forward-outline"
            onClick={()=> handleForward()}
            ></ion-icon>
        <ion-icon 
            name="chevron-back-outline"
            onClick={()=> handleBack()}
            ></ion-icon>
    </section>
  )
}

export default PressSlideShow