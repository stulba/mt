import React, { Component } from 'react';
import './Carousel.css';

export default class Carousel extends Component {
  state = {
    target: 0,
    fullSize: false
  };

  handleFullSize = ({ target }) => {
    const { fullSize } = this.state;

    if (target.name === 'close') {
      this.props.handleZoomIn(false);
      this.setState({
        fullSize: false
      });
    } else if (!fullSize) {
      this.props.handleZoomIn(true);
      this.setState({
        fullSize: true
      });
    }
  };

  handleNext = e => {
    const target = parseInt(e.target.dataset.id, 10);

    this.setState({
      target
    });
  };

  moveNext = () => {
    const { items } = this.props;
    let { target } = this.state;

    target = target < items.length - 1 ? target + 1 : 0;

    this.setState({
      target: target
    });
  };

  moveBack = () => {
    const { items } = this.props;
    let { target } = this.state;

    target = target > 0 ? target - 1 : items.length - 1;

    this.setState({
      target: target
    });
  };

  render() {
    const { items } = this.props;
    const { target, fullSize } = this.state;

    const activeFrame = (
      <div className="carousel__main">
        {fullSize && (
          <button
            name="close"
            onClick={this.handleFullSize}
            className="carousel__close"
          />
        )}

        <button onClick={this.moveBack} className="carousel__prev" />
        <button onClick={this.moveNext} className="carousel__next" />
        <img onClick={this.handleFullSize} src={items[target].full} alt="" />
      </div>
    );

    const frames = (
      <div className="carousel__frames">
        {items.map((item, i) => {
          return (
            <section
              key={item.thumbnail}
              className={
                i === target
                  ? 'carousel__frame carousel__frame--active'
                  : 'carousel__frame'
              }
            >
              <img
                onClick={this.handleNext}
                src={item.thumbnail}
                alt=""
                data-id={i}
              />
            </section>
          );
        })}
      </div>
    );

    return (
      <section className="carousel">
        {activeFrame}
        {frames}
      </section>
    );
  }
}
