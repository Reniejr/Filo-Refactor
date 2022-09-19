const checkData = (object_to_check) => {
    return Object.entries(object_to_check).map(([key, value]) => {
        if (key !== "address_2" && key !== "company_name" && key !== "city") {
            if (value !== "") return true
            else return false
        } else return true
    })
}

export {
    checkData
}