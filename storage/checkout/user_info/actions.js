export const setBillingData = (state, action) => {
    state.billing.data = action.payload
}

export const setShipping = (state) => {
    state.shipping.isShipping = !state.shipping.isShipping
}

export const setShippingData = (state, action) => {
    state.shipping.data = action.payload
}

export const setInvoice = (state) => {
    state.invoice.isInvoice = !state.invoice.isInvoice
}

export const setInvoiceData = (state, action) => {
    state.invoice.data = action.payload
    if (action.payload) localStorage.setItem('invoice', JSON.stringify(action.payload))
}

export const setIsPrivacyAccepted = (state) => {
    state.isPrivacyAccepted = !state.isPrivacyAccepted
}