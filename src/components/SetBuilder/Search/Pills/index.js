import React from 'react';
import './index.css'

const Pills  = (props) => {
  const {
    filters,
    callbackFromParent
  } = props;

  const clearFilter = (key) => {
    filters[key] = '';
    callbackFromParent(key);
  }

  return (
    <div className="pill__container">
      {
        Object.keys(filters).map(key => {
          if(filters[key]) {
            return <div className="pill" key={key} onClick={event => clearFilter(key)}>{ filters[key] } <span className="pill__close">X</span></div>
          }
          return null;
        })
      }
    </div>
  )
};

export default Pills;
