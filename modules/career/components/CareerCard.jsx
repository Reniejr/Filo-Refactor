import Image from 'next/future/image'
import React from 'react'

//* STYLES
import styles from '../styles/CareerCard.module.scss'

const CareerCard = ({img, content}) => {

    const { src , alt } = img
    const { title, description } = content

  return (
    <div className={styles["career-card"]}>
        <Image
            src={src}
            alt={alt}
            width={245}
            height={163}
        />
        <h4>{title}</h4>
        <p>{description}</p>
    </div>
  )
}

export default CareerCard