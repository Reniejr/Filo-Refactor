const billing_data = [
    [{
            "id": "first_name",
            "type": "text",
            "required": true
        },
        {
            "id": "last_name",
            "type": "text",
            "required": true
        }
    ],
    [{
        "id": "company_name",
        "type": "text",
        "required": false
    }],
    [{
        "id": "country",
        "type": "csc",
        "required": true
    }],
    [{
        "id": "address_1",
        "type": "text",
        "required": true
    }],
    [{
        "id": "address_2",
        "type": "text",
        "required": false
    }],
    [{
            "id": "postal_code",
            "type": "text",
            "required": true
        },
        {
            "id": "state",
            "type": "csc",
            "required": true
        },
        {
            "id": "city",
            "type": "csc",
            "required": false
        }
    ],
    [{
        "id": "phone",
        "type": "tel",
        "required": true
    }, ],
    [{
        "id": "email",
        "type": "email",
        "required": true
    }]
];
const shipping_data = [
    [{
            "id": "first_name",
            "type": "text",
            "required": true
        },
        {
            "id": "last_name",
            "type": "text",
            "required": true
        }
    ],
    [{
        "id": "company_name",
        "type": "text",
        "required": false
    }],
    [{
        "id": "country",
        "type": "csc",
        "required": true
    }],
    [{
        "id": "address_1",
        "type": "text",
        "required": true
    }],
    [{
        "id": "address_2",
        "type": "text",
        "required": false
    }],
    [{
            "id": "postal_code",
            "type": "text",
            "required": true
        },
        {
            "id": "state",
            "type": "csc",
            "required": true
        },
        {
            "id": "city",
            "type": "csc",
            "required": false
        }
    ],
    [{
        "id": "phone",
        "type": "tel",
        "required": true
    }]
];
export {
    billing_data,
    shipping_data
}