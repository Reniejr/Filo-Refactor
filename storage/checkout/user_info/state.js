const billing_data = {
    "first_name": "",
    "last_name": "",
    "company_name": "",
    "country": "",
    "address_1": "",
    "address_2": "",
    "postal_code": "",
    "state": "",
    "city": "",
    "phone": "",
    "email": ""
};
const shipping_data = {
    "first_name": "",
    "last_name": "",
    "company_name": "",
    "country": "",
    "address_1": "",
    "address_2": "",
    "postal_code": "",
    "state": "",
    "city": "",
    "phone": "",
};

const main_data = {
    billing: {
        data: {
            ...billing_data
        }
    },
    shipping: {
        isShipping: false,
        data: {
            ...shipping_data
        }
    },
    invoice: {
        isInvoice: false,
        data: null
    },
    isPrivacyAccepted: false
};

export default main_data;