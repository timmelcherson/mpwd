import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

// import PropTypes from 'prop-types';

import './WhiskyDashboard.css';

class WhiskyDashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentItem: props.item
		};
	}

	componentDidMount() {
		console.log('whisky mounted');
	}

	closeDashboard = () => {
		this.props.closeDashboardButtonCallback();
	};

	render() {
		const { currentItem } = this.state;
		return (
			<Fade>
				<section id='whisky-dashboard'>
					<div
						className='back-button'
						onClick={this.closeDashboard}
					/>

					<img id='dashboard-background-image' src='assets/images/paperbg.jpg' alt='' />

					<img
						id='dashboard-item-image'
						src={currentItem.img}
						alt=''
					/>

					<div id='dashboard-info-container'>
						<h2>{currentItem.name}</h2>
						<p>{currentItem.description}</p>
					</div>
				</section>
			</Fade>
		);
	}
}

WhiskyDashboard.propTypes = {};

export default WhiskyDashboard;
