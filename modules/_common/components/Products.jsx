import React from 'react'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* COMPONENTS
import Image from 'next/future/image'
import { LinkCTA } from '@/common/components/CTA'

//* ASSETS
import getImage from '@/assets/index.server'

//* STYLES
import globals from '@/styles/Main.module.scss'
import styles from '../styles/Products.module.scss'

const ProductOverview1 = () => {

    const t = useTranslations("general.Overview1")
    const tGlobal = useTranslations("general")

    const {
        I_Size, 
        I_Volume, 
        I_Battery,
        I_FT_Black,
        I_FT_Red,
        I_FT_Blue,
        I_FT_White,
        I_FT_Mix
    } = getImage('icons')
    const { FT_x4_Combo } = getImage('products')
    const specifications = ["size", "sound", "battery"]
    const colors = [ I_FT_Black, I_FT_Red, I_FT_Blue, I_FT_White, I_FT_Mix ]

  return (
    <section
        className={`${styles["product-overview"]}`}
    >
        <div className={`${globals["container"]} ${styles["container"]}`}>

            <div className={styles["overview-1"]}>
                <div className={styles["overall-description"]}>
                    <h2>{tGlobal("filo-tag")}</h2>
                    <p>{t("short_description")}</p>
                </div>
                <div className={styles["product-specifications"]}>
                    {
                        specifications.map( spec => {

                            let src

                            switch(spec){
                                case "size": src = I_Size;
                                break;
                                case "sound": src = I_Volume;
                                break;
                                case "battery": src = I_Battery;
                                break;
                                default:;
                                break;
                            }

                            return(
                                <div
                                    key={`product-specification-${spec}`} 
                                    className={styles["specification"]}
                                    >
                                    <div className={styles["img-box"]}>
                                        <Image
                                            src={src}
                                            alt={`product-spec-${spec}`}
                                            width={24}
                                            height={24}
                                        />
                                    </div>
                                    <div className={styles["description"]}>
                                        {t(`${spec}`)}
                                        {spec === "size" ? "\n26x42x6mm" : ""}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={styles["ft-colors"]}>
                    {
                        colors.map( (color, i) => {
                            return(
                                <div
                                    key={`product-ft-color-${i}`} 
                                    className={styles["color-box"]}
                                    >
                                    <Image 
                                        src={color}
                                        alt="color-icon"
                                        width={24}
                                        height={24}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <div className={styles["cta-container"]}>
                    <LinkCTA
                        href="/product/filo-tag"
                        classes={`${globals["btn"]} ${globals["btn-primary"]}`}
                        text_label={tGlobal("buy-now")}
                    />
                    <LinkCTA
                        href="/how-it-works"
                        classes={`${globals["btn"]} ${globals["btn-secondary"]}`}
                        text_label={tGlobal("learn-more")}
                    />
                </div>
            </div>
            <div className={styles["product-img-box"]}>
                <Image 
                    src={FT_x4_Combo}
                    alt="product-ft-color-mix"
                    width={620}
                    height={430}
                />
            </div>
        </div>
     
    </section>
  )
}

export {
    ProductOverview1
}