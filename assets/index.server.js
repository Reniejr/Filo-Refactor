// const wp_url = process.env.NODE_ENV === 'production' ? process.env.WP_URL : process.env.NEXT_PUBLIC_WP_URL
const wp_url = process.env.WP_URL

const BASE_URL = wp_url + '/wp-content/uploads/2022';

//* ASSETS FILE NAMES
import logos from './logos.json';
import apps from './apps.json';
import icons from './icons.json';
import products from './products.json';
import homepages from './homepages.json';
import press from './press.json';
import hiw from './hiw.json'
import finders from './finders.json';
import about_us from './about-us.json';
import contact_us from './contact_us.json';
import career from './career.json';
import product_page from './product_page.json';

const media = {
    logos,
    apps,
    icons,
    products,
    homepages,
    press,
    hiw,
    finders,
    about_us,
    contact_us,
    career,
    product_page
}

const getImage = (folder) => {

    const images = {
        ...media[folder]
    }

    Object.entries(images).forEach(([imageName, url]) => {
        images[imageName] = BASE_URL + url
    })

    return images
}

export default getImage;