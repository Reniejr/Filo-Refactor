import React from 'react'

//* REDUX
import { useDispatch } from 'react-redux'
import { cartSlice } from '@/slices/cartSlice'

//* STYLES
import globals from '@/styles/Main.module.scss'

const AddToCartBtn = ({product}) => {

  const { addToCart } = cartSlice.actions
  const dispatch = useDispatch()

  return (
    <button 
      onClick={() => dispatch(addToCart(product))}
      className={`${globals["btn"]} ${globals["add-to-cart-btn"]}`}
    >
      Add to Cart
    </button>
  )
}

export default AddToCartBtn