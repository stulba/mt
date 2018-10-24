import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/UI';
import { Input } from '../components/UI/Form/Input';
import { Users } from '../client/api';
import * as Button from '../components/UI/Button/Button';

class Register extends Component {
  state = {
    user: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    errors: []
  };

  onChange = e => {
    const updUser = {
      ...this.state.user,
      [e.target.name]: e.target.value
    };

    this.setState({
      user: updUser
    });
  };

  handleSubmit = e => {
    const userData = this.state.user;
    const err = this.validation(userData);

    if (!err) {
      Users.addOne(userData).then(res => {
        if (res.ok) {
          this.props.history.push({
            pathname: '/login'
          });
        }
      });
    }

    e.preventDefault();
  };

  validation = data => {
    const errors = [];
    let err = false;

    const validateEmail = email => {
      const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

      return !re.test(String(email).toLowerCase());
    };

    if (data.email === '' || data.password === '') {
      errors.push('Please, enter your email and password');
      err = true;
    } else if (data.password.length < 6) {
      errors.push('Password should have at least 6 characters.');
      err = true;
    } else if (validateEmail(data.email)) {
      errors.push('Check email');
      err = true;
    } else if (data.confirmPassword !== data.password) {
      errors.push('Password does not match');
      err = true;
    }

    this.setState({
      errors
    });

    return err;
  };

  render() {
    const { errors } = this.state;
    return (
      <Container>
        <div className="register">
          <div className="register__holder">
            {errors &&
              errors.map((err, i) => (
                <div className="error-message" key={i}>
                  {err}
                </div>
              ))}

            <form onSubmit={this.handleSubmit} className="register__form form">
              <h1>Sign Up</h1>

              <div className="form__group">
                <Input
                  onChange={this.onChange}
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={this.state.user.email}
                />
              </div>
              <div className="form__group">
                <Input
                  onChange={this.onChange}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.user.password}
                />
              </div>

              <div className="form__group">
                <Input
                  onChange={this.onChange}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={this.state.user.confirmPassword}
                />
              </div>

              <div className="form__group">
                <Button.Primary text="Register" />
              </div>
            </form>
          </div>
          <Link to="/login">Log In</Link>
        </div>
      </Container>
    );
  }
}

export default Register;
