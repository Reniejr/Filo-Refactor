import React, { useState } from 'react'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* REDUX
import { useSelector, useDispatch } from 'react-redux'
import { productsSlice } from '@/slices/productSlice'
import { cartSlice } from '@/slices/cartSlice'

//* ASSETS
import Image from 'next/future/image'

//* STYLES
import globals from '@/styles/Main.module.scss'
import styles from '../styles/ProductInCart.module.scss'

const ProductInCart = ({id}) => {

    const t = useTranslations('cart')

    const dispatch = useDispatch()
    const { products } = useSelector(state => state.products)
    const foundProduct = products.find(product => product.id === id)

    const { cart } = useSelector(state => state.cart)
    const { quantity } = cart.find(product => product.variation_id === id)
    const { addToCart, removeByOne, removeFromCart } = cartSlice.actions

    const price = foundProduct && foundProduct.price ?
        foundProduct.price : 0

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
                        {foundProduct.price}0 €
                    </div>
                    <div className={styles["quantity-box"]}>
                    <p className={`${styles["quantity-mob"]} ${styles["hr-mob"]}`}>{t("quantity")}</p>
                        <div className={styles["input-group"]}>
                            <button
                                className={`${styles["cart-btn"]} ${styles["input"]}`}
                                onClick={() => dispatch(removeByOne({id, price}))}
                            >
                                <ion-icon name="remove-circle-outline"></ion-icon>
                            </button>
                            <div className={styles["quantity"]}>{quantity}</div>
                            <button
                                className={`${styles["cart-btn"]} ${styles["input"]}`}
                                onClick={() => dispatch(addToCart({id, price}))}
                                >
                                <ion-icon name="add-circle-outline"></ion-icon>
                            </button>
                        </div>
                    </div>
                    <div className={styles["subtotal-box"]}>
                    <p className={`${styles["subtotal-mob"]} ${styles["hr-mob"]}`}>{t("subtotal")}</p>
                        { `${Math.round((quantity * price) * 100) / 100}0 €`}
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