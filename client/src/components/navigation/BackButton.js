import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './BackButton.css';

class BackButton extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	componentDidMount() {}

	render() {
		return (
			<Link
				to={this.props.url || '/'}
				className={'back-button'}
			/>
		);
	}
}

BackButton.propTypes = {};

export default BackButton;
