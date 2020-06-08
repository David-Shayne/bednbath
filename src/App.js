import React from 'react';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Bed from './pages/Bed';
import Bath from './pages/Bath';
import store from './store';
import Cart from './pages/Cart';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
    return (
        <div className="App" style={{ fontFamily: 'Montserrat' }}>
            <Provider store={store}>
                <AppNavbar />
                <Router basename="/">
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
                </Router>
            </Provider>
        </div>
    );
}

export default App;
