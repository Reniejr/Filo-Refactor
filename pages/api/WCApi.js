import woocommerceRestApi from "@woocommerce/woocommerce-rest-api";

const wp_url = process.env.NEXT_PUBLIC_WP_URL,
    wc_ck = process.env.NEXT_PUBLIC_WOO_CK,
    wc_secret = process.env.NEXT_PUBLIC_WOO_SECRET


const WCApi = new woocommerceRestApi({
    url: wp_url,
    consumerKey: wc_ck,
    consumerSecret: wc_secret,
    version: 'wc/v3',
    axiosConfig: {
        headers: {}
    }
})

export default WCApi;