const checkData = (object_to_check) => {
    return Object.entries(object_to_check).map(([key, value]) => {
        if (key !== "address_2" && key !== "company_name" && key !== "city") {
            if (value !== "") return true
            else return false
        } else return true
    })
}
const checkData1 = (object_to_check) => {
    const data_check = Object.entries(object_to_check).map(([key, value]) => {
        if (key !== "address_2" && key !== "company_name" && key !== "city") {
            if (value !== "") return true
            else return false
        } else return true
    })
    return data_check.includes(false) ? false : true
}

const numberToStringWithDecimals = (number) => {
    number.toString().slice(0, number.toString().length - 2) + "." + number.toString().slice(number.toString().length - 2)
}

export {
    checkData,
    checkData1,
    numberToStringWithDecimals
}