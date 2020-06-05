import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Cart.css';
import {
    Container,
    Button,
    Input,
    Modal,
    ModalBody,
    ModalHeader
} from 'reactstrap';
import { Icon } from '@iconify/react';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever';
import {
    updateCart,
    updateItemCount,
    updateTotal
} from '../actions/productActions';
import creatorImg from '../img/creator.jpg';

export class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.props.updateTotal();
    }

    toggle() {
        this.setState(state => ({
            isOpen: !state.isOpen
        }));
    }

    render() {
        let products;

        if (this.props.cart) {
            const cart = this.props.cart.sort(function (a, b) {
                return a.price - b.price;
            });
            products = cart.map(product => (
                <div className="cart-grid">
                    <div className="cart-product">
                        <img src={product.img} alt="" className="cart-img" />
                        <div className="cart-info">
                            <h4>{product.name}</h4>
                            <small>R{product.price}</small>
                            <small className="cart-id">ID: {product._id}</small>
                        </div>
                    </div>

                    <Input
                        type="number"
                        className="cart-input"
                        defaultValue={product.count || 1}
                        onChange={e =>
                            this.props.updateItemCount(
                                product._id,
                                e.target.value
                            )
                        }
                        min={1}
                        max={10}
                    />
                    <Button
                        color="danger"
                        // deletes product from cart and updates total
                        onClick={() => {
                            this.props.updateCart(product);
                            setTimeout(this.props.updateTotal, 500);
                        }}
                        className="cart-btn"
                    >
                        <Icon icon={baselineDeleteForever} />
                    </Button>
                </div>
            ));
        }

        return (
            <Container style={{ marginBottom: '10vh' }}>
                <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                    <ModalHeader
                        style={{ justifyContent: 'center' }}
                        toggle={this.toggle}
                    >
                        <h1>View my portfolio</h1>
                    </ModalHeader>
                    <ModalBody style={{ marginBottom: '3.33vh' }}>
                        <img
                            src={creatorImg}
                            alt="David Michael Shayne"
                            className="creator-img"
                        />
                        <p style={{ textAlign: 'center', marginTop: '3.33vh' }}>
                            Congratulations for making your way through my
                            project.
                            <br />
                            Click the button below to see more like this!
                        </p>
                        <a
                            href="https://www.davidshayne.co.za"
                            style={{ textAlign: 'center' }}
                        >
                            <Button
                                color="success"
                                style={{
                                    width: '50%',
                                    margin: '0 auto'
                                }}
                            >
                                View
                            </Button>
                        </a>
                    </ModalBody>
                </Modal>

                <h1 className="msg">Hope you enjoy, see you soon!</h1>

                <div className="content-flex">
                    <div className="cart">{products}</div>
                    <div className="summary">
                        <h4>Order Summary</h4>
                        <div className="summary-info">
                            <p>Your Cart:</p>
                            <p>R{this.props.total}</p>
                        </div>
                        <div className="summary-info">
                            <p>Delivery Fee:</p>
                            <p>R{45}</p>
                        </div>
                        <div className="summary-total">
                            <p>Total:</p>
                            <h3>R{this.props.total + 45}</h3>
                        </div>
                        <Button
                            className="checkout-btn"
                            color="success"
                            onClick={this.toggle}
                        >
                            Proceed to Checkout
                        </Button>
                    </div>
                </div>
            </Container>
        );
    }
}

const mapStoreToProps = store => ({
    cart: store.product.cart,
    total: store.product.total
});

export default connect(mapStoreToProps, {
    updateCart,
    updateItemCount,
    updateTotal
})(Cart);
