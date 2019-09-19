import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import './NewWhiskyForm.css';

class ItemForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			description: '',
			score: 0,
			whiskyImage: '',
			date: '',
			whiskyAdded: false,
			previousScoreId: ''
		};
	}

	componentDidMount() {
		this._isMounted = true;
	}

	handleChange = event => {
		const target = event.target;
		const name = target.name;
		this.setState({ [name]: target.value });
	};

	handleFileSelect = event => {
		console.log(event.target.files[0]);
		this.setState({
			whiskyImage: event.target.files[0]
		});
	};

	handleScoreChange = event => {
		if (this.state.previousScoreId !== '') {
			let previousScoreElement = document.getElementById(
				this.state.previousScoreId
			);
			// previousScoreElement.style.transform = 'scale(1)';
			previousScoreElement.classList.remove('selected-score');
		}

		event.target.classList.add('selected-score');

		this.setState({
			score: event.target.innerHTML,
			previousScoreId: event.target.id
		});
	};

	handleSubmit = event => {
		// Prevent page refresh
		event.preventDefault();

		const { name, description, score, whiskyImage } = this.state;

		const formData = new FormData();
		formData.append('name', name);
		formData.append('description', description);
		formData.append('score', score);
		formData.append('whiskyImage', whiskyImage);
		formData.append('date', new Date());

		fetch('/api/whiskies', {
			method: 'POST',
			body: formData
		})
			.then(res => res.clone().json())
			.then(res => {
				if (res.success) {
					console.log('Res success');
					this.setState({
						whiskyAdded: true
					});

					// Reset whisky added state to false if component remains active after 3 seconds
					setTimeout(() => {
						// Verify if component is still mounted
						if (this._isMounted) {
							this.setState({
								whiskyAdded: false
							});
						}
					}, 3000);
				} else {
					console.log('Failed with message: ' + res.message);
				}
			})
			.catch(err => console.log('Error when adding whisky' + err));
	};

	render() {
		return (
			<form
				id='new-whisky-form'
				onSubmit={this.handleSubmit}
				encType='multipart/form-data'>
				<div className='new-whisky-form-row'>
					<label className='new-whisky-form-label'>Name of item</label>
					<input
						name='name'
						type='text'
						value={this.state.name}
						className='new-whisky-form-input'
						onChange={this.handleChange}
					/>
				</div>
				<div className='new-whisky-form-row'>
					<label className='new-whisky-form-label'>Description</label>

					<textarea
						rows='4'
						name='description'
						className='new-whisky-form-input'
						value={this.state.value}
						onChange={this.handleChange}
					/>
				</div>
				<div className='new-whisky-form-row'>
					<label className='new-whisky-form-label'>Score</label>
					<div className='new-whisky-form-score-row'>
						<div
							id='new-whisky-form-score-1'
							className='new-whisky-form-score-box'
							onClick={this.handleScoreChange}>
							1
						</div>
						<div
							id='new-whisky-form-score-2'
							className='new-whisky-form-score-box'
							onClick={this.handleScoreChange}>
							2
						</div>
						<div
							id='new-whisky-form-score-3'
							className='new-whisky-form-score-box'
							onClick={this.handleScoreChange}>
							3
						</div>
						<div
							id='new-whisky-form-score-4'
							className='new-whisky-form-score-box'
							onClick={this.handleScoreChange}>
							4
						</div>
						<div
							id='new-whisky-form-score-5'
							className='new-whisky-form-score-box'
							onClick={this.handleScoreChange}>
							5
						</div>
					</div>
				</div>
				<div className='new-whisky-form-row'>
					<label className='new-whisky-form-label'>Image</label>

					<input
						id='new-whisky-form-image-input'
						name='whiskyImage'
						className='new-whisky-form-input'
						type='file'
						onChange={this.handleFileSelect}
					/>
				</div>
				<input
					id='new-whisky-form-submit-button'
					type='submit'
					value='Submit'
				/>
			</form>
		);
	}
}

ItemForm.propTypes = {};

export default ItemForm;
