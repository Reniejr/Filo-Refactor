import React from 'react'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* DATA
import { colors_details } from '@/products/filo-tag'

//* ASSETS
import Image from 'next/future/image'

//* STYLES
import styles from '../styles/ProductSelectors.module.scss'

const ProductSelectors = ({state, handlers, styles_prop}) => {

    const ft_global = useTranslations('products.Filo_Tag')

    const { filo_tag } = state
    const { handleBundle, handleColor } = handlers
    const { s_bundle_selector, s_color_selector } = styles_prop

  return (
    <>
        <div className={styles["selectors-container"]}>
            <div 
                className={`${styles["1x-bundle"]} ${styles["bundle-selector"]} ${filo_tag.bundle === "1x" ? styles["active"] : styles["disabled"]} bundle-selector`}
                style={s_bundle_selector('1x')}
                onClick={() => handleBundle("1x")}
                >
                <div className={styles["main-details"]}>
                    <span className={styles["bundle"]}>1x Filo Tag</span>
                    <span className={styles["price"]}>24,90 €</span>
                </div>
            </div>
            <div 
                className={`${styles["4x-bundle"]} ${styles["bundle-selector"]} ${filo_tag.bundle === "4x" ? styles["active"] : styles["disabled"]} bundle-selector`}
                style={s_bundle_selector('4x')}
                onClick={() => handleBundle("4x")}
                >
                <div className={styles["main-details"]}>
                <span className={styles["bundle"]}>4x Filo Tag</span>
                    <span className={styles["price"]}>64,90 €</span>
                </div>
                <div className={styles["sub-details"]}>{ft_global("x4_label")}</div>
            </div>
        </div>
        <div className={styles["colors-selector-container"]}>
            {
                colors_details.map( color_i => {

                    return(
                        <Image 
                            key={color_i.id}
                            src={color_i.img.src}
                            alt={color_i.img.alt}
                            width={24}
                            height={24}
                            onClick={() => handleColor(color_i.color)}
                            style={s_color_selector(color_i.color)}
                            className={`color-selector`}
                        />
                    )
                })
            }
        </div>
    </>
  )
}

export default ProductSelectors