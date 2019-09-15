import React, { Component } from 'react';
// import Fade from 'react-reveal/Fade';
import { CSSTransition } from 'react-transition-group';
// import PropTypes from 'prop-types';

import Navigation from './Navigation';
import './LandingPage.css';

class LandingPage extends Component {
	constructor(props) {
        super(props);
        
        this.state = {
            showLanding: true
        }
	}

	componentDidMount() {}

	render() {
		return (
			<CSSTransition
				in={this.state.showLanding}
				timeout={400}
				classNames='fade'
				unmountOnExit
				appear>
				<section id='landing-page-container'>
					<h1 id='main-page-header'>My Personal Whisky Diary</h1>

					<Navigation />
				</section>
			</CSSTransition>
		);
	}
}

LandingPage.propTypes = {};

export default LandingPage;
