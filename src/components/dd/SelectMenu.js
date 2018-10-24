import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';

import './SelectMenu.css';

class Dd extends Component {
  state = {
    listOpen: false
  };

  toggleList = e => {
    this.setState({
      listOpen: !this.state.listOpen
    });

    e.preventDefault();
  };

  handleClickOutside = () => {
    this.setState({
      listOpen: false
    });
  };

  handleClick = item => {
    const { onSetSort } = this.props;

    onSetSort(item);

    this.setState({
      listOpen: false
    });
  };

  renderList = () => {
    const { ddItems, children } = this.props;

    const items =
      ddItems &&
      ddItems.map(item => {
        return (
          <li key={item.id} className="dd__item">
            <span
              className={
                item.selected ? 'dd__link dd__link--selected' : 'dd__link dd'
              }
              onClick={this.handleClick.bind(this, item)}
              aria-current={item.selected}
            >
              {item.name}
            </span>
          </li>
        );
      });

    return <ul className="dd__list">{items ? items : children}</ul>;
  };

  render() {
    const { listOpen } = this.state;
    const { title } = this.props;

    return (
      <div className={listOpen ? 'dd dd--open' : 'dd'}>
        <div className="dd__header">
          <button
            onClick={this.toggleList}
            className="dd__button"
            aria-haspopup="true"
            aria-expanded={listOpen}
          >
            {title}
          </button>
        </div>
        <div className="dd__content">{this.renderList()}</div>
      </div>
    );
  }
}

export default onClickOutside(Dd);
