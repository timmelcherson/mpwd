import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import Reveal from 'react-reveal/Reveal';
// import { CSSTransition } from 'react-transition-group';
// import PropTypes from 'prop-types';

import './Collection.css';
// import CollectionEntity from './CollectionEntity';
import WhiskyDashboard from './whiskydashboard/WhiskyDashboard';
import BackButton from '../BackButton';

const ListEntity = props => {
	return (
		<Reveal effect="fadeInUp">
			<article
				id={`list-item-${props.index}`}
				className='collection-entity-container'
				onClick={() => props.onClick(props.index)}>
				<img
					src={props.img}
					alt=''
					className='collection-entity-thumbnail'
				/>

				<div className='collection-entity-text'>
					<h3>{props.name}</h3>
					<p>Score: {props.score}</p>
				</div>
			</article>
		</Reveal>
	);
};

class Collection extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			entities: [],
			renderList: true,
			renderDashboard: false,
			sendToDashboard: null
		};
	}

	componentDidMount() {
		this.sendToParent();

		fetch('api/whiskies')
			.then(response => response.json())
			.then(data => {
				let entities = [];

				data.map(entity => {
					entities.push(entity);
					return null;
				});

				this.setState({
					isLoading: false,
					entities: entities
				});
				return data;
			})
			.catch((err, response) => {
				console.log(err, response);
			});
	}

	componentWillUnmount() {
		this.props.hideNavCallback(false);
	}

	sendToParent = () => {
		this.props.hideNavCallback(true);
	};

	closeDashboardCallback = () => {
		this.setState({
			renderList: true,
			renderDashboard: false
		});
	};

	handleListClick = index => {
		console.log('ID: ' + this.state.entities[index]._id);

		this.setState({
			renderList: false,
			renderDashboard: true,
			sendToDashboard: this.state.entities[index]
		});
	};

	renderList = () => {
		return this.state.entities.map((entity, index) => {
			return (
				<ListEntity
					name={entity.name}
					score={entity.score}
					img={entity.img}
					index={index}
					key={index}
					onClick={this.handleListClick}
				/>
			);
		});
	};

	render() {
		const {
			isLoading,
			renderList,
			renderDashboard,
			sendToDashboard
		} = this.state;

		if (isLoading) {
			return (
				<div className='loading-screen'>
					<p>Loading...</p>
				</div>
			);
		}

		if (renderDashboard) {
			return (
				<WhiskyDashboard
					closeDashboardButtonCallback={this.closeDashboardCallback}
					item={sendToDashboard}
				/>
			);
		}

		if (renderList) {
			return (
				<Fade>
					<section id='collection-container'>
						<BackButton url='/' />

						<div id='collection-list'>{this.renderList()}</div>
					</section>
				</Fade>
			);
		}
	}
}

Collection.propTypes = {};

export default Collection;
