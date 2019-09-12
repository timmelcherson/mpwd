import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './BackButton.css';

class BackButton extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	componentDidMount() {}

	test = () => {
		console.log('CLICK');
	};

	render() {
		return (
			<Link to='/' className={'back-to-home-button'} onClick={this.test}>
				Back
			</Link>
		);
	}
}

BackButton.propTypes = {};

export default BackButton;
