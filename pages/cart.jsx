//* TRANSLATION
import { useTranslations } from 'next-intl'

//* REDUX
import { useSelector } from 'react-redux'

//* ROUTER
import { useRouter } from 'next/router'

//* COMPONENTS
import CustomHead from '@/main/components/CustomHead';
import ProductInCart from '../modules/cart/components/ProductInCart';
import Invoice from '../modules/cart/components/Invoice';

//* STYLES
import globals from '@/styles/Main.module.scss';
import styles from '../modules/cart/styles/Cart.module.scss';
import { LinkCTA } from '@/common/components/CTA';


const Cart = () => {

    const t = useTranslations('cart')
    const {cart, total} = useSelector( state => state.cart)
    const router = useRouter()

  return (
    <>
        <CustomHead page="cart"/>
        <div 
        className={globals["page"]}
        id={styles["cart"]}
        >
            <div className={`${globals["container"]} ${styles["container"]}`}>
                <h1>{t('cart')}</h1>
                {
                    cart.length > 0 ?
                    <>
                    
                        <div className={styles["cart-table"]}>
                            <div className={styles["cart-header"]}>
                                <div className={styles["img-header"]}>{t("product")}</div>
                                <div className={styles["name-header"]}></div>
                                <div className={styles["price-header"]}>{t("price")}</div>
                                <div className={styles["quantity-header"]}>{t("quantity")}</div>
                                <div className={styles["subtotal-header"]}>{t("subtotal")}</div>
                                <div className={styles["remove-header"]}></div>
                            </div>
                            {
                                cart.map( product => {
                                    return(
                                        <ProductInCart 
                                            key={product.variation_id}
                                            id={product.variation_id}
                                        />
                                    )
                                })
                            }
                        </div>
                        <div className={styles["checkout-row"]}>
                            <button
                                className={`${globals["btn"]} ${globals["btn-primary"]}`}
                                onClick={() => router.push('/checkout')}
                            >
                                {t("checkout")}
                            </button>
                            <div className={styles["total-box"]}>
                                <h2>{t("total")}</h2>
                                <p className={styles["total"]}>{ total === 0 ? "0.00 €" : `${total}0 €`}</p>
                            </div>
                        </div>
                        <Invoice/>
                    </> : <div className={styles["cart-empty"]}>{t.rich("cart_empty", {
                        a: (children) => <LinkCTA text_label={children} className={`${globals["link"]} ${globals['link-primary']}`} href="/products/filo-tag" />
                    })}</div>
                }
            </div>
        </div>    
    </>
  )
}

export async function getStaticProps({locale}) {

    const messages = {
      header: (await import(`../translations/header/${locale}.json`)).default,
      footer:  (await import(`../translations/footer/${locale}.json`)).default,
      general: (await import(`../translations/common/${locale}.json`)).default,
      cart: (await import(`../translations/cart/${locale}.json`)).default,
      products: (await import(`../translations/products/${locale}.json`)).default,
    }
  
    return {
      props: {
        messages
      }
    };
}  

export default Cart