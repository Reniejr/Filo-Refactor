import { useEffect } from 'react'

//* GTM
import { gtmViewItem } from '@/hooks/gtm'

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

  useEffect(() => {
    
    ( async () => {
      const product_viewed = await WCApi.get(`products/${product.id}`)
      const gtm_data = {
        "ecommerce":{
          "items":[
            product_viewed.data
          ]
        }
      }
      gtmViewItem(gtm_data)

    })()
  
    /* eslint-disable-next-line */
  }, [])
  

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