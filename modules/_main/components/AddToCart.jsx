import React from 'react'

//* GA4
import { dataLayerEvent, event } from '@/config/gtag'

//* ROUTER
import { useRouter } from 'next/router'

//* REDUX
import { useDispatch, useSelector } from 'react-redux'
import { checkout } from 'storage/checkout'

//* STYLES
import globals from '@/styles/Main.module.scss'

const AddToCartBtn = ({product}) => {

  const { addCartItem } = checkout.actions
  const { wc_order_data } = useSelector(state => state.products)
  const selected = wc_order_data.find( wc_product => wc_product["variation_id"] === product.id)
  const dispatch = useDispatch()
  const router = useRouter()

  return (
    <button 
      onClick={() => {
        event({
          action: 'add_to_cart',
          category: "ecommerce",
          label: "item_added",
          value: {...selected}
        })
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