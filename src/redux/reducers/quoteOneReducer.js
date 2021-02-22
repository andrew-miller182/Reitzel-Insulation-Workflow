
const intialState = {
    "quote_one":null
}


export default (state = intialState, action) => {
    switch (action.type) {
        case "quote_one":
            return {
                quote_one: action.payload
            };
        default:
            return state;
    }
};
