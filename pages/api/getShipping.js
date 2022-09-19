import WCApi from './WCApi'

const getShippingZones = async () => {
    const shipping_zones = await WCApi.get('shipping/zones')
    return shipping_zones.data.map(zone => {
        return {
            id: zone.id,
            name: zone.name,
        }
    })
}

const getShippingLocations = async (id) => {
    const shipping_locations = await WCApi.get(`shipping/zones/${id}/locations`)
    return shipping_locations.data.map(location => {
        return location.code
    })
}

const getShippingMethods = async (id) => {
    const shipping_methods = await WCApi.get(`shipping/zones/${id}/methods`)
    // if (!shipping_methods) {
    //     return {
    //         title: "none",
    //         cost: 0
    //     }
    // } else {
    return shipping_methods.data.map(method => {
        return {
            title: method.title,
            cost: method.settings.cost ? parseFloat(method.settings.cost.value) : 0
        }
    })
    // }
}

const getShippingLocationsMethods = async () => {
    const shipping_zones = await getShippingZones()
    const shipping_locations_methods = Promise.all(
        shipping_zones.flatMap(async zone => {
            const locations = await getShippingLocations(zone.id)
            const methods = await getShippingMethods(zone.id)
            return {
                zone: zone.name,
                zone_id: zone.id,
                locations,
                method: methods[0]
            }
        })
    )
    const data = (await shipping_locations_methods).flatMap(zone => {
        return zone.locations.map(location => {
            return {
                zone: zone.zone,
                zone_id: zone.zone_id,
                location,
                method: zone.method
            }
        })
    })
    return data
}

export {
    getShippingLocationsMethods
}