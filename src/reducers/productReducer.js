const initialState = {
    products: {
        bedroom: [],
        bathroom: [],
    },
    cart: [],
    total: 0,
    loading: false,
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_PRODUCTS_BED":
            return {
                ...state,
                products: { ...state.products, bedroom: action.payload },
                loading: false,
            };

        case "GET_PRODUCTS_BATH":
            return {
                ...state,
                products: { ...state.products, bathroom: action.payload },
                loading: false,
            };

        case "LOADING":
            return {
                ...state,
                loading: true,
            };

        case "ADD_TO_CART":
            return {
                ...state,
                cart: [...state.cart, action.payload],
            };

        case "CLEAR_CART":
            return {
                ...state,
                cart: [],
            };

        case "UPDATE_CART":
            return {
                ...state,
                cart: action.payload,
            };
        case "UPDATE_TOTAL":
            return {
                ...state,
                total: action.payload,
            };
        default:
            return state;
    }
};

export default productReducer;
