import React, { useState, useEffect } from 'react'

//* GA4
import { dataLayerEvent } from '@/config/gtag'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* REDUX
import { useSelector, useDispatch } from 'react-redux'
import { products } from 'storage/products'

//* DATA
import { wc_details } from '@/products/filo-tag'

//* COMPONENTS
import AddToCartBtn from '@/main/components/AddToCart'
import ProductSelectors from './ProductSelectors'
import ProductGallery from './ProductGallery'
import FeaturesDropdown from './FeaturesDropdown'

//* STYLES
import globals from '@/styles/Main.module.scss'
import styles from '../styles/FiloTagProduct.module.scss'

const FTProductBuy = ({direction, isFeatures}) => {

    const { original_data, selected_item } = useSelector(state => state.products)
    const dispatch = useDispatch()
    const { selectItem } = products.actions

    //* HANDLERS
    const handleFTImg = (id) => wc_details.find( product => product.id === id).img

    const handleMainImg = (img) => setMainImage(img)
    
    //*STATE
    const [filo_tag, setFiloTag ] = useState({
        "bundle": "1x",
        "color": "red",
        "id": 146
    })

    const [ main_img, setMainImage ] = useState({
        src: handleFTImg(filo_tag.id).src,
        alt: handleFTImg(filo_tag.id).alt 
    })

    //* TRANSLATION
    const ft_global = useTranslations("products.Filo_Tag")

    //* DYNAMIC STYLE
    const s_bundle_selector = (bundle) => {
        return bundle === "1x" ? {
            borderBottom: filo_tag.bundle === "1x" ? "3px solid #000" : "2px solid #000"
        } : {
            borderTop: filo_tag.bundle === "4x" ? "3px solid #000" : "2px solid #000"
        }
    }

    const s_color_selector = (color) => {
        return{
            border: color === filo_tag.color ? "2px solid #000" : "2px solid transparent",
        }
    }

    //* HANDLERS STATE

    const handleSelection = (selection_type, selection_value) => {

        const new_filo_tag = {...filo_tag}

        if (selection_type === 'bundle') {
            if (new_filo_tag.color === 'mix' && selection_value === "1x") new_filo_tag.color = "red"
        }
        if (selection_type === 'color') {
            if (selection_value === 'mix') new_filo_tag.bundle = '4x'
        }
        new_filo_tag[selection_type] = selection_value

        const selected = wc_details.find( product => product.bundle === new_filo_tag.bundle && product.color === new_filo_tag.color)
        new_filo_tag.id = selected.id
        dispatch(selectItem({product_id: 19, variation_id: selected.id}))
        dataLayerEvent({event: 'select_variant', args: selectItem})
        setFiloTag(new_filo_tag)
        setMainImage(selected.img)

    }

    //* PROPS TO PASS
    const ft_handlers = {
        handleBundle: (bundle) => handleSelection('bundle', bundle),
        handleColor: (color) => handleSelection('color', color)
    }

  return (
    <div className={`${globals["container"]} ${styles["container"]} ${direction === "normal" ? styles["normal"] : styles["reversed"]}`}>
        <ProductGallery 
            state={{main_img}}
            handlers={{handleMainImg}}
        />
        <div className={styles["description"]}>
            <h1>{ft_global('title')}</h1>
            <p className={styles["short-description"]}>
            {ft_global('short_description')}
            </p>
            {
                isFeatures ? <FeaturesDropdown/> : null
            }
            <ProductSelectors 
                state={{filo_tag}}
                handlers={ft_handlers}
                styles_prop={{s_bundle_selector, s_color_selector}}
            />
            <AddToCartBtn product={filo_tag}/>
            </div>             
    </div>
  )
}

export default FTProductBuy