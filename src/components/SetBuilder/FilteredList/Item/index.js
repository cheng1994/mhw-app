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
    <div className={`item__rarity item__rarity--${item.rarity}`}>Rarity {item.rarity}</div>
    {/* {
      !!item.assets &&
      <div className="item__imageContainer">
        <img src={item.assets.imageFemale}/>
        <img src={item.assets.imageMale}/>
      </div>
    } */}

    <div className="item__title">Skills</div>
    { !!item.skills &&
      Object.keys(item.skills).map(key => {
        return (<div className="item__text" key={key}>{splitSlug(item.skills[key].slug)}</div>)
      })
    }
    <div className="item__title">Stats</div>
    <div className="item__statsContainer">
    { !!item.attributes &&
      Object.keys(item.attributes).map(key => {
        return (
          key !== 'ammoCapacities' && !key.includes("slot") && !key.includes("sharpness") && !key.includes("hidden") &&
          <div key={key} className="item__textContainer">
            <div className="item__titleText">
              {
                (key.includes('resist') && key.replace(/^resist/g, 'Resist ')) ||
                (key.includes('element') && key.replace(/^element/g, 'Element ')) ||
                key
              }
            </div>
            <div className="item__text">{item.attributes[key]}</div>
          </div>
        )
      })
    }
    </div>
  </div>
);

export default Item;
