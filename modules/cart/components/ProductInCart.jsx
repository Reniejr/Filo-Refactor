import React, { useState } from 'react'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* REDUX
import { useSelector, useDispatch } from 'react-redux'
import { checkout } from 'storage/checkout'

//* DATA
import { wc_details } from '@/products/filo-tag'

//* ASSETS
import Image from 'next/future/image'

//* STYLES
import globals from '@/styles/Main.module.scss'
import styles from '../styles/ProductInCart.module.scss'

const ProductInCart = ({id}) => {

    const t = useTranslations('cart')

    const dispatch = useDispatch()
    const { line_items } = useSelector(state => state.checkout)
    const foundProduct = wc_details.find(product => product.id === id)
    const {amount, quantity} = line_items.find(item => item.variation_id === id)

    const { addCartItem, removeByOne, removeFromCart } = checkout.actions

    const price = foundProduct && foundProduct.price ?
        foundProduct.price : 0
    
    console.log(foundProduct)

  return (
    <>
        {
            foundProduct ?
                <div className={styles["product-in-cart"]}>
                    <div className={styles["img-box"]}>
                        <Image 
                            src={foundProduct.img.src}
                            alt={foundProduct.img.alt}
                            width={80}
                            height={80}
                        />
                    </div>
                    <div className={styles["name-box"]}>
                    <p className={`${styles["name-mob"]} ${styles["hr-mob"]}`}>{t("product")}</p>
                        <h4 className={styles["product-name"]}>
                            {foundProduct.name}
                            <button
                            className={`${styles["cart-btn"]} ${styles["remove"]}`} 
                            onClick={() => dispatch(removeFromCart({id, price}))}
                            >
                            <ion-icon name="close-circle-outline"></ion-icon>
                        </button>
                        </h4>
                        <p className={styles["variation"]}>
                            {foundProduct.bundle} Filo Tag, {foundProduct.color}
                        </p>
                    </div>
                    <div className={styles["price-box"]}>
                        <p className={`${styles["price-mob"]} ${styles["hr-mob"]}`}>{t("price")}</p>
                        {parseFloat(amount / 100)}0 €
                    </div>
                    <div className={styles["quantity-box"]}>
                    <p className={`${styles["quantity-mob"]} ${styles["hr-mob"]}`}>{t("quantity")}</p>
                        <div className={styles["input-group"]}>
                            <button
                                className={`${styles["cart-btn"]} ${styles["input"]}`}
                                onClick={() => dispatch(removeByOne({variation_id: id, amount}))}
                            >
                                <ion-icon name="remove-circle-outline"></ion-icon>
                            </button>
                            <div className={styles["quantity"]}>{quantity}</div>
                            <button
                                className={`${styles["cart-btn"]} ${styles["input"]}`}
                                onClick={() => dispatch(addCartItem({variation_id: id, amount}))}
                                >
                                <ion-icon name="add-circle-outline"></ion-icon>
                            </button>
                        </div>
                    </div>
                    <div className={styles["subtotal-box"]}>
                    <p className={`${styles["subtotal-mob"]} ${styles["hr-mob"]}`}>{t("subtotal")}</p>
                        { `${quantity * amount / 100}0 €`}
                    </div>
                    <div className={styles["remove-box"]}>
                        <button
                            className={`${styles["cart-btn"]} ${styles["remove"]}`} 
                            onClick={() => dispatch(removeFromCart({id, price}))}
                            >
                            <ion-icon name="close-circle-outline"></ion-icon>
                        </button>
                    </div>
                </div> : null

        }
    </>
  )
}

export default ProductInCart