import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FaSignInAlt } from 'react-icons/fa';
import './UserBar.css';
import CartFeatures from '../../Cart/CartFeatures';
import { logOut } from '../../../redux/actions/user';

class UserBar extends Component {
  constructor(props) {
    super(props);

    this.dropHeaderref = React.createRef();
    this.dropListref = React.createRef();
  }

  state = {
    isMenuOpen: false,
    links: [
      {
        id: 0,
        name: 'Dashboard',
        url: '/user/dashboard'
      },
      {
        id: 1,
        name: 'Logout',
        url: '/user/logout'
      }
    ]
  };

  componentWillUnmount = () => {
    clearTimeout(this.closeMenuDelay);
  };

  closeMenuInstantly = () => {
    this.setState({
      isMenuOpen: false
    });
  };

  logOut = e => {
    this.closeMenuInstantly();

    this.props.logOut();
    e.preventDefault();
  };

  openMenu = e => {
    clearTimeout(this.closeMenuDelay);

    this.setState({
      isMenuOpen: true
    });
  };

  closeMenu = e => {
    this.closeMenuDelay = setTimeout(() => {
      this.setState({
        isMenuOpen: false
      });
    }, 200);
  };

  render() {
    const { userIsLoggedIn, currentUser } = this.props;
    const { isMenuOpen } = this.state;

    return (
      <div className="user-bar">
        <div className="user-bar__item">
          <CartFeatures />
        </div>

        <div className="user-bar__item">
          {userIsLoggedIn ? (
            <div className={isMenuOpen ? 'user-dd user-dd--open' : ' dd'}>
              <div
                onMouseEnter={this.openMenu}
                onMouseLeave={this.closeMenu}
                className="user-dd__header"
              >
                <img
                  className={
                    isMenuOpen
                      ? 'user-bar__avatar user-bar__avatar--active'
                      : 'user-bar__avatar'
                  }
                  src={currentUser.avatar}
                  alt={currentUser.name}
                />
              </div>
              <div
                onMouseEnter={this.openMenu}
                onMouseLeave={this.closeMenu}
                className="user-dd__content"
              >
                <div className="user-features">
                  <p className="user-features__name">{currentUser.name}</p>
                </div>
                <ul className="user-dd__list">
                  <li className="user-dd__item">
                    <Link onClick={this.closeMenuInstantly} to={`/dashboard`}>
                      Dashboard
                    </Link>
                  </li>
                  <li className="user-dd__item">
                    <Link onClick={this.logOut} to={`/logout`}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link className="user-bar__link" to="/login">
              <FaSignInAlt />
            </Link>
          )}
        </div>
      </div>
    );
  }
}

const mapPropsFromState = state => ({
  userIsLoggedIn: state.user.isLoggedIn,
  currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logOut
    },
    dispatch
  );
export default connect(
  mapPropsFromState,
  mapDispatchToProps
)(UserBar);
