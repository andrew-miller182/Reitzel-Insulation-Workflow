
const intialState = {
    "quote_selected": null,
    "quote_one":{
        first_name: "",
        last_name: "",
        billing_address: "",
        city: "",
        post_code: "",
        phone_number: "",
        email: "",
        customer_notes: "",
        installer_notes: "",
        salesman: "",
        products: [{
            name: null,
            option: null,
            price: 0.00
        }]
    },
}


export default (state = intialState, action) => {
    switch (action.type) {
        case "quote_selected":
            return {
                quote_selected: action.payload,
            };
        case "quote_one":
            return {
                quote_one: action.payloadq,
            };
        default:
            return state;
    }
};
