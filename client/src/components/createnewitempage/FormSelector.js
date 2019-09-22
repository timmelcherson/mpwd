import React, { Component } from 'react';
// import Fade from 'react-reveal/Fade';
import { CSSTransition } from 'react-transition-group';
// import PropTypes from 'prop-types';

import './FormSelector.css';
import NewForm from './NewForm';
import BackButton from '../navigation/BackButton';

class Item extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showItemPage: true,
			renderSelector: true,
			formCategory: ''
		};
	}

	componentDidMount() {}

	componentDidUpdate() {
		console.log('componentDidUpdate');
	}

	handleClick = event => {
		let str;

		switch (event.target.id) {
			case 'select-new-beer':
				str = 'beer';
				break;

			case 'select-new-whisky':
				str = 'whisky';
				break;
		}

		console.log('selected: ' + str);

		this.setState({
			renderForm: true,
			renderSelector: false,
			formCategory: str
		});
	};

	closeFormCallback = () => {
		this.setState({
			renderSelector: true,
			renderForm: false
		});
	};

	render() {
		const { renderSelector, renderForm, formCategory } = this.state;

		if (renderForm) {
			return (
				<NewForm
					category={formCategory}
					closeFormButtonCallback={this.closeFormCallback}
				/>
			);
		}

		if (renderSelector) {
			return (
				<CSSTransition
					in={this.state.showItemPage}
					timeout={400}
					classNames='fade'
					unmountOnExit
					appear>
					<section id='item-container'>
						<BackButton url='/' />

						<div id='selector-inner-container'>
							<h2>What do you want to add?</h2>
							<p id='select-new-beer' onClick={this.handleClick}>
								New Beer
							</p>
							<p
								id='select-new-whisky'
								onClick={this.handleClick}>
								New Whisky
							</p>
						</div>
					</section>
				</CSSTransition>
			);
		}
	}
}

Item.propTypes = {};

export default Item;
