import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import './CollectionEntity.css';
import WhiskyDashboard from './whiskydashboard/WhiskyDashboard';

class CollectionEntity extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: props.name,
			score: props.score,
			img: props.img,
			index: props.index,
			renderWhiskyDashboard: false

		};
	}


	onEntityClick = () => {
		console.log("Entity item clicked");

		this.props.onClickCallback();
	};

	render() {
		const { name, score, img, index, renderWhiskyDashboard } = this.state;

		if (renderWhiskyDashboard) {
			return <WhiskyDashboard />;
		} 
		else {
			return (
				<article
					id={`list-item-${index}`}
					className='collection-entity-container'
					onClick={this.onEntityClick}>
					<img src={img} alt='' className='collection-entity-thumbnail' />
	
					<div className='collection-entity-text'>
						<h3>{name}</h3>
						<p>Score: {score}</p>
					</div>
				</article>
			);
		}
	}
}

CollectionEntity.propTypes = {};

export default CollectionEntity;
