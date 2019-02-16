import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';
import Catagories from './views/Catagories';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const withLayout = (NavagationBar, Content, Footer) => {
	return function() {
		return (
			<Router>
				<React.Fragment>
					<NavagationBar />
					<div className="App">
						<Content />
					</div>
					<Footer />
				</React.Fragment>
			</Router>
		);
	};
};

const navagationBar = () => {
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
							<Link to="/">
								<div className="nav-link">Home</div>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="store">
								<div className="nav-link">Store</div>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="about">
								<div className="nav-link">About</div>
							</Link>
						</li>
					</ul>
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

const content = () => (
	<React.Fragment>
		<Route exact path="/" component={Home} />
		<Route path="/store" component={Catagories} />
		<Route path="/about" component={About} />
	</React.Fragment>
);

const footer = () => <React.Fragment />;
const App = withLayout(navagationBar, content, footer);
export default App;
