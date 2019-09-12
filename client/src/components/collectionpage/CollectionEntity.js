import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import './CollectionEntity.css';

class CollectionEntity extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: props.name,
            score: props.score,
            img: props.img
		};
	}

	componentDidMount() {}

	render() {
        const {
            name,
            score,
            img
        } = this.state;

		return (
			<article className='collection-entity-container'>
				<img src={img} alt='' height='120px'  />

				<div className='collection-entity-text'>
					<h3>{name}</h3>
					<p>Score: {score}</p>
				</div>
			</article>
		);
	}
}

CollectionEntity.propTypes = {};

export default CollectionEntity;
