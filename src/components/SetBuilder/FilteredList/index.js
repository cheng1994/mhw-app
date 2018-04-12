import React from 'react';
import './index.css';

import Item from './Item';

const FilteredList = (props) => {
  const {
    filteredItems,
    callbackFromParent
  } = props;

  return (
    <div className="filteredList">
      {
        Object.keys(filteredItems).map(key => {
          return (
            <div key={key} onClick={event => callbackFromParent(filteredItems[key])} className="filteredList__item">
              <Item item={filteredItems[key]} />
            </div>
          )
        })
      }
    </div>
  )
}

export default FilteredList
