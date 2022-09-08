import React from 'react'

//* ROUTER
import { useRouter } from 'next/router'

//* REDUX
import { useDispatch, useSelector } from 'react-redux'
import { cartSlice } from '@/slices/cartSlice'
// import { productsSlice } from '@/slices/productSlice'

//* STYLES
import globals from '@/styles/Main.module.scss'

const AddToCartBtn = ({product}) => {

  const { addToCart } = cartSlice.actions
  const { products } = useSelector(state => state.products)
  const price = products.length > 0 ? products.find(search => search.id === product.id).price : 0
  const dispatch = useDispatch()
  const router = useRouter()

  return (
    <button 
      onClick={() => {
        dispatch(addToCart({...product, price}))
        router.push('/cart')
      }}
      className={`${globals["btn"]} ${globals["add-to-cart-btn"]}`}
    >
      Add to Cart
    </button>
  )
}

export default AddToCartBtn