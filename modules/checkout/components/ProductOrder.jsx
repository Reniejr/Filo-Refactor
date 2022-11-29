import React, { useState, useEffect } from 'react'

//* REDUX
import { useSelector } from 'react-redux';

//* ASSETS
import Image from 'next/future/image'

//* DATA
import { wc_details } from '@/products/filo-tag';

//* STYLES
import styles from '../styles/ProductOrder.module.scss'

const ProductOrder = ({product_order}) => {

    const { discount } = useSelector(state => state.checkout)
    
    const [ displayPrice, setDisplayPrice ] = useState({
        original_price: product_order.amount,
        discounted_price: 0
    })
    const foundProduct = wc_details.find(product => product.id === product_order.variation_id)

    useEffect(() => {
        
        if(discount && discount.discounted_items.length > 0) {

            const findProduct = discount.discounted_items.find( item => item.variation_id === product_order.variation_id)
            if(findProduct){
                const discounted_price = findProduct.price_item
                setDisplayPrice({
                    ...displayPrice,
                    discounted_price
                })
            }
        } else {
            setDisplayPrice({
                ...displayPrice,
                discounted_price: 0
            })
        }

    }, [discount])
    
    


  return (
    <>
        {
            foundProduct ? 
            <div className={styles["product-order"]}>
                <Image
                    src={foundProduct.img.src}
                    alt={foundProduct.img.alt}
                    width={48}
                    height={48}
                />
                <div className={styles["quantity"]}>
                    <p>
                        x{product_order.quantity}
                    </p>
                </div>
                <div className={styles["product-name"]}>
                    <h6>{foundProduct.name}</h6>
                    <div className={styles["variation"]}>
                        <p>{foundProduct.bundle} Filo Tag - {foundProduct.color}</p>
                    </div>
                </div>
                <div className={`${styles["subtotal"]}`}>
                    <h5 
                        className={`${displayPrice.discounted_price !== 0 ? styles["old-price"] : styles["original-price"]}`}
                        >{displayPrice.original_price / 100}0 €</h5>
                    {
                        displayPrice.discounted_price !== 0 ?
                        <h5
                            className={`${styles["discounted-amount"]}`}
                        >{displayPrice.discounted_price / 100}€ </h5> : null
                    }
                </div>
            </div> : null
        }
    </>
  )
}

export default ProductOrder