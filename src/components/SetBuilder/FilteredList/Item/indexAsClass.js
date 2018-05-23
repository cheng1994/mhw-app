import React, { Component } from 'react';
import './item.css'

const splitSlug = (str) => {
  return str
    .split('-')
    .map(function(word) {
      return word[0].toUpperCase() + word.substr(1);
    })
    .join(' ');
}

const modifiers = {
  "hammer": 5.2,
  "horn": 4.2,
  "switch-axe": 3.5,
  "great-sword": 4.8,
  "charge-blade": 3.6,
  "long-sword": 3.3,
  "insect-glaive": 3.1,
  "lance": 2.3,
  "gunlance": 2.3,
  "heavy-bowgun": 1.5,
  "sword-and-shield": 1.4,
  "dual-blades": 1.4,
  "light-bowgun": 1.3,
  "bow": 1.2
}

const INITIAL_STATE = {
  stats: {
    attack: 0,
    raw: 0,
    affinity: 0,
    elementDamage: 0,
    elementType: '',
    elderseal: '',
    sharpness: '',
    maxSharpness: '',
    defense: 0,
    resistFire: 0,
    resistWater: 0,
    resistThunder: 0,
    resistIce: 0,
    resistDragon: 0
  }
}

class Item extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentWillMount() {
    this.prepareStats();
  }

  prepareStats = () => {
    const {
      item
    } = this.props;

    let newStats = {
      attack: 0,
      raw: 0,
      affinity: 0,
      elementDamage: 0,
      elementType: '',
      elderseal: '',
      sharpness: '',
      maxSharpness: '',
      defense: 0,
      resistFire: 0,
      resistWater: 0,
      resistThunder: 0,
      resistIce: 0,
      resistDragon: 0
    };
    if(!!item.attributes) {
      if(!!item.attributes.defense) {
        newStats.defense += item.attributes.defense;
      }
      if(!!item.attributes.resistFire) {
        newStats.resistFire += item.attributes.resistFire;
      }
      if(!!item.attributes.resistWater) {
        newStats.resistWater += item.attributes.resistWater;
      }
      if(!!item.attributes.resistThunder) {
        newStats.resistThunder += item.attributes.resistThunder;
      }
      if(!!item.attributes.resistIce) {
        newStats.resistIce += item.attributes.resistIce;
      }
      if(!!item.attributes.resistDragon) {
        newStats.resistDragon += item.attributes.resistDragon;
      }
      if(!!item.attributes.attack) {
        newStats.attack = item.attributes.attack;
        newStats.raw = item.attributes.attack/modifiers[item.type];
      }
      if(!!item.attributes.elderseal) {
        newStats.elderseal = item.attributes.elderseal;
      }
      if(!!item.attributes.elementDamage) {
        newStats.elementDamage = item.attributes.elementDamage;
      }
      if(!!item.attributes.elementType) {
        newStats.elementType = item.attributes.elementType;
      }
      if(!!item.attributes.affinity) {
        newStats.affinity += item.attributes.affinity;
      }
      if(!!item.attributes.sharpnessRed) {
        newStats.sharpness += `
          <div
            style="width:${item.attributes.sharpnessRed/20}rem;"
            class="status__sharpness status__sharpness--red"></div>`;
        newStats.maxSharpness = 'red';
      }
      if(!!item.attributes.sharpnessOrange) {
        newStats.sharpness += `
          <div
            style="width:${item.attributes.sharpnessOrange/20}rem"
            class="status__sharpness status__sharpness--orange"></div>`;
        newStats.maxSharpness = 'orange';
      }
      if(!!item.attributes.sharpnessYellow) {
        newStats.sharpness += `
          <div
            style="width:${item.attributes.sharpnessYellow/20}rem"
            class="status__sharpness status__sharpness--yellow"></div>`;
        newStats.maxSharpness = 'yellow';
      }
      if(!!item.attributes.sharpnessGreen) {
        newStats.sharpness += `
          <div
            style="width:${item.attributes.sharpnessGreen/20}rem"
            class="status__sharpness status__sharpness--green"></div>`;
        newStats.maxSharpness = 'green';
      }
      if(!!item.attributes.sharpnessBlue) {
        newStats.sharpness += `
          <div
            style="width:${item.attributes.sharpnessBlue/20}rem"
            class="status__sharpness status__sharpness--blue"></div>`;
        newStats.maxSharpness = 'blue';
      }
      if(!!item.attributes.sharpnessWhite) {
        newStats.sharpness += `
          <div
            style="width:${item.attributes.sharpnessWhite/20}rem"
            class="status__sharpness status__sharpness--white"></div>`;
        newStats.maxSharpness = 'white';
      }
    }
    this.setState(() => ({ "stats": newStats }));
  }

  render() {
    const {
      item
    } = this.props;
    const {
      stats
    } = this.state;
    return (
      <div className="item">
        <div className="item__cornerTop"></div>
        <div className="item__cornerBottom"></div>
        <div className="item__title item__title--center">{item.name}</div>
        <div className={`item__rarity item__rarity--${item.rarity}`}>Rarity {item.rarity}</div>
        <div className="item__title">Skills</div>
        { !!item.skills &&
          Object.keys(item.skills).map(key => {
            return (<div className="item__text" key={key}>{splitSlug(item.skills[key].slug)}</div>)
          })
        }
        <div className="item__title">Stats</div>
        <div className="item__statsContainer">
        { !!stats &&
          Object.keys(stats).map(key => {
            return (
              key !== 'ammoCapacities' && stats[key] !== 0 && stats[key] !== '' &&
              <div key={key} className="item__textContainer">
                <div className="item__titleText">{key.replace(/^resist/g, 'Resist ')}</div>
                <div className="item__text">{item.attributes[key]}</div>
              </div>
            )
          })
        }
        </div>
      </div>
    )
  }
}

export default Item;
