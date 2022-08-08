import React from 'react'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* COMPONENTS
import Image from 'next/future/image'

//* ASSETS
import getImage from '@/assets/index.server';

//* STYLES
import globals from '@/styles/Main.module.scss';
import styles from '../styles/Mentions.module.scss';

const Mentions = () => {

  const { Press_Featured_On } = getImage("press")
  const t = useTranslations("homepage.Mentions")

  return (
    <section className={`${globals["container"]} ${styles["mentions-section"]}`}>
      <p>
        {t("featured_on")}
      </p>
      <Image 
        src={Press_Featured_On} 
        alt="homepage-press-featured_on" 
        width={900}
        height={100}
        />
    </section>
  )
}

export default Mentions