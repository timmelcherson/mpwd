import React, { Component } from 'react';
// import Fade from 'react-reveal/Fade';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
// import PropTypes from 'prop-types';

import Navigation from './navigation/Navigation';
import Collection from './collectionpage/Collection';
import FormSelector from './createnewitempage/FormSelector';
import './LandingPage.css';

class LandingPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			renderLandingPage: true,
			renderFormSelector: false,
			renderCollection: false
		};
	}

	componentDidMount() {
		console.log('Landing page mounted');
	}

	hideLandingCallback = () => {
		// let landing = document.getElementById('landing-page-container');
		// landing.style.display = 'none';
	};

	returnToLandingPageCallback = () => {
		// this.setState({
		// 	renderLandingPage: true,
		// 	renderFormSelector: false,
		// 	renderCollection: false
		// });

		let landing = document.getElementById('landing-page-container');
		landing.style.display = 'flex';
	};

	render() {
		const {
			renderLandingPage,
			renderFormSelector,
			renderCollection
		} = this.state;

		return (
			<Router>
				<CSSTransition
					in={this.state.renderLandingPage}
					timeout={400}
					classNames='fade'
					unmountOnExit
					appear>
					<section id='landing-page-container'>
						{/* <h1 id='main-page-header'>My Personal Whisky Diary</h1> */}

						<Route exact path='/' component={Navigation} />

						<Route
							exact
							path='/collection'
							component={props => (
								<Collection
									{...props}
									collectionProp='test collection'
									hideLandingCallback={
										this.hideLandingCallback
									}
								/>
							)}
						/>

						<Route
							exact
							path='/create-new'
							component={props => (
								<FormSelector
									{...props}
									itemProp='test item'
									hideLandingCallback={
										this.hideLandingCallback
									}
								/>
							)}
						/>
					</section>
				</CSSTransition>
			</Router>
		);
	}
}

LandingPage.propTypes = {};

export default LandingPage;
