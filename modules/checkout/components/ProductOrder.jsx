import React from 'react'

//* REDUX
import { useSelector } from 'react-redux';

//* ASSETS
import Image from 'next/future/image'

//* STYLES
import globals from '@/styles/Main.module.scss';
import styles from '../styles/ProductOrder.module.scss'

const ProductOrder = ({product_order}) => {

    const { products } = useSelector(state => state.products)
    const foundProduct = products.find(product => product.id === product_order.variation_id)

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
                <div className={styles["subtotal"]}>
                    <h5>{Math.round((foundProduct.price * product_order.quantity) * 100) / 100}0 €</h5>
                </div>
            </div> : null
        }
    </>
  )
}

export default ProductOrder