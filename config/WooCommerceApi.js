import woocommerceRestApi from "@woocommerce/woocommerce-rest-api";
import axios from 'axios'

const wp_url = process.env.NEXT_PUBLIC_WP_URL,
    wc_ck = process.env.NEXT_PUBLIC_WOO_CK,
    wc_secret = process.env.NEXT_PUBLIC_WOO_CS


const WCApi = new woocommerceRestApi({
    url: wp_url,
    consumerKey: wc_ck,
    consumerSecret: wc_secret,
    version: 'wc/v3',
    queryStringAuth: true,
    axiosConfig: {
        headers: {}
    }
})

const postOrder = (order) => {
    axios.post(`${wp_url}/wp-json/wc/v3/orders?consumer_key=${wc_ck}&consumer_secret=${wc_secret}`, order)
        .then((response) => {
            // console.log(response.data)
        })
}

export {
    postOrder
}

export default WCApi;