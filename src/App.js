import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'font-awesome/css/font-awesome.min.css';

import withStore from './Store';
import withLayout from './Layout';
import Home from './views/Home';
import Product from './views/Product';
import About from './views/About';
import Catagories from './views/Catagories';
import Profile from './views/Profile';
import Orders from './views/Orders';
import NotFound from './views/404';
import NavagationBar from './containers/NavigationBar';

const Routes = () => (
	<div
		style={{
			backgroundColor: 'cadetblue',
			marginTop: '56px',
			borderBottomLeftRadius: '20px',
			borderBottomRightRadius: '20px',
			padding: '20px',
		}}
	>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/products/:id" component={Product} />
			<Route path="/products" component={Catagories} />
			<Route path="/profile" component={Profile} />
			<Route path="/about" component={About} />
			<Route path="/orders" component={Orders} />
			<Route component={NotFound} />
		</Switch>
	</div>
);

const Footer = () => (
	<div>
		<h1>Footer</h1>
	</div>
);

const withRouter = App => () => (
	<Router>
		<App />
	</Router>
);
const App = withStore(withRouter(withLayout(NavagationBar, Routes, Footer)));
export default App;
