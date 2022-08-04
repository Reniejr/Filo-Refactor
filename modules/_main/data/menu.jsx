// import {
//     LinkCTA
// } from '@/common/components/CTA'

//* HEADER -------------------------------------------------------

const header_menu = [{
        "id": "how-it-works",
        "link": "/how-it-works",
        "type": "menu-item"
    },
    {
        "id": "corporate-gifts",
        "link": "/business",
        "type": "menu-item"
    },
    {
        "id": "buy-action",
        "link": "/products/filo-tag",
        "type": "buy-action"
    },
    {
        "id": "cart",
        "link": "/cart",
        "type": "cart"
    }
]

// header_menu.forEach(item => {

//     let {type, link} = item

//     switch(type){
//         case "buy-action": item.component = (title) => <BuyAction href={link} title={title}/>
//         break;
//         case "cart": item.component = () => <CartButton href={link}/>
//         break; 
//         default: item.component = (title) => <MenuLink href={link} title={title}/>
//         break;
//     }
// })

//* FOOTER -------------------------------------------------------

const footer_menu = [{
    "id": "shop",
    "nav": [{
        "id": "filo-tag",
        "link": "/products/filo-tag"
    },
    {
        "id": "tata-pad",
        "link": ""
    },
    {
        "id": "corporate-gifts",
        "link": "/corporate-gifts"
    },
    {
        "id": "retailers-and-distributors",
        "link": "/contact-us"
    },
    {
        "id": "terms-and-conditions",
        "link": "/terms-and-conditions"
    }]
},
{
    "id": "learn",
    "nav": [{
        "id": "how-it-works",
        "link": "/how-it-works"
    },
    {
        "id": "key-finder",
        "link": "/key-finder"
    },
    {
        "id": "luggage-finder",
        "link": "/luggage-finder"
    },
    {
        "id": "wallet-finder",
        "link": "/wallet-finder"
    },
    {
        "id": "find-your-phone",
        "link": "/find-your-phone"
    }]
},
{
    "id": "support",
    "nav": [{
        "id": "faq",
        "link": ""
    },
    {
        "id": "support",
        "link": ""
    },
    {
        "id": "returns-and-exchange",
        "link": "/returns-and-exchange"
    }]
},
{
    "id": "company",
    "nav": [{
        "id": "about-us",
        "link": "/about-us"
    },
    {
        "id": "contact-us",
        "link": "/contact-us"
    },
    {
        "id": "press",
        "link": "/press"
    },
    {
        "id": "career",
        "link": "/career"
    },
    {
        "id": "blog",
        "link": "/blog"
    }]
}]

// footer_menu.forEach( sub_menu => {
//     sub_menu.nav.forEach( item => {

//         const { link } = item

//         item.component = (title) => <MenuLink href={link} title={title}/>
//     })
// })

//* SOCIALS
const social_menu = [{
        "id": "facebook",
        "link": "https://www.facebook.com/FiloTM",
    },
    {
        "id": "twitter",
        "link": "https://twitter.com/TrackFilo"
    },
    {
        "id": "instagram",
        "link": "https://www.instagram.com/filo_tm/"
    },
]


export {
    header_menu,
    footer_menu,
    social_menu
}