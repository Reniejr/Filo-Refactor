import React from 'react'
import Image from 'next/future/image'

//* STYLES
import styles from '../styles/PersonalCard.module.scss'

const PersonCard = ({img, person, section}) => {

  const { src, alt } = img
  const { name, role } = person

  return (
    <div className={`${styles["person-card"]} ${section === "advisors" ? styles["advisor-card"] : ""}`}>
      <Image
        src={src}
        alt={alt}
        width={260}
        height={260}
      />
      <div className={styles["info-person"]}>
        <p>{name}</p>
        <h6>{role}</h6>
      </div>
    </div>
  )
}

export default PersonCard