import React from 'react'

//* COMPONENTS
import { LinkCTA } from '@/common/components/CTA'

//* STYLES
import globals from '@/styles/Main.module.scss'
import styles from '../styles/ContactCard.module.scss'

const ContactCard = ({icon, t, link}) => {
  return (
    <div className={styles["contact-card"]}>
        {icon}
        <h4>{t("label")}</h4>
        <p>{t("description")}</p>
        <LinkCTA 
            text_label={t('button')}
            classes={`${globals["btn"]} ${globals["btn-secondary"]}`}
            href={link}
        />
    </div>
  )
}

export default ContactCard