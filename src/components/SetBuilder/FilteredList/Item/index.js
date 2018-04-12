import React from 'react';
import './item.css'

const splitSlug = (str) => {
  return str
    .split('-')
    .map(function(word) {
      return word[0].toUpperCase() + word.substr(1);
    })
    .join(' ');
}

const Item = ({ item }) => (
  <div className="item">
    <div className="item__cornerTop"></div>
    <div className="item__cornerBottom"></div>
    <div className="item__title item__title--center">{item.name}</div>
    <div className="item__title">Skills</div>
    { !!item.skills &&
      Object.keys(item.skills).map(key => {
        return (<div className="item__text" key={key}>{splitSlug(item.skills[key].slug)}</div>)
      })
    }
    <div className="item__title">Statistics</div>
  </div>
);

export default Item;
