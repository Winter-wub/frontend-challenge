import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ item }) => {
	return (
		<div className="card" style={{ width: '18rem', margin: '2%' }}>
			<img
				src={item.imgUrl}
				className="card-img-top"
				alt={item.id}
				style={{ height: '55%' }}
			/>
			<div className="card-body">
				<h5 className="card-title">{item.label}</h5>
				<p className="card-text">{item.description}</p>
				<div>
					<Link to={item.url}>
						<button className="btn btn-primary">{item.price} ฿</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Card;
