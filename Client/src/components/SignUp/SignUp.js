import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEmail from "validator/lib/isEmail";
import InlineError from "../../messages/InlineError";
import { Form, Button, Header, Icon, Container } from "semantic-ui-react";
import { signup } from "../../actions/users";

class SignUp extends Component {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
      confirm: ""
    },
    loading: false,
    errors: {}
  };
  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .signup(this.state.data)
        .then(() => this.props.history.push("/"))
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};

    if (!isEmail(data.email)) errors.email = "Invalid email";
    if (!data.name) errors.name = "Can't be blank";
    if (!data.password) {
      errors.password = "Can't be blank";
      errors.confirm = "Can't be blank";
    }
    if (data.password !== data.confirm)
      errors.confirm = "Password and confirm password should match";

    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    return (
      <Container text>
        <Form onSubmit={this.onSubmit} loading={loading}>
          <Header as="h2" icon textAlign="center">
            <Icon name="add user" circular />
            <Header.Content>Register</Header.Content>
          </Header>
          <Form.Group widths="equal">
            <Form.Field error={!!errors.name}>
              <label htmlFor="name">Full name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={data.name}
                onChange={this.onChange}
              />
              {errors.name && <InlineError text={errors.name} />}
            </Form.Field>
            <Form.Field error={!!errors.email}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email@email.com"
                value={data.email}
                onChange={this.onChange}
              />
              {errors.email && <InlineError text={errors.email} />}
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field error={!!errors.password}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Make it secure"
                value={data.password}
                onChange={this.onChange}
              />
              {errors.password && <InlineError text={errors.password} />}
            </Form.Field>
            <Form.Field error={!!errors.confirm}>
              <label htmlFor="confirm">Confirm Password</label>
              <input
                type="password"
                id="confirm"
                name="confirm"
                placeholder="Double Check It"
                value={data.confirm}
                onChange={this.onChange}
              />
              {errors.confirm && <InlineError text={errors.confirm} />}
            </Form.Field>
          </Form.Group>
          <Button primary>Create my Account</Button>
        </Form>
      </Container>
    );
  }
}

SignUp.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signup: PropTypes.func.isRequired
};

export default connect(null, { signup })(SignUp);
