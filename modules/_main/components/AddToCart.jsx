import React from 'react'

//* GA4
import * as gtag from '@/config/gtag'

//* WOOCOMMERCE
import WCApi from '@/pages/api/WCApi'

//* ROUTER
import { useRouter } from 'next/router'

//* REDUX
import { useDispatch, useSelector } from 'react-redux'
import { checkout } from 'storage/checkout'

//* STYLES
import globals from '@/styles/Main.module.scss'

const AddToCartBtn = ({product}) => {

  const { addCartItem } = checkout.actions
  const { wc_order_data, selected_item } = useSelector(state => state.products)
  const selected = wc_order_data.find( wc_product => wc_product["variation_id"] === product.id)
  const dispatch = useDispatch()
  const router = useRouter()

  return (
    <button 
      onClick={async () => {
        let variation_id = 146
        if(selected_item) variation_id = selected_item.variation_id
          
        const variation = await WCApi.get(`products/19/variations/${variation_id}`)
        const main_product = await WCApi.get(`products/19`)
        if(variation.data && main_product.data && window !== undefined) {
            const item_ga4 = gtag.productToDLGA4(main_product.data, variation.data)
            gtag.dataLayerEvent({
                event: "add_to_cart",
                args: { 
                    currency: "EUR", 
                    value: parseFloat(variation.data.price), 
                    items: [item_ga4]
                }
            })
        }
        dispatch(addCartItem(selected))
        router.push('/cart')
      }}
      className={`${globals["btn"]} ${globals["add-to-cart-btn"]}`}
      id="add-to-cart"
    >
      Add to Cart
    </button>
  )
}

export default AddToCartBtn