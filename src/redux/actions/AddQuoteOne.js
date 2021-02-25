export default (state, action) => {
    switch (action.type) {
        case "quote_one":
            return {
                quote_one: action.payload
            };
        default:
            return state;
    }
};
