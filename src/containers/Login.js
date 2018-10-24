import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logIn } from '../redux/actions/user';
import { Container } from '../components/UI';
import { Input } from '../components/UI/Form/Input';
import * as Button from '../components/UI/Button/Button';
import { fakeAuth } from '../client/fakeAuth';
import { Users } from '../client/api';

class Login extends Component {
  state = {
    user: {
      email: '',
      password: ''
    },
    errors: [],
    redirectToReferrer: false
  };

  _isMounted = false;

  componentDidMount = () => {
    this._isMounted = true;
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({
        redirectToReferrer: true
      });
    });
  };

  handleSubmit = e => {
    const { logIn } = this.props;
    const userData = this.state.user;
    const err = this.validation(userData);

    if (!err) {
      Users.getOne(userData).then(user => {
        if (user[0]) {
          this.login();
          logIn(user[0]);
        } else {
          if (this._isMounted) {
            this.setState({
              errors: this.state.errors.concat('Check email or password')
            });
          }
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
    }

    this.setState({
      errors
    });

    return err;
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

  render() {
    const { email, password } = this.state.user;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer, errors } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <Container>
        <div className="login">
          <h1>Login</h1>
          {errors &&
            errors.map((err, i) => (
              <div className="error-message" key={i}>
                {err}
              </div>
            ))}
          <div className="login__holder">
            <form className="login__form form" onSubmit={this.handleSubmit}>
              <div className="form__group">
                <Input
                  onChange={this.onChange}
                  type="text"
                  name="email"
                  placeholder="sarah@mail.com"
                  value={email}
                />
              </div>

              <div className="form__group">
                <Input
                  onChange={this.onChange}
                  type="password"
                  name="password"
                  placeholder="654321"
                  value={password}
                />
              </div>

              <div className="form__group">
                <Button.Primary text="Log In" />
              </div>
            </form>

            <Link to="/register">Create an Account</Link>
          </div>
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logIn
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(Login);
