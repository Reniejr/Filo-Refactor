const BASE_URL = process.env.NEXT_PUBLIC_WP_URL + '/wp-content/uploads/2022';

//* ASSETS FILE NAMES
import logos from './logos.json';
import apps from './apps.json';
import icons from './icons.json';
import products from './products.json';
import homepages from './homepages.json';
import press from './press.json';

const media = {
    logos,
    apps,
    icons,
    products,
    homepages,
    press
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