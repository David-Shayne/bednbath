import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Card,
    CardImg,
    Container,
    Spinner,
    Modal,
    ModalBody,
    Button
} from 'reactstrap';
import { getBedProducts, addToCart, saveCart } from '../actions/productActions';
import '../styles/Catalog.css';

export class Bed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedItem: {},
            isOpen: false
        };

        this.toggle = this.toggle.bind(this);
        this.cartAction = this.cartAction.bind(this);
    }

    componentDidMount() {
        this.props.getBedProducts();
    }

    toggle() {
        this.setState(state => ({ isOpen: !state.isOpen }));
    }

    cartAction(product) {
        this.toggle();
        this.props.addToCart(product);
        this.props.saveCart([...this.props.cart, product]);
    }

    render() {
        const products = this.props.products.map(product => (
            <div className="CardItem">
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-end',
                        marginBottom: '0.5em'
                    }}
                >
                    <h4
                        className="inline"
                        style={{ fontWeight: 'bold', margin: '0' }}
                    >
                        {product.name}
                    </h4>
                    <small className="inline ml-3 text-muted">
                        R{product.price}
                    </small>
                </div>
                <Card>
                    <btn
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            this.setState(state => ({
                                isOpen: true,
                                selectedItem: product
                            }));
                        }}
                    >
                        <CardImg src={product.img} className="card-img" />
                    </btn>
                </Card>
            </div>
        ));

        return (
            <div className="">
                <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                    <ModalBody className="modalBody">
                        <div className="modal-header">
                            <div className="modalTitle">
                                <h4 className="modalName">
                                    {this.state.selectedItem.name}
                                </h4>
                                <small className="modalPrice">
                                    R{this.state.selectedItem.price}
                                </small>
                            </div>
                            <button
                                onClick={this.toggle}
                                className="modalExitBtn"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="modalGrid">
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Impedit illum voluptate soluta
                                sunt dolor repudiandae qui nemo ullam, odio
                                molestias.
                            </p>
                            <img
                                className="modalImg"
                                src={this.state.selectedItem.img}
                                alt="Current product"
                            />
                        </div>
                        <Button
                            color="success"
                            className="modalBtn"
                            onClick={() =>
                                this.cartAction(this.state.selectedItem)
                            }
                        >
                            Add to cart
                        </Button>
                    </ModalBody>
                </Modal>
                <Container>
                    <Spinner
                        style={{
                            position: 'absolute',
                            left: '50%',
                            translate: '-50%'
                        }}
                        hidden={!this.props.loading}
                    />
                    <div className="Grid" style={{ marginBottom: '10vh' }}>
                        {products}
                    </div>
                </Container>
            </div>
        );
    }
}

const mapStoreToProps = store => ({
    products: store.product.products.bedroom,
    loading: store.product.loading,
    cart: store.product.cart
});

export default connect(mapStoreToProps, {
    getBedProducts,
    addToCart,
    saveCart
})(Bed);
