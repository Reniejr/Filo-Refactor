import React from 'react'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* ASSETS
import getImage from '@/assets/index.server'

//* STYLES
import globals from '@/styles/Main.module.scss';
import styles from '../styles/FiloTagFeatures.module.scss';
import Image from 'next/future/image';

const FiloTagFeatures = () => {

  const t = useTranslations("general.Features")

  const { I_Keys, I_Filo_Sound, I_Position } = getImage('icons')

  const features = ["attach_it", "ring_it", "find_it"]

  return (
    <div 
      className={styles["filo-tag-features-container"]}
      >
       {
        features.map( (feature, i) => {

          let src

          switch(feature){
            case "attach_it": src = I_Keys;
            break;
            case "ring_it": src = I_Filo_Sound;
            break;
            case "find_it": src = I_Position;
            break;
            default:;
            break;
          }

          return(
            <div
              className={styles["filo-tag-feature"]}
              key={`filo-tag-feature-${feature}-${i}`}
            >
              <Image 
                src={src}
                alt={`ft-${feature}-img`}
                width={46}
                height={48}
              />
              <div className={styles["description"]}>
                <h4>{t(`${feature}`)}</h4>
                <p>{t(`${feature}_description`)}</p>
              </div>
            </div>
          )
        })
       } 
    </div>
  )
}

export default FiloTagFeatures