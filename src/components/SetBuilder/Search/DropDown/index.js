import React, { Component } from 'react';
import './index.css';

const INITIAL_STATE = {
  showList: false,
  error: null
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class DropDown extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  handleClick = (item) => {
    this.props.callbackFromParent(item);
    this.setState(byPropKey('showList', false));
  }

  renderList = () => {
    const {
      items
    } = this.props;

    return (
      <div className="dropDown__list">
        {
          Object.keys(items).map(key => {
            return (
              <div
                className="dropDown__listItem"
                key={key}
                onClick={event => this.handleClick(items[key])}
              >{items[key]}</div>
            )
          })
        }
      </div>
    )
  }

  render() {
    const {
      filter,
      index
    } = this.props;

    const {
        showList
    } = this.state;

    return (
      <div className="dropDown" tabIndex={index} onBlur={event => this.setState(byPropKey('showList', false))}>
        <div
          className="dropDown__title"
          onClick={event => this.setState(byPropKey('showList', true))}
        >{filter}</div>
        { showList && this.renderList()}
      </div>
    )
  }
}

export default DropDown;
