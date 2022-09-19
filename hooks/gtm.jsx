export const gtmViewItem = (rest) => {
    window.dataLayer?.push({
        event: "view_item",
        ...rest
    })
}
