import React from "react";
import PropTypes from 'prop-types'
import { connect } from "react-redux"

import LoginForm from "../forms/LoginForm";
import { login } from "../../actions";


class LoginPage extends  React.Component{
	
	submit = data =>
		this.props.login(data).then(() =>{
				if (this.props.user.isAuthenticated) {
					this.props.history.push("/")
				}
				this.props.history.push("/login")
				
			}
		);
	
	render(){
		console.log(">>: ", this.props.user );
		const { user } = this.props;
		return(
			<div>
				{(user.username && !user.isAuthenticated) && <div className={"massage"}>
                    <h1>Something went wrong</h1>
                    <span style={{color: 'red'}}>fail to login</span>
                </div>}
				<LoginForm submit={this.submit} />
			</div>
		);
	}
}

LoginPage.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	login: PropTypes.func.isRequired
};

export default connect(store => ({
	user: store.user.user
}), { login })(LoginPage);
