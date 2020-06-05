import React, { Component } from 'react';
import { Navbar, NavLink, Container, Button } from 'reactstrap';
import { Icon } from '@iconify/react';
import cart from '@iconify/icons-ic/baseline-shopping-cart';
import '../styles/AppNavbar.css';
import { connect } from 'react-redux';
import { getCart } from '../actions/productActions';

class AppNavbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cartCounter: 0
        };
    }

    componentDidMount() {
        this.props.getCart();
    }
    render() {
        return (
            <div style={{ marginBottom: '10vh' }}>
                <Navbar style={{ padding: '2em 0 1.5em 0' }}>
                    <Container className="align-items-center">
                        <NavLink
                            href="https://davidshayne.co.za"
                            style={{ color: 'grey', paddingLeft: '0' }}
                        >
                            My Portfolio
                        </NavLink>

                        <h1
                            className="absolute-center"
                            style={{
                                fontWeight: 'bold'
                            }}
                        >
                            <a
                                href="/"
                                style={{
                                    color: 'black',
                                    textDecoration: 'none'
                                }}
                            >
                                Bed 'n Bath
                            </a>
                        </h1>
                        <NavLink href="/cart" style={{ paddingRight: '0' }}>
                            <Icon
                                icon={cart}
                                style={{ fontSize: '1.5em', color: 'black' }}
                            />
                            <span class="badge badge-pill badge-success">
                                {this.props.cart.length}
                            </span>
                        </NavLink>
                    </Container>
                </Navbar>
                <Navbar>
                    <Container className="justify-content-center">
                        <a href="/bathroom" className="category-a">
                            <Button
                                className="btn-outline-dark category-btn"
                                color="none"
                            >
                                Shop Bath
                            </Button>
                        </a>
                        <a href="/bedroom" className="category-a">
                            <Button
                                className="btn-outline-dark category-btn category-btn-reverse"
                                color="none"
                            >
                                Shop Bed
                            </Button>
                        </a>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapStoreToProps = store => ({
    cart: store.product.cart
});

export default connect(mapStoreToProps, { getCart })(AppNavbar);
