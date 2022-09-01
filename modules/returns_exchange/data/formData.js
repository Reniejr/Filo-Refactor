const formDatas = [{
        "id": "n_order",
        "type": "text",
        "required": true,
        "label_show": false
    },
    {
        "id": "request_for",
        "type": "radio",
        "required": true,
        "labels": ["return", "exchange"],
        "label_show": true
    },
    {
        "id": "reason",
        "type": "textarea",
        "required": true,
        "label_show": true
    },
    {
        "id": "name",
        "type": "text",
        "required": true,
        "label_show": false
    },
    {
        "id": "phone",
        "type": "tel",
        "required": true,
        "label_show": false
    },
    {
        "id": "email",
        "type": "email",
        "required": true,
        "label_show": false
    },
    {
        "id": "notes",
        "type": "textarea",
        "required": false,
        "label_show": true
    },
    {
        "id": "policy",
        "type": "checkbox",
        "required": true,
        "label_show": true
    }
]

export default formDatas