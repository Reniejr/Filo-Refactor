import { useEffect } from 'react'

//* REDUX
import { useSelector } from 'react-redux'

//* GTM
import { gtmViewItem } from '@/hooks/gtm'
import * as gtag from '@/config/gtag'

//* WooCommerceApi
import WCApi from '../api/WCApi'

//* COMPONENTS
import CustomHead from '@/main/components/CustomHead'
import FTProductBuy from '../../modules/filo-tag/components/FTProductBuy'
import PPFeatures from '../../modules/filo-tag/components/PPFeatures'

//* STYLES
import globals from '@/styles/Main.module.scss'
import ft_styles from '../../modules/filo-tag/styles/FiloTagProduct.module.scss'


const ProductPage = ({product}) => {

  const { selected_item } = useSelector(state => state.products)

  useEffect(() => {
      
    (async () => {

      let variation_id = 146
      if(selected_item) variation_id = selected_item.variation_id
        
        const variation = await WCApi.get(`products/19/variations/${variation_id}`)
        const main_product = await WCApi.get(`products/19`)
        if(variation.data && main_product.data && window !== undefined) {
            const item_ga4 = gtag.productToDLGA4(main_product.data, variation.data)
            console.log('item', item_ga4)
            console.log("price", variation.data.price)
            gtag.dataLayerEvent({
                event: "view_item",
                args: { 
                    currency: "EUR", 
                    value: parseFloat(variation.data.price), 
                    items: [item_ga4]
                }
            })
            // gtagEvent('view_item', {
            //     ecommerce:{
            //         currency: "EUR", 
            //         value: parseFloat(variation.data.price), 
            //         items: [item_ga4]
            //     }
            // })
        }
    })()

}, [selected_item])
  

  return(
    <>
      <CustomHead page={product.slug.replace('-','_')}/>
      <div 
        className={globals["page"]}
        id="filo-tag-product"
        >
          <FTProductBuy direction="normal"/>
          <PPFeatures/>
        </div>
    </>
  )
}

export async function getStaticPaths({locales}){

    const products = await WCApi.get('products')
    const paths = products.data.flatMap(product => {
        return locales.map(locale => {
            return{
                params: { slug: product.slug.toString()},
                locale
            }
        })
    })

    return{
        paths,
        fallback: false
    }
}

export async function getStaticProps({locale, params}) {

    const messages = {
      header: (await import(`../../translations/header/${locale}.json`)).default,
      footer:  (await import(`../../translations/footer/${locale}.json`)).default,
      general: (await import(`../../translations/common/${locale}.json`)).default,
      filo_tag: (await import(`../../translations/products/filo-tag/${locale}.json`)).default,
      products: (await import(`../../translations/products/${locale}.json`)).default
    }

    const product = await WCApi.get(`products/?slug=${params.slug}`)
  
    return {
      props: {
        messages,
        product: product.data[0]
      }
    };
} 

export default ProductPage