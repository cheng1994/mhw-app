import React from 'react';
import './index.css';

const DecorationList = ({ decorations }) => (
  <div className="decorationList">
    <h1 className="decorationList__title">Decoration List</h1>
    {
      Object.keys(decorations).map(key => {
        return (
          <div key={key} className="decorationList__slotRank">
            <div className="decorationList__title--slot">{
              (key === 'slotsRank1' && decorations[key].length > 0 && 'Rank 1') ||
              (key === 'slotsRank2' && decorations[key].length > 0 && 'Rank 2') ||
              (key === 'slotsRank3' && decorations[key].length > 0 && 'Rank 3')
            }</div>
            {
              Object.keys(decorations[key]).map(slotKey => {
                return <div key={`slot-${slotKey}`} className="decorationList__item">{decorations[key][slotKey].name}</div>
              })
            }
          </div>
        )
      })
    }
  </div>
)

export default DecorationList;
