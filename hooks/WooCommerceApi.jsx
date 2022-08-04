import { useState, useEffect} from 'react'

//?CONFIG
import WCApi from '../config/WooCommerceApi'


const useWooCommerceApi = () => {

    const [{products}, setWcData] = useState({
        products: [],
    });

    useEffect(() =>{

       (async () => {
            try {
                const result = await WCApi.get('products');
                //? console.log(result.data);
                setWcData({products: result.data});
            } catch (error) {
                console.log(error);
            }
            
       })(); 

        /* eslint-disable-next-line */
    },[]);

  return {
    products
  }
}

export default useWooCommerceApi