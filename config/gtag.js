export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
    if (window !== undefined) {
        console.log(window.gtag)
        window.gtag("config", GA_TRACKING_ID, {
            page_path: url,
        });
    }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
    action,
    category,
    label,
    value
}) => {
    if (window !== undefined) {
        window.gtag("event", action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

export const dataLayerEvent = ({
    event,
    args
}) => {
    if (window !== undefined) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            ecommerce: null
        })
        console.log(args)
        window.dataLayer.push({
            'event': event,
            'ecommerce': {
                ...args
            }
        })
    }
}

export const productToDLGA4 = (main, variant) => {
    return {
        item_id: variant.sku,
        item_name: main.name,
        item_list_name: [],
        item_list_id: null,
        index: 0,
        item_brand: "Filo",
        item_category: main.categories.length > 0 && main.categories[0] ? main.categories[0].name : "",
        item_category2: main.categories.length > 0 && main.categories[1] ? main.categories[1].name : "",
        item_category3: main.categories.length > 0 && main.categories[2] ? main.categories[2].name : "",
        item_category4: main.categories.length > 0 && main.categories[3] ? main.categories[3].name : "",
        item_category5: main.categories.length > 0 && main.categories[4] ? main.categories[4].name : "",
        item_variant: variant.sku,
        affiliation: "filotrack.com",
        discount: 0,
        coupon: "",
        price: Math.round((parseFloat(variant.price) * 100) / 100).toFixed(2),
        quantity: 1
    }
}

export const gtagEvent = (event_name, value) => {
    if (window !== undefined) {
        window.gtag('event', event_name, value)
    }
}