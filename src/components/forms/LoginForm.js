import React from 'react'
import propTypes from "prop-types"
import InLineError from "../messages/InLineError"

class LoginForm extends React.Component {
	state ={
		data: {
			username:"",
			password: ""
		},
		loading: false,
		errors: {}

	};
	onChange = e =>
		this.setState({
			data:{...this.state.data,
				[e.target.name]: e.target.value},
		});

	onSubmit = e => {
		e.preventDefault();
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props
			.submit(this.state.data)
			.catch(err => {
				let error;
				if (!!err.response && !!err.response.data && !!err.response.data.errors ) {
					error = err.response.data.errors
				}else {
					error = ["unknown error"]
				}

				this.setState({
					errors: error,
					loading: false
				});
			});
		}
	};

	validate = (data) => {
		const errors = {};
		if (!data.username) errors.username = "Please provide username";
		if (!data.password) errors.password = "Please provide password";
		return errors;
	};

	render(){
		const { data, errors } = this.state;
		return(
			<form onSubmit={this.onSubmit} >
				<div className="login">
					{
						errors.global &&
						<div>
							<h1>Something went wrong</h1>
							<InLineError text={errors.global} />
						</div>
					}
					<input
						type="text"
						placeholder="Username"
						id="username"
						name="username"
						value={data.username}
						onChange={this.onChange}
					/>
					{errors.username && <InLineError text={errors.username} />}
					<input
						placeholder='Password'
						type='password'
						id="password"
						name="password"
						value={data.password}
						onChange={this.onChange}
					/>
					{errors.password && <InLineError text={errors.password} />}
					<input className="submit" type="submit" value="Login" />
				</div>
				<div className="shadow">hello</div> {/* text "hello" not showing just to satisfy eslint */}
			</form>
		);
	}
}

LoginForm.propTypes = {
	submit: propTypes.func.isRequired
};

export default LoginForm
