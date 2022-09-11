import { useState } from 'react'
//* TRANSLATION
import { useTranslations } from 'next-intl'

//* REDUX
import { useSelector, useDispatch } from 'react-redux'
import { stripeSlice } from '@/slices/stripeSlice'

//* ROUTER
import { useRouter } from 'next/router'

//* COMPONENTS
import CustomHead from '@/main/components/CustomHead';
import ProductInCart from '../modules/cart/components/ProductInCart';
import Invoice from '../modules/cart/components/Invoice';
import { LinkCTA } from '@/common/components/CTA';
import ProductOrder from '../modules/checkout/components/ProductOrder';
import Coupon from '../modules/checkout/components/Coupon';
import Form from '../modules/checkout/components/Form';
import PaymentBox from 'modules/checkout/components/PaymentBox';

//* STYLES
import globals from '@/styles/Main.module.scss';
import styles from '../modules/checkout/styles/Checkout.module.scss';


const Checkout = () => {

    const t = useTranslations('checkout')
    const t_billing = useTranslations("checkout.Billing_Info")
    const t_shipping = useTranslations("checkout.Shipping_Info")
    const {cart, total} = useSelector( state => state.cart)
    const { products } = useSelector( state => state.products)

    const [ isSubmit, setIsSubmit ] = useState(false)
    const [ isShipping, setIsShipping ] = useState(false)

    const dispatch = useDispatch()
    const { setTry } = stripeSlice.actions

  return (
    <>
        <CustomHead page="checkout"/>
        <div 
        className={globals["page"]}
        id={styles["checkout"]}
        >
            <div className={`${globals["container"]} ${styles["user-container"]}`}>
              <Form bill_or_ship="billing" isSubmit={isSubmit}/>
              
              <div className={styles["is-shipping"]}>
                <p>{t_shipping("is_shipping")}</p>
                <input 
                  type="checkbox" 
                  id="is-shipping" 
                  onChange={()=> setIsShipping(!isShipping)}
                  checked={isShipping ? true : false}
                  />
              </div>

              {
                isShipping ?
                  <Form bill_or_ship="shipping" isSubmit={isSubmit}/> : null
              }

              <div className={styles["notes"]}>
                <label htmlFor="notes">{t("notes.order_notes")}</label>
                <textarea id="notes" cols="30" rows="5" placeholder={t("notes.placeholder")}></textarea>
              </div>
            </div>
            <div className={`${styles["order-container"]}`}>
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
                <div className={styles["cost-details"]}>
                    <div className={styles["subtotal"]}>
                      <h3>{t("subtotal")}</h3>
                      <p>{total}0 €</p>
                    </div>
                    <div className={styles["shipping-method"]}>
                      <h3>{t("shipping")}</h3>
                      <div className={styles["shipping"]}>
                        <p className={styles["method"]}></p>
                        <p className={styles["shipping-cost"]}></p>
                      </div>
                    </div>
                </div>
                <div className={styles["total-box"]}>
                  <h3>{t("total")}</h3>
                  <p>{ total }0 €</p>
                </div>
                <Coupon/>
                <PaymentBox/>
                <p className={styles["privacy"]}>
                  {t.rich("privacy_policy", {
                    a: (children) => <LinkCTA href="/privacy-policy" classes={`${globals["link"]} ${styles["mini-txt"]}`} text_label={children} />
                  })}
                </p>
                <div className={styles["terms-conditions-container"]}>
                  <div className={styles["input-group"]}>
                    <input 
                      type="checkbox" 
                      id="terms" 
                      required
                      />
                    <label htmlFor="terms" className={styles["terms-label"]}>
                      {t.rich("terms-and-conditions", {
                        a: (children) => <LinkCTA href="/terms-and-conditions" classes={`${globals["link"]} ${styles["mini-txt"]}`} text_label={children} />
                      })}
                    </label>
                  </div>
                </div>
                <button
                  className={`${globals["btn"]} ${globals["btn-primary"]} ${styles["order-btn"]}`}
                  onClick={() => dispatch(setTry())}
                >
                  {t("place_order")}
                </button>
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
      checkout: (await import(`../translations/checkout/${locale}.json`)).default,
      products: (await import(`../translations/products/${locale}.json`)).default,
    }
  
    return {
      props: {
        messages
      }
    };
}  

export default Checkout