import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './App.css';
import { getCategories } from '../../redux/actions/categories';
import Header from '../Header/Header';
import PrivateRoute from './PrivateRoute';
import { Container } from '../UI';
import Home from '../../containers/Home';
import Login from '../../containers/Login';
import Register from '../../containers/Register';
import CartContainer from '../../containers/CartContainer';
import UserProfileContainer from '../../containers/UserProfileContainer';
import ProductsListContainer from '../../containers/ProductsListContainer';
import ProductInfoContainer from '../../containers/ProductInfoContainer';

class App extends Component {
  componentDidMount = () => {
    this.props.getCategories();
  };

  render() {
    const { categoriesLoaded, categories } = this.props;

    return (
      <div className="app">
        <Header categoriesLoaded={categoriesLoaded} categories={categories} />

        <div className="main">
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateRoute
                path="/dashboard"
                component={UserProfileContainer}
              />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/cart" component={CartContainer} />
              <Route
                path="/:gender/:category/:id"
                component={ProductInfoContainer}
              />
              <Route
                path="/:gender/:category"
                component={ProductsListContainer}
              />
              {/* <Route path="/:gender" component={ShowcaseContainer} /> */}
            </Switch>
          </Container>
        </div>
      </div>
    );
  }
}

const mapPropsFromState = state => ({
  categoriesLoaded: state.categories.categoriesLoaded,
  categories: state.categories.categories,
  selectedGender: state.categories.currentCategory
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCategories
    },
    dispatch
  );
export default withRouter(
  connect(
    mapPropsFromState,
    mapDispatchToProps
  )(App)
);
