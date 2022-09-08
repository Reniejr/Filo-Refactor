import {
    createSlice
} from '@reduxjs/toolkit'
import {
    HYDRATE
} from 'next-redux-wrapper'
import {
    editArrayItem
} from '../utilities'

const FT_ID = 19

const initialState = {
    cart: [],
    total: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const {
                id,
                price
            } = action.payload
            let new_cart = [...state.cart]

            const isAlreadyAdded = new_cart.filter(item => item.variation_id === id)
            const isAlreadyAddedIndex = new_cart.findIndex(item => item.variation_id === id)

            if (isAlreadyAdded.length > 0) {
                new_cart = editArrayItem(new_cart, isAlreadyAddedIndex, {
                    ...isAlreadyAdded[0],
                    quantity: isAlreadyAdded[0].quantity + 1
                })
            } else {
                new_cart = new_cart.concat({
                    product_id: FT_ID,
                    variation_id: id,
                    quantity: 1
                })
            }

            const new_total = Math.round((state.total + price) * 100) / 100

            localStorage.setItem('cart', JSON.stringify(new_cart))
            localStorage.setItem('total', new_total)

            state.cart = new_cart
            state.total = new_total
        },
        removeFromCart(state, action) {
            const {
                id,
                price
            } = action.payload
            let new_cart = [...state.cart]
            const removed_item = new_cart.find(item => item.variation_id === id)
            new_cart = new_cart.filter(item => item.variation_id !== id)

            const new_total = Math.round((state.total - (removed_item.quantity * price)) * 100) / 100

            localStorage.setItem('cart', JSON.stringify(new_cart))
            localStorage.setItem('total', new_total)

            state.cart = new_cart
            state.total = new_total
        },
        removeByOne(state, action) {
            const {
                id,
                price
            } = action.payload
            let new_cart = [...state.cart]
            const inCartItem = new_cart.find(item => item.variation_id === id)
            const inCartItemIndex = new_cart.findIndex(item => item.variation_id === id)

            if (inCartItem.quantity > 1) {
                new_cart = editArrayItem(new_cart, inCartItemIndex, {
                    ...inCartItem,
                    quantity: inCartItem.quantity - 1
                })
            } else {
                new_cart = new_cart.filter(item => item.variation_id !== id)
            }

            const new_total = Math.round((state.total - price) * 100) / 100

            localStorage.setItem('cart', JSON.stringify(new_cart))
            localStorage.setItem('total', new_total)

            state.cart = new_cart
            state.total = new_total
        },
        setCart(state, action) {
            let new_cart = action.payload
            state.cart = new_cart
        },
        setTotal(state, action) {
            let new_total = action.payload
            state.total = new_total
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
    setCart,
    setTotal
} = cartSlice.actions
export default cartSlice.reducer