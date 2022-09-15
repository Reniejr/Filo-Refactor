import React from 'react'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* REDUX
import { useSelector } from 'react-redux'

//* COMPONENTS
import ProductOrder from './ProductOrder'

//* STYLES
import styles from '../styles/Checkout.module.scss';

const ProductList = () => {

    const t = useTranslations('checkout')

    const { cart } = useSelector( state => state.cart)

  return (
    <>
        <h2>{t("your_order")}</h2>
        <div className={styles["products-list"]}>
            {
                cart.map( prod => {

                    return(
                        <ProductOrder
                            key={`product-order-${prod.variation_id}`}
                            product_order={prod}
                        />
                    )
                })
            }
        </div>
    </>
  )
}

export default ProductList