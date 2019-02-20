import React from 'react';
const Card = ({ label, imgUrl, children }) => {
	return (
		<div className="card" style={{ width: '18rem', margin: '2%' }}>
			<img
				src={imgUrl}
				className="card-img-top"
				alt="item"
				style={{ height: '55%' }}
			/>
			<div className="card-body">
				<h5 className="card-title">{label}</h5>
				{children}
			</div>
		</div>
	);
};

export default Card;
