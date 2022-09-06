import React, { useState } from 'react'

//* DATA
import { gallery_details } from '@/products/filo-tag'

//* ASSETS
import Image from 'next/future/image'

//* STYLES
import styles from '../styles/ProductGallery.module.scss'

const ProductGallery = ({state, handlers}) => {

    const { main_img } = state

    const {handleMainImg} = handlers

    const [ gallery_img_active, setGalleryImageActive ] = useState({
        active: ""
    })

  return (
    <div className={styles["filo-tag-gallery"]}>
            <div className={styles["main-img"]}>
                <Image 
                    src={main_img.src}
                    alt={main_img.alt}
                    width={512}
                    height={512}
                />
            </div>
            <div className={styles["gallery-imgs"]}>
                {
                    gallery_details.map( g_img => {

                        return(
                            <div
                                key={g_img.id} 
                                className={`${styles["gallery-img-box"]} ${gallery_img_active.active === g_img.id ? styles["active"] : styles["disabled"]}`}
                                onClick={()=> {
                                    handleMainImg(g_img.img)
                                    setGalleryImageActive({active : g_img.id})
                                }}
                                >
                                <Image 
                                    src={g_img.img.src}
                                    alt={g_img.img.alt}
                                    width={92.55}
                                    height={92.55}
                                />
                            </div>
                        )
                    })
                }
            </div>    
        </div>
  )
}

export default ProductGallery