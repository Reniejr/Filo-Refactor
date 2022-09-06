import React from 'react'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* COMPONENTS
import { LinkCTA } from '@/common/components/CTA'
import FiloTagFeatures from '@/common/components/FiloTagFeatures'
import DownloadApp from '@/common/components/DownloadApp'

//* ASSETS
import getImage from '@/assets/index.server'
import Image from 'next/future/image'

//* UTILITIES
import { mob_size } from '../../../utilities'

//* STYLES
import globals from '@/styles/Main.module.scss'
import styles from '../styles/PPFeatures.module.scss'

const PPFeatures = () => {

    const t_product = useTranslations('products.Product_Page')

    const {
        I_Filo_Sound,
        I_Battery_2
    } = getImage('icons')
    
    const {
        ProductPage_FT_Img_1,
        ProductPage_FT_Img_2
    } = getImage('product_page')

  return (
    <>
        <section className={styles["features-section"]}>
            <div className={`${globals["container"]} ${styles["container"]}`}>
                <div className={styles["list-spec"]}>
                    <div className={styles["icon-spec"]}>
                        <div className={styles["spec-title"]}>
                            <Image
                                src={I_Filo_Sound}
                                alt="filo-sound-icon"
                                width={48}
                                height={48}
                            />
                            <h4>{t_product("sound")}</h4>
                        </div>
                        <p>{t_product("sound_0")}</p>
                    </div>
                    <div className={styles["icon-spec"]}>
                        <div className={styles["spec-title"]}>
                            <Image
                                src={I_Battery_2}
                                alt="battery-2-icon"
                                width={48}
                                height={48}
                            />
                            <h4>{t_product("battery")}</h4>
                        </div>
                        <p>{t_product("battery_0")}</p>
                    </div>
                    <div className={styles["no-icon-spec"]}>
                        <h4>{t_product("connection")}:</h4>
                        <span>{t_product("connection_0")}</span>
                    </div>
                    <div className={styles["no-icon-spec"]}>
                        <h4>{t_product("battery_type")}:</h4>
                        <span>{t_product("battery_type_0")}</span>
                    </div>
                    <div className={styles["no-icon-spec"]}>
                        <h4>{t_product("size")}:</h4>
                        <span>{t_product("size_0")}</span>
                    </div>
                    <div className={styles["compatibility"]}>
                        <h4>{t_product("compatibility")}</h4>
                        <p>
                            {t_product("compatibility_0")}<br/>
                            {t_product.rich("compatibility_1",{
                                a: (children) => <LinkCTA
                                    classes={`${globals["link"]} ${globals["link-primary"]}`}
                                    href="/devices"
                                    text_label={children}
                                />
                            })}
                        </p>
                    </div>
                </div>
                {
                    mob_size ? 
                    <Image 
                        src={ProductPage_FT_Img_1}
                        alt="product-page-ft-img-1"
                        width={512}
                        height={512}
                        className={styles["banner-img"]}
                    /> : null
                }
            </div>
        </section>
        <div className={styles["break-section"]}></div>
        <section className={`${styles["features-section"]} ${styles["reversed"]}`}>
            <div className={`${globals["container"]} ${styles["container"]}`}>
                <div className={styles["col-end"]}>
                    <FiloTagFeatures/>
                    <DownloadApp/>
                </div>
                {
                    mob_size ?
                    <Image 
                        src={ProductPage_FT_Img_2}
                        alt="product-page-ft-img-2"
                        width={512}
                        height={512}
                        className={styles["banner-img"]}
                    /> : null
                }
            </div>
        </section>
    </>
  )
}

export default PPFeatures