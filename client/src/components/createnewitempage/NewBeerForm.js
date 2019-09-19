import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import './NewBeerForm.css';

class NewBeerForm extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	handleChange = event => {};

	handleFileSelect = event => {};

    handleScoreChange = event => {};
    
    closeForm = () => {
		this.props.closeFormButtonCallback();
	};

	render() {
		return (
			<section className='form-container'>
				<div className='back-button' onClick={this.closeForm} />

				<form
					id='new-beer-form'
					onSubmit={this.handleSubmit}
					encType='multipart/form-data'>
					<div className='new-beer-form-row'>
						<label className='new-beer-form-label'>
							Name of item
						</label>
						<input
							name='name'
							type='text'
							className='new-beer-form-input'
							onChange={this.handleChange}
						/>
					</div>
					<div className='new-beer-form-row'>
						<label className='new-beer-form-label'>
							Description
						</label>

						<textarea
							rows='4'
							name='description'
							className='new-beer-form-input'
							onChange={this.handleChange}
						/>
					</div>
					<div className='new-beer-form-row'>
						<label className='new-beer-form-label'>Score</label>
						<div className='new-beer-form-score-row'>
							<div
								id='new-beer-form-score-1'
								className='new-beer-form-score-box'
								onClick={this.handleScoreChange}>
								1
							</div>
							<div
								id='new-beer-form-score-2'
								className='new-beer-form-score-box'
								onClick={this.handleScoreChange}>
								2
							</div>
							<div
								id='new-beer-form-score-3'
								className='new-beer-form-score-box'
								onClick={this.handleScoreChange}>
								3
							</div>
							<div
								id='new-beer-form-score-4'
								className='new-beer-form-score-box'
								onClick={this.handleScoreChange}>
								4
							</div>
							<div
								id='new-beer-form-score-5'
								className='new-beer-form-score-box'
								onClick={this.handleScoreChange}>
								5
							</div>
						</div>
					</div>

					<input
						id='new-beer-form-submit-button'
						type='submit'
						value='Submit'
					/>
				</form>
			</section>
		);
	}
}

NewBeerForm.propTypes = {};

export default NewBeerForm;
