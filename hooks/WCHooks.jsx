import { useEffect } from 'react'

//* REDUX
import { useDispatch } from 'react-redux'
import { checkout } from 'storage/checkout'
import { products } from 'storage/products'

//* API
import WCApi from '@/pages/api/WCApi'
import { getShippingLocationsMethods } from '@/pages/api/getShipping'

const getFromLocalStorage = (item, isObj, alt_value) => {
    if (localStorage.getItem(item)) {
        return isObj == 'obj' ? 
            JSON.parse(localStorage.getItem(item)) : localStorage.getItem(item)
    } else return alt_value
}

const useWCHooks = () => {

    const dispatch = useDispatch()
    const {
        setCartItems,
        setInvoiceData,
        setLocations
    } = checkout.actions
    const {
        setOriginalProducts,
        setWcOrderData
    } = products.actions

    useEffect(() => {
      
        const ISSERVER = typeof window === "undefined";

        if(!ISSERVER) {
            const line_items = getFromLocalStorage('line_items', 'obj', [])
            if (line_items.length > 0) {
                const original_total = getFromLocalStorage('original_total', 'int', 0)
                const total = getFromLocalStorage('total', 'int', 0)
                dispatch(setCartItems({line_items, original_total, total}))
            }
            const invoice = getFromLocalStorage('invoice', 'obj', null)
            if(invoice) dispatch(setInvoiceData(invoice)) 
        }
      
    /* eslint-disable-next-line */
    }, [])

    useEffect(() => {
    
        (async () => {

            const products = await WCApi.get('products')
            const products_basic_info = await Promise.all(
                products.data.flatMap( async (base_product) => {
                    const variation_detail = await Promise.all(
                        base_product["variations"].map( async (variant) => {
                            const variation = await WCApi.get(`products/${base_product["id"]}/variations/${variant}`)
                            const { price, id, sku, attributes } = variation.data
                            const variant_name = attributes.reduce((prev, current) => `${prev["option"]} - ${current["option"]}`)
                            return {
                                "variation_id": id,
                                "sku": sku,
                                "variant_name": variant_name,
                                "attributes": attributes.map(attribute => {
                                    const {
                                        name, option
                                    } = attribute
                                    return{
                                        name, option
                                    }
                                }),
                                "amount": price,
                                "currency": "EUR",
                            }
                        })
                    )
                    return{
                        "id": base_product["id"],
                        "product_name": base_product["name"],
                        "variations": variation_detail
                    }
                })
            )
            if(products_basic_info.length > 0) dispatch(setOriginalProducts(products_basic_info))
            
            const wc_order_products_data = products_basic_info.flatMap( product => {
                return product["variations"].map(variant => {
                    const { variation_id, amount, currency } = variant
                    return{
                        "product_id": product["id"],
                        variation_id, currency,
                        "amount": amount * 100
                    }
                })
            })
            if(wc_order_products_data.length > 0) dispatch(setWcOrderData(wc_order_products_data))

        })()

    /* eslint-disable-next-line */
    },[])

    useEffect(() => {
        (async () => {
            const shipping_zones = await getShippingLocationsMethods();
            dispatch(setLocations(shipping_zones))
          })()
    /* eslint-disable-next-line */
    }, [])

}

export default useWCHooks