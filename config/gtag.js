export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
    window.gtag("config", GA_TRACKING_ID, {
        page_path: url,
    });
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
    window.gtag('require', 'ec')
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        ecommerce: null
    })
    window.dataLayer.push({
        'event': event,
        'ecommerce': {
            ...args
        }
    })
}