import React from 'react';
import './filtered-list.css';

import Item from './Item';

const FilteredList = ({ filteredItems }) => (
  <div className="filteredList">
    {
      Object.keys(filteredItems).map(key => {
        return <Item item={filteredItems[key]} key={key} />
      })
    }
  </div>
)

export default FilteredList
