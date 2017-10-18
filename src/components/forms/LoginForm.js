import React from "react";
import { Form, Button } from "semantic-ui-react";
import Propotypes from "prop-types";
import InLineError from "../messages/InLineError";

class LoginForm extends React.Component {
  state = {
    data: {
      username: '',
      password: ''
    },
    loading: false,
    errors: {}

  };

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors })
    if (Object.keys(errors).lenght === 0) {
      this.props.submit(this.state.data);
    }
  }


  onChange = (e) => this.setState({
    data:{...this.state.data, [e.target.name]: e.target.value
  }});


  validate = (data) => {
    const errors = {}
    if (!data.username) errors.username = "Username can't be blank"
    if (!data.password) errors.password = "Password can't be blank"

    return errors
  }

  render() {
    const {data, errors, loading} = this.state;
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
        <br />
        <Button primary>Login</Button>

      </Form>
      );
    }
  }

LoginForm.propTypes = {
  submit: Propotypes.func.isRequired
}

export default LoginForm;
