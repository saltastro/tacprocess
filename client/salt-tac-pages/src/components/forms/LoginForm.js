import React from "react";
import propTypes from "prop-types"

import {Form, Button, Message} from "semantic-ui-react";

import InLineError from "../massages/InLineError"

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

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = (data) => {
    const errors = {};
    if (!data.username) errors.username = "Please provide username";
    if (!data.password) errors.password = "Please provide password";
    return errors;
  }

  render(){
    const { data, errors, loading } = this.state;
    return(
      <Form onSubmit={this.onSubmit} loading={loading}>


        <Form.Field error={!!errors.username}>
          <label htmlFor="username">Username</label>
          <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={data.username}
              onChange={this.onChange} />
        </Form.Field>
        {errors.username && <InLineError text={errors.username} />}
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input
              type="password"
              id="password"
              name="password"
              placeholder="make it secure"
              value={data.password}
              onChange={this.onChange} />
        </Form.Field>
        {errors.password && <InLineError text={errors.password} />}
        <Button primary> Login </Button>
        {errors.global && <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>}
      </Form>
    );
  }
}
LoginForm.propTypes = {
  submit: propTypes.func.isRequired
};
export default LoginForm;
