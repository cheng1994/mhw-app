import React from 'react';
import './index.css';

const DecorationList = ({ decorations }) => (
  <div className="decorationList">
    <h1 className="decorationList__title">Decoration List</h1>
    {
      Object.keys(decorations).map(key => {
        return <div key={key} className="decorationList__item">{decorations[key].name}</div>
      })
    }
  </div>
)

export default DecorationList;
