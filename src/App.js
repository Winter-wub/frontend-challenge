import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link,
	NavLink,
	Switch,
} from 'react-router-dom';
import Popover from 'react-tiny-popover';
import { createStore, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import rootReducer from './rootReducer';
import Home from './views/Home';
import Product from './views/Product';
import About from './views/About';
import Catagories from './views/Catagories';
import NotFound from './views/404';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	/* preloadedState, */ composeEnhancers(),
);

const mapStates = ({ cart }) => ({
	cart,
});

const mapDispatch = dispatch => ({
	removeCart: id => dispatch({ type: 'REMOVE_ITEM_CART', params: { id } }),
});

const withLayout = (NavagationBar, Content, Footer) => {
	return function() {
		return (
			<Provider store={store}>
				<Router>
					<React.Fragment>
						<NavagationBar />
						<div className="App">
							<Content />
						</div>
						<Footer />
					</React.Fragment>
				</Router>
			</Provider>
		);
	};
};

const NavagationBar = ({ cart: state }) => {
	const [isPopoverOpen, setPopover] = useState(false);
	const { cart } = state;
	return (
		<React.Fragment>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<Link to="/">
					<div className="navbar-brand">Navbar</div>
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<NavLink
								className="nav-link"
								activeClassName="active"
								exact
								to="/"
							>
								Home
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link"
								activeClassName="active"
								exact
								to="/products"
							>
								Store
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link"
								activeClassName="active"
								exact
								to="/about"
							>
								About
							</NavLink>
						</li>
					</ul>
					<Popover
						isOpen={isPopoverOpen}
						position={['bottom', 'right']} // if you'd like, supply an array of preferred positions ordered by priority
						padding={10} // adjust padding here!
						disableReposition // prevents automatic readjustment of content position that keeps your popover content within your window's bounds
						onClickOutside={() => setPopover(!isPopoverOpen)} // handle click events outside of the popover/target here!
						content={
							<div style={{ backgroundColor: 'white', width: '300px' }}>
								{cart.map(item => (
									<div key={item.name} style={{ margin: '2%' }}>
										<img
											src={item.image_url}
											alt={item.name}
											style={{
												width: '65px',
												borderRadius: '20%',
												margin: '2%',
											}}
										/>
										{item.name} {item.value}
									</div>
								))}
							</div>
						}
					>
						<button
							style={{ marginRight: '20px' }}
							className="btn btn-success"
							onClick={() => setPopover(!isPopoverOpen)}
						>
							Cart
						</button>
					</Popover>
					<form className="form-inline my-2 my-lg-0">
						<input
							className="form-control mr-sm-2"
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
						<button
							className="btn btn-outline-success my-2 my-sm-0"
							type="submit"
						>
							Search
						</button>
					</form>
				</div>
			</nav>
		</React.Fragment>
	);
};

const Content = () => (
	<React.Fragment>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/products/:id" component={Product} />
			<Route path="/products" component={Catagories} />
			<Route path="/about" component={About} />
			<Route component={NotFound} />
		</Switch>
	</React.Fragment>
);

const Footer = () => <React.Fragment />;
const App = withLayout(
	connect(
		mapStates,
		mapDispatch,
	)(NavagationBar),
	Content,
	Footer,
);
export default App;
