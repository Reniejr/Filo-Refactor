/*
    CART ITEM
    {
        product_id: integer,
        variation_id: integer,
        quantity: integer,
        amount: float,
        currency: string
    }
*/
import {
    editArrayItem,
    saveCartData
} from "@/utilities/index"

export const setCartItems = (state, action) => {
    state.line_items = action.payload.line_items
    state.original_total = action.payload.original_total
    state.total = action.payload.total
}

export const resetCartItems = (state) => {
    state.line_items = []
    state.total = 0
    state.original_total = 0
    state.discounted_total = 0
    localStorage.clear()
}

export const addCartItem = (state, action) => {
    let new_line_items = [...state.line_items]

    const {
        variation_id,
        amount
    } = action.payload

    //* CHECK IF ITEM IS ALREADY IN CART
    const isAlreadyAdded = new_line_items.findIndex(item => item.variation_id === variation_id)

    //* ADD +1 QUANTITY || ADD ITEM TO CART
    if (isAlreadyAdded !== -1) {
        new_line_items = editArrayItem(new_line_items, isAlreadyAdded, {
            ...new_line_items[isAlreadyAdded],
            quantity: new_line_items[isAlreadyAdded].quantity + 1
        })
    } else {
        new_line_items = new_line_items.concat({
            ...action.payload,
            quantity: 1
        })
    }

    //* SET NEW TOTAL
    const new_total = state.total + amount
    const new_original_total = state.original_total + amount

    saveCartData(state, {
        new_line_items,
        new_total,
        new_original_total
    })



}

export const removeByOne = (state, action) => {
    let new_line_items = [...state.line_items]

    const {
        variation_id,
        amount
    } = action.payload

    //* FIND ITEM
    const isAlreadyAdded = new_line_items.findIndex(item => item.variation_id === variation_id)

    //* REMOVE -1 QUANTITY || REMOVE ITEM FROM CART
    if (new_line_items[isAlreadyAdded].quantity > 1) {
        new_line_items = editArrayItem(new_line_items, isAlreadyAdded, {
            ...new_line_items[isAlreadyAdded],
            quantity: new_line_items[isAlreadyAdded].quantity - 1
        })
    } else {
        new_line_items = new_line_items.filter(item => item.variation_id === variation_id)
    }

    //* SET NEW TOTAL
    const new_total = state.total > amount ? state.total - amount : 0
    const new_original_total = state.original_total > amount ? state.original_total - amount : 0

    saveCartData(state, {
        new_line_items,
        new_total,
        new_original_total
    })



}

export const removeFromCart = (state, action) => {

    const {
        variation_id,
        amount,
        quantity
    } = action.payload

    let new_line_items = [...state.line_items]

    //* REMOVE FROM CART
    new_line_items = new_line_items.filter(item => item.variation_id === variation_id)

    //* CALCULATE TOTAL TO REMOVE
    const total_to_remove = parseFloat(amount * quantity)

    //* SET NEW TOTAL
    const new_total = state.total - total_to_remove
    const new_original_total = state.original_total - total_to_remove

    saveCartData(state, {
        new_line_items,
        new_total,
        new_original_total
    })


}

export const setNewTotal = (state, action) => {
    state.total = action.payload
}