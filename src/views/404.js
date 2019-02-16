import React from 'react';
import { Link } from 'react-router-dom';
const NotFound = () => (
	<div>
		<h1>404 Page Not Found</h1>
		<Link to="/">
			<button className="btn btn-success">Go to Home Page</button>
		</Link>
	</div>
);

export default NotFound;
