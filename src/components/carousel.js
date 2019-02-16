import React from 'react';

const Carousel = (items = [], height = 300, width = 300) => {
	const indicators = itemLenght => {
		let indicator = [];
		for (let index = 0; index < itemLenght; index++) {
			if (index === 0) {
				indicator.push(
					<li
						key={index}
						data-target="#carouselComponent"
						data-slide-to="0"
						className="active"
					/>,
				);
			} else {
				indicator.push(
					<li
						data-target="#carouselComponent"
						data-slide-to={index}
						key={index}
					/>,
				);
			}
		}

		return <ol className="carousel-indicators">{indicator}</ol>;
	};

	const carouselItems = rawItems => {
		let items = rawItems.map((item, index) => {
			if (index >= 1) {
				return (
					<div className="carousel-item" key={index}>
						<img src={item.img} alt={item.label} style={{ height, width }} />
						<div className="carousel-caption">
							<h5>{item.label}</h5>
							<p>{item.description}</p>
						</div>
					</div>
				);
			} else {
				return (
					<div className="carousel-item active" key={index}>
						<img src={item.img} alt={item.label} style={{ height, width }} />
						<div className="carousel-caption">
							<h5>{item.label}</h5>
							<p>{item.description}</p>
						</div>
					</div>
				);
			}
		});
		return items;
	};

	return (
		<div id="carouselComponent" className="carousel slide" data-ride="carousel">
			{indicators(items.length)}
			<div className="carousel-inner">{carouselItems(items)}</div>
			<a
				className="carousel-control-prev"
				href="#carouselComponent"
				role="button"
				data-slide="prev"
			>
				<span
					className="carousel-control-prev-icon"
					aria-hidden="true"
					style={{ backgroundColor: 'black', borderRadius: '50%' }}
				/>
				<span className="sr-only">Previous</span>
			</a>
			<a
				className="carousel-control-next"
				href="#carouselComponent"
				role="button"
				data-slide="next"
			>
				<span
					className="carousel-control-next-icon"
					aria-hidden="true"
					style={{ backgroundColor: 'black', borderRadius: '50%' }}
				/>
				<span className="sr-only">Next</span>
			</a>
		</div>
	);
};

export default Carousel;
