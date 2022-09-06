import {
    createSlice
} from '@reduxjs/toolkit'
import {
    HYDRATE
} from 'next-redux-wrapper'
import {
    editArrayItem
} from '../utilities'

const initialState = {
    cart: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const {
                id
            } = action.payload
            let new_cart = [...state.cart]

            const isAlreadyAdded = new_cart.filter(item => item.product_id === id)
            const isAlreadyAddedIndex = new_cart.findIndex(item => item.product_id === id)

            if (isAlreadyAdded.length > 0) {
                new_cart = editArrayItem(new_cart, isAlreadyAddedIndex, {
                    ...isAlreadyAdded[0],
                    quantity: isAlreadyAdded[0].quantity + 1
                })
            } else {
                new_cart = new_cart.concat({
                    product_id: id,
                    quantity: 1
                })
            }

            localStorage.setItem('cart', JSON.stringify(new_cart))

            state.cart = new_cart
        },
        removeFromCart(state, action) {
            const {
                id
            } = action.payload
            let new_cart = [...state.cart]
            new_cart = new_cart.filter(item => item.product_id !== id)

            localStorage.setItem('cart', JSON.stringify(new_cart))

            state.cart = new_cart
        },
        removeByOne(state, action) {
            const {
                id
            } = action.payload
            let new_cart = [...state.cart]
            const inCartItem = new_cart.find(item => item.product_id === id)
            const inCartItemIndex = new_cart.findIndex(item => item.product_id === id)

            if (inCartItem.quantity > 1) {
                new_cart = editArrayItem(new_cart, inCartItemIndex, {
                    ...inCartItem,
                    quantity: inCartItem.quantity - 1
                })
            } else {
                new_cart = new_cart.filter(item => item.product_id !== id)
            }

            localStorage.setItem('cart', JSON.stringify(new_cart))

            state.cart = new_cart
        },
        setCart(state, action) {
            let new_cart = action.payload
            state.cart = new_cart
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.cart
            }
        }
    }
})

export const {
    addToCart,
    removeFromCart,
    removeByOne,
    setCart
} = cartSlice.actions
export default cartSlice.reducer