import React from 'react'

//* ASSETS
import Image from 'next/future/image'

//* STYLES
import styles from '../styles/PressBlock.module.scss'

const PressBlock = ({children, img, direction}) => {

    const { src, alt } = img

  return (
    <section className={`${styles["press-block"]} ${direction === "reverse" ? styles["reverse"] : styles["normal"]}`}>
        <div className={styles["content-txt"]}>
            {children}
        </div>
        <div className={styles["content-img"]}>
            <Image
                src={src}
                alt={alt}
                width={614}
                height={378}
            />
        </div>
    </section>
  )
}

export default PressBlock