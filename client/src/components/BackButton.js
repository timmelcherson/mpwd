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
			<Link to={this.props.url || '/'} className={'back-button'} onClick={this.test} />
		);
	}
}

BackButton.propTypes = {};

export default BackButton;
