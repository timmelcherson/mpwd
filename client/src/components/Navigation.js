import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Fade from 'react-reveal/Fade';
// import PropTypes from 'prop-types';

import './Navigation.css';

class Navigation extends Component {
	// constructor(props) {
	//     super(props);
	// }

	componentDidMount() {
		// this.setInitialLink();
	}

	componentWillUnmount() {
		console.log('nav componentWillUnmount');
	}

	render() {
		return (
			<nav id='nav-link-container'>
				<Link to='/create-new' className={'nav-link'}>
					Create New Item
				</Link>
				<Link to='/collection' className={'nav-link'}>
					View Collection
				</Link>
			</nav>
		);
	}
}

Navigation.propTypes = {};

export default Navigation;
