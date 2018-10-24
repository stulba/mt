import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentCategory } from '../../redux/actions/categories';
import './Header.css';
import Logo from './Logo/Logo';
import Search from './Search/Search';
import Nav from './Nav/Nav';
import UserBar from './UserBar/UserBar';

class Header extends Component {
  state = {
    activePanelIndex: null
  };

  componentWillUnmount = () => {
    clearTimeout(this.openDelay);
    clearTimeout(this.closeDelay);
  };

  setCategory = category => {
    this.props.setCurrentCategory(category);
  };

  handleMouseEnter = e => {
    const target = parseInt(e.target.dataset.index, 10);

    if (this.openDelay) {
      clearTimeout(this.openDelay);
    }

    if (this.closeDelay) {
      clearTimeout(this.closeDelay);
    }

    if (target !== this.state.activePanelIndex) {
      this.openDelay = setTimeout(() => {
        if (target !== undefined) {
          this.setState({
            activePanelIndex: target
          });
        }
      }, 300);
    }
  };

  handleMouseOut = e => {
    if (this.openDelay) {
      clearTimeout(this.openDelay);
    }

    this.closeDelay = setTimeout(() => {
      this.setState({
        activePanelIndex: null
      });
    }, 100);
  };

  renderCategories = () => {
    const { categoriesLoaded, categories, category } = this.props;
    const { activePanelIndex } = this.state;
    let tabs;
    let panels;

    if (category && categoriesLoaded) {
      tabs = (
        <div className="sub-menu__tabs">
          {categories[category].sub.map((cat, i) => (
            <button
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseOut}
              key={cat.id}
              className={
                activePanelIndex === i
                  ? 'sub-menu__tab sub-menu__tab--active'
                  : 'sub-menu__tab'
              }
              data-index={i}
            >
              {cat.name}
            </button>
          ))}
        </div>
      );

      panels = categories[category].sub.map((cat, i) => {
        return (
          <div key={cat.id} className="sub-menu__panel">
            <div
              className={
                activePanelIndex === i
                  ? 'sub-menu-panel__item sub-menu-panel__item--active'
                  : 'sub-menu-panel__item'
              }
            >
              <div className="sub-menu-panel__backdrop" />
              <section className="sub-menu-panel__content">
                <div
                  onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseOut}
                  className="sub-menu-panel__main container"
                  data-index={i}
                >
                  <section>
                    <ul>
                      {cat.sub.map(sb => (
                        <li key={sb.id}>
                          <Link to={sb.url}>{sb.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </section>
            </div>
          </div>
        );
      });
    }

    return (
      <nav className="sub-menu">
        <div className="container">
          {tabs}
          {panels}
        </div>
      </nav>
    );
  };

  render() {
    const { category } = this.props;

    return (
      <header className="header">
        <div className="header__main">
          <div className="container">
            <div className="header__group">
              <Logo className="header__logo" />

              <Nav
                currentCategory={category}
                onSetCategory={this.setCategory}
              />
            </div>

            <div className="header__group">
              <Search />
            </div>

            <div className="header__group">
              <UserBar />
            </div>
          </div>
        </div>

        <div className="header__section">{this.renderCategories()}</div>
      </header>
    );
  }
}

const mapPropsFromState = state => ({
  category: state.categories.currentCategory
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentCategory
    },
    dispatch
  );

export default withRouter(
  connect(
    mapPropsFromState,
    mapDispatchToProps
  )(Header)
);
