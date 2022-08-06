import React from 'react'

//* STYLES
import styles from '../styles/Slider.module.scss'

const Slider = () => {
  return (
    <section
        className={`${styles["slider"]} ${styles["slider-no-number"]}`}
        id={styles["top-homepage-slider"]}
    >
        Slider
    </section>
  )
}

export default Slider