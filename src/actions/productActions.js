import axios from 'axios';
import Cookies from 'universal-cookie';
const proxy = 'https://bednbath-server.herokuapp.com';
const cookie = new Cookies();

export const getBedProducts = () => dispatch => {
    dispatch(loading());
    axios.get(`${proxy}/api/products/bedroom`).then(products => {
        dispatch({
            type: 'GET_PRODUCTS_BED',
            payload: products.data
        });
    });
};

export const getBathProducts = () => dispatch => {
    dispatch(loading());
    axios.get(`${proxy}/api/products/bathroom`).then(products => {
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
    const cart = cookie.get(`cart`);

    dispatch({
        type: 'UPDATE_CART',
        payload: cart
    });

    dispatch(updateTotal());
};

export const addToCart = product => dispatch => {
    dispatch({
        type: 'ADD_TO_CART',
        payload: product
    });
};

export const saveCart = cart => dispatch => {
    cookie.set('cart', cart);
};

export const clearCart = () => dispatch => {
    cookie.set('cart', []);

    dispatch({
        type: 'CLEAR_CART'
    });
};

export const updateCart = item => dispatch => {
    const cart = cookie.get('cart');

    const newCart = cart.filter(product => product._id !== item._id);

    cookie.set('cart', newCart);

    dispatch({
        type: 'UPDATE_CART',
        payload: newCart
    });

    dispatch(updateTotal());
};

export const updateItemCount = (id, count) => dispatch => {
    const cart = cookie.get('cart');

    // grabbing product from cart then updating the count
    const updatedProduct = cart.filter(product => product._id === id)[0];
    updatedProduct.count = count;

    // removing product from cart and inserting updated product
    const newCart = [
        ...cart.filter(product => product._id !== id),
        updatedProduct
    ];

    cookie.set('cart', newCart);
    dispatch(getCart());
};

export const updateTotal = () => dispatch => {
    const cart = cookie.get('cart');
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
};
