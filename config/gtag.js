// export const GA_TRACKING_ID = process.env.NODE_ENV === 'production' ? process.env.GA_ID : process.env.NEXT_PUBLIC_GA_ID
export const GA_TRACKING_ID = EPDM266LWB

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
    window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
    });
};