import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import Signin from './signinsignup/Signin';
import SignUp from './signinsignup/Signup';

class FrontPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			renderSignin: true
		};
	}

    componentDidMount() {}
    
    signinCallback = value => {
		this.props.signinCallback(value);
	};

	switch = () => {
		this.setState({
			renderSignin: !this.state.renderSignin
		});
	};

	render() {
		const { renderSignin } = this.state;

		return (
			<div>
				{renderSignin ? <Signin signinCallback={this.signinCallback} /> : <SignUp />}

				<button onClick={this.switch}>
					{renderSignin ? (
						<p>Not registered? Sign Up!</p>
					) : (
						<p>Back to Sign In</p>
					)}
				</button>
			</div>
		);
	}
}

FrontPage.propTypes = {};

export default FrontPage;
