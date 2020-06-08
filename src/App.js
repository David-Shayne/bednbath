import React from 'react';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Bed from './pages/Bed';
import Bath from './pages/Bath';
import store from './store';
import Cart from './pages/Cart';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookie = new Cookies();

let cart = cookie.get('cart');
if (!cart) {
    cookie.set('cart', [{ name: 'none' }]);
}

function App() {
    return (
        <div className="App" style={{ fontFamily: 'Montserrat' }}>
            <Provider store={store}>
                <AppNavbar />
                <BrowserRouter basename="/React">
                    <Switch>
                        <Route path="/bedroom">
                            <Bed />
                        </Route>
                        <Route path="/bathroom">
                            <Bath />
                        </Route>
                        <Route path="/cart">
                            <Cart />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
