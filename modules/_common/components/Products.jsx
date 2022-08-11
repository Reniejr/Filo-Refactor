import React, {useState, useEffect} from 'react'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* COMPONENTS
import Image from 'next/future/image'
import { LinkCTA } from '@/common/components/CTA'

//* DATA
import { filo_tag_x1, filo_tag_x4 } from '@/products/filo-tag'

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

const ProductOverview2 = () => {

    const tProduct = useTranslations("products.Filo_Tag")

    const [{color, bundle}, setProduct] = useState({
        color: "red",
        bundle: "single"
    })

    useEffect(() => {
      
        if(bundle === "single" && color === "mix") setProduct({color: "red", bundle: "single"})

        /* eslint-disable-next-line */
    }, [bundle])
    

    return(
        <section className={`${styles["product-overview"]}`}>
            <div className={`${globals["container"]} ${styles["container"]} ${styles["container-ovr-2"]}`}>
                <div className={styles["overview-2"]}>
                    <h2>{tProduct("title")}</h2>
                    <p>{tProduct("short_description")}</p>
                    <FeaturesDropdown/>
                    <ProductSelection 
                        state={{color, bundle}}
                        setState={setProduct}
                    />
            </div>
            <FTShowCase color_state={color} bundle_state={bundle}/>
            </div>
        </section>
    )

}

const ProductSelection = ({state, setState}) => {

    const tProduct = useTranslations("products.Filo_Tag")

    const filo_tag_bundles = [ filo_tag_x1, filo_tag_x4]

    const {
        I_FT_Red,
        I_FT_Black,
        I_FT_Blue,
        I_FT_White,
        I_FT_Mix,
    } = getImage('icons')

    const colors = {
        "red": I_FT_Red,
        "black": I_FT_Black,
        "blue": I_FT_Blue,
        "white": I_FT_White,
        "mix": I_FT_Mix,
    }

    return(
        <section className={styles["product-selection"]}>
            <div className={styles["bundle-selection"]}>
                {
                    filo_tag_bundles.map( (bundleInfo) => {

                        return(
                            <div
                                key={`bundle-selector-${bundleInfo.bundle}`} 
                                className={`${styles["bundle"]} ${state.bundle === bundleInfo.bundle ? styles["selected"] : styles["no-selected"]}`}
                                onClick={() => setState({color: state.color, bundle: bundleInfo.bundle})}
                                >
                                <div className={styles["main-details"]}>
                                    <p>{bundleInfo.name}</p>
                                    <span>{bundleInfo.price}</span>
                                </div>
                                {
                                    bundleInfo.bundle === "x4" ?
                                    <p className={styles["sub-detail"]}>
                                        {tProduct("x4_label")}
                                    </p> : null
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles["color-selection"]}>
                {
                    state.bundle === "single" ? 
                    <div className={styles["colors-container"]}>
                        {
                            filo_tag_x1.variants.map( color => {
                                return(
                                    <div 
                                        key={`ft-single-${color}`}
                                        className={`${styles["color-box"]} ${state.color === color ? styles["selected"] : styles["no-selected"]}`}
                                        onClick={()=>setState({color: color, bundle: state.bundle})}
                                        >
                                            <Image 
                                                src={colors[color]}
                                                alt={`ft-color-${color}`}
                                                width={24}
                                                height={24}
                                            />
                                        </div>
                                )
                            } )
                        }
                    </div> :
                    <div className={styles["colors-container"]}>
                        {
                            filo_tag_x4.variants.map( color => {
                                return(
                                    <div 
                                        key={`ft-x4-${color}`}
                                        className={`${styles["color-box"]} ${state.color === color ? styles["selected"] : styles["no-selected"]}`}
                                        onClick={()=>setState({color: color, bundle: state.bundle})}
                                        >
                                            <Image 
                                                src={colors[color]}
                                                alt={`ft-color-${color}`}
                                                width={24}
                                                height={24}
                                            />
                                        </div>
                                )
                            } )
                        }
                    </div>
                }
            </div>
        </section>
    )
}

const FTShowCase = ({color_state, bundle_state}) => {
    
    const {
        FT_x4_Combo,
        FT_x4_Black,
        FT_x4_Blue,
        FT_x4_Red,
        FT_x4_White,
        FT_Black_Front,
        FT_Blue_Front,
        FT_Red_Front,
        FT_White_Front,
        PreviewGallery_Img_1,
        PreviewGallery_Img_2,
        PreviewGallery_Img_3,
        PreviewGallery_Img_4,
        PreviewGallery_Img_5
    } = getImage('products')

    const [ {preview}, setPreview ] = useState({
        preview: FT_Red_Front
    })

    useEffect(() => {
        if (color_state === 'red') {
            bundle_state === 'single' ? setPreview({preview: FT_Red_Front}) : setPreview({preview: FT_x4_Red})
        }
        if (color_state === 'black') {
            bundle_state === 'single' ? setPreview({preview: FT_Black_Front}) : setPreview({preview: FT_x4_Black})
        }
        if (color_state === 'blue') {
            bundle_state === 'single' ? setPreview({preview: FT_Blue_Front}) : setPreview({preview: FT_x4_Blue})
        }
        if (color_state === 'white') {
            bundle_state === 'single' ? setPreview({preview: FT_White_Front}) : setPreview({preview: FT_x4_White})
        }
        if (color_state === 'mix' && bundle_state === 'x4') setPreview({preview: FT_x4_Combo})
        // if (color_state === 'mix' && bundle_state === 'single') setPreview({preview: FT_Red_Front})

      /* eslint-disable-next-line */
    }, [color_state, bundle_state])
    
    const handlePreviewGallery = (src) => setPreview({preview: src})

    const gallery = [
        {src: PreviewGallery_Img_1, alt: "gallery-img-1"},
        {src: PreviewGallery_Img_2, alt: "gallery-img-2"},
        {src: PreviewGallery_Img_3, alt: "gallery-img-3"},
        {src: PreviewGallery_Img_4, alt: "gallery-img-4"},
        {src: PreviewGallery_Img_5, alt: "gallery-img-5"},
    ]

    return(
        <div className={styles["ft-showcase"]}>
            <div className={styles["preview-img"]}>
                <Image 
                    src={preview}
                    alt="preview-ft-image"
                    width={552}
                    height={564}
                />
            </div>
            <div className={styles["ft-gallery"]}>
                {
                    gallery.map( (imgInfo, i) => {
                        return(
                            <div 
                                key={`gallery-img-${i}`}
                                className={`${styles["gallery-img"]} ${preview === imgInfo.src ? styles["gallery-img-active"] : styles["gallery-img-inactive"]}`}
                                onClick={()=>handlePreviewGallery(imgInfo.src)}
                                >
                                <Image
                                    src={imgInfo.src}
                                    alt={imgInfo.alt}
                                    width={94}
                                    height={94}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const FeaturesDropdown = () => {

    const [{dropdown}, setDropdown] = useState({
        dropdown: false
    })

    const tProductSpec = useTranslations("products.Filo_Tag.specifications")

    const simple_spec_items = ["size", "range", "battery"]
    const features_spec = ["features_0","features_1","features_2","features_3"]
    
    return(
        <div className={styles["dropdown-specifications"]}>
            <h3
                onClick={() => setDropdown({dropdown: !dropdown})}
            > <ion-icon name={`chevron-${dropdown ? "down" : "forward"}-outline`}></ion-icon> {tProductSpec("main_label")}</h3>
            <div className={`${styles["spec-list"]} ${dropdown ? styles["dropdown-active"] : styles["dropdown-inactive"]}`}>
                <div className={styles["spec-item"]}>
                    <h4>{tProductSpec("features")}</h4>
                    <ul>
                        {
                            features_spec.map(feature =>{
                                return(
                                    <li key={`feat-item-${feature}`}>{tProductSpec(feature)}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                {
                    simple_spec_items.map( spec => {
                        return(
                            <div 
                                key={`spec-${spec}`}
                                className={styles["spec-item"]}
                                >
                                    <h4>{tProductSpec(spec)}</h4>
                                    <p>{tProductSpec(`${spec}_0`)}</p>
                                </div>
                        )
                    })
                }
                <div className={styles["spec-item"]}>
                    <h4>{tProductSpec("compatibility")}</h4>
                    <p>
                        {tProductSpec("compatibility_0")} 
                    </p>
                    <LinkCTA 
                        href="/devices"
                        classes={`${globals["link"]} ${globals["link-primary"]}`}
                        text_label={tProductSpec("compatibility_1")}
                    />
                </div>
            </div>
        </div>
    )
}

export {
    ProductOverview1,
    ProductOverview2,
    FTShowCase,
    ProductSelection,
    FeaturesDropdown
}