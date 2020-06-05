import axios from 'axios';

export const getBedProducts = () => dispatch => {
    dispatch(loading());
    axios.get('/api/products/bedroom').then(products => {
        dispatch({
            type: 'GET_PRODUCTS_BED',
            payload: products.data
        });
    });
};

export const getBathProducts = () => dispatch => {
    dispatch(loading());
    axios.get('/api/products/bathroom').then(products => {
        dispatch({
            type: 'GET_PRODUCTS_BATH',
            payload: products.data
        });
    });
};

const loading = () => dispatch => {
    dispatch({
        type: 'LOADING'
    });
};

export const getCart = () => dispatch => {
    axios
        .get('/api/cookie/cart')
        .then(res =>
            dispatch({
                type: 'UPDATE_CART',
                payload: res.data
            })
        )
        .then(dispatch(updateTotal()));
};

export const addToCart = product => dispatch => {
    dispatch({
        type: 'ADD_TO_CART',
        payload: product
    });
};

export const saveCart = cart => dispatch => {
    axios.post('/api/cookie/cart', cart);
};

export const clearCart = () => dispatch => {
    axios.delete('/api/cookie/cart').then(
        dispatch({
            type: 'CLEAR_CART'
        })
    );
};

export const updateCart = item => dispatch => {
    axios
        .get('/api/cookie/cart')
        .then(res => {
            const newCart = res.data.filter(
                product => product._id !== item._id
            );

            axios.post('/api/cookie/cart', newCart).then(
                dispatch({
                    type: 'UPDATE_CART',
                    payload: newCart
                })
            );
        })
        .then(dispatch(updateTotal()));
};

export const updateItemCount = (id, count) => dispatch => {
    axios.get('/api/cookie/cart').then(res => {
        const updatedProduct = res.data.filter(
            product => product._id === id
        )[0];
        updatedProduct.count = count;
        const newCart = [
            ...res.data.filter(product => product._id !== id),
            updatedProduct
        ];

        axios.post('/api/cookie/cart', newCart).then(() => {
            dispatch(getCart());
        });
    });
};

export const updateTotal = () => dispatch => {
    axios.get('/api/cookie/cart').then(res => {
        const cart = res.data;
        let total = 0;
        if (cart) {
            cart.forEach(product => {
                total += product.count * product.price;
            });
            dispatch({
                type: 'UPDATE_TOTAL',
                payload: total
            });
        }
    });
};
