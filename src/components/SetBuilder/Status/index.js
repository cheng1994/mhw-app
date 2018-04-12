import React, { Component } from 'react';
import './index.css'

const INITIAL_STATE = {
  status: {
    health: 100,
    stamina: 100,
    attack: {
      attack: 0,
      raw: 0,
      affinity: 0,
      elementDamage: 0,
      elementType: '',
      elderseal: '',
      sharpness: '',
      maxSharpness: ''
    },
    defense: {
      defense: 0,
      resistFire: 0,
      resistWater: 0,
      resistThunder: 0,
      resistIce: 0,
      resistDragon: 0
    }
  },
  selectedItems: {}
};

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

const sharpnessModifiers = {
  raw: {
    white: 1.32,
    blue: 1.20,
    green: 1.05,
    yellow: 1.00,
    orange: 0.75,
    red: 0.50
  },
  elemental: {
    white: 1.125,
    blue: 1.0625,
    green: 1.00,
    yellow: 0.75,
    orange: 0.50,
    red: 0.25
  }
}

class Status extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE };

  }

  componentWillReceiveProps(newProps) {
    if(JSON.stringify(newProps.selectedItems) !== JSON.stringify(this.props.selectedItems)) {
      this.setState(() => ({ "selectedItems": newProps.selectedItems }), () => {
        this.calculateStats();
      })
    }
  }

  calculateStats = () => {
    const {
      selectedItems
    } = this.state;

    let newStats = {
      health: 100,
      stamina: 100,
      attack: {
        attack: 0,
        raw: 0,
        affinity: 0,
        elementDamage: 0,
        elementType: '',
        elderseal: '',
        sharpness: '',
        maxSharpness: '',

      },
      defense: {
        defense: 0,
        resistFire: 0,
        resistWater: 0,
        resistThunder: 0,
        resistIce: 0,
        resistDragon: 0
      }
    };
    for(var key in selectedItems) {
      if(!!selectedItems[key].attributes) {
        if(!!selectedItems[key].attributes.defense) {
          newStats.defense.defense += selectedItems[key].attributes.defense;
        }
        if(!!selectedItems[key].attributes.resistFire) {
          newStats.defense.resistFire += selectedItems[key].attributes.resistFire;
        }
        if(!!selectedItems[key].attributes.resistWater) {
          newStats.defense.resistWater += selectedItems[key].attributes.resistWater;
        }
        if(!!selectedItems[key].attributes.resistThunder) {
          newStats.defense.resistThunder += selectedItems[key].attributes.resistThunder;
        }
        if(!!selectedItems[key].attributes.resistIce) {
          newStats.defense.resistIce += selectedItems[key].attributes.resistIce;
        }
        if(!!selectedItems[key].attributes.resistDragon) {
          newStats.defense.resistDragon += selectedItems[key].attributes.resistDragon;
        }
        if(!!selectedItems[key].attributes.attack) {
          newStats.attack.attack = selectedItems[key].attributes.attack;
          newStats.attack.raw = selectedItems[key].attributes.attack/modifiers[selectedItems[key].type]
        }
        if(!!selectedItems[key].attributes.elderseal) {
          newStats.attack.elderseal = selectedItems[key].attributes.elderseal;
        }
        if(!!selectedItems[key].attributes.elementDamage) {
          newStats.attack.elementDamage = selectedItems[key].attributes.elementDamage;
        }
        if(!!selectedItems[key].attributes.elementType) {
          newStats.attack.elementType = selectedItems[key].attributes.elementType;
        }
        if(!!selectedItems[key].attributes.affinity) {
          newStats.attack.affinity += selectedItems[key].attributes.affinity;
        }
        if(!!selectedItems[key].attributes.sharpnessRed) {
          newStats.attack.sharpness += `
            <div
              style="width:${selectedItems[key].attributes.sharpnessRed/20}rem;"
              class="status__sharpness status__sharpness--red"></div>`;
          newStats.attack.maxSharpness = 'red';
        }
        if(!!selectedItems[key].attributes.sharpnessOrange) {
          newStats.attack.sharpness += `
            <div
              style="width:${selectedItems[key].attributes.sharpnessOrange/20}rem"
              class="status__sharpness status__sharpness--orange"></div>`;
          newStats.attack.maxSharpness = 'orange';
        }
        if(!!selectedItems[key].attributes.sharpnessYellow) {
          newStats.attack.sharpness += `
            <div
              style="width:${selectedItems[key].attributes.sharpnessYellow/20}rem"
              class="status__sharpness status__sharpness--yellow"></div>`;
          newStats.attack.maxSharpness = 'yellow';
        }
        if(!!selectedItems[key].attributes.sharpnessGreen) {
          newStats.attack.sharpness += `
            <div
              style="width:${selectedItems[key].attributes.sharpnessGreen/20}rem"
              class="status__sharpness status__sharpness--green"></div>`;
          newStats.attack.maxSharpness = 'green';
        }
        if(!!selectedItems[key].attributes.sharpnessBlue) {
          newStats.attack.sharpness += `
            <div
              style="width:${selectedItems[key].attributes.sharpnessBlue/20}rem"
              class="status__sharpness status__sharpness--blue"></div>`;
          newStats.attack.maxSharpness = 'blue';
        }
        if(!!selectedItems[key].attributes.sharpnessWhite) {
          newStats.attack.sharpness += `
            <div
              style="width:${selectedItems[key].attributes.sharpnessWhite/20}rem"
              class="status__sharpness status__sharpness--white"></div>`;
          newStats.attack.maxSharpness = 'white';
        }
      }
    }
    for(var itemKey in selectedItems){
      for(var skillKey in selectedItems[itemKey].skills) {
        for(var modKey in selectedItems[itemKey].skills[skillKey].modifiers){
          if(modKey === 'health' || modKey === 'defense'){
            newStats[modKey] += selectedItems[itemKey].skills[skillKey].modifiers[modKey];
          } else if(modKey === 'attack') {
            if(!!!selectedItems.weapon.type){
              newStats.attack[modKey] += selectedItems[itemKey].skills[skillKey].modifiers[modKey];
            } else {
              debugger;
              newStats.attack[modKey] += (selectedItems[itemKey].skills[skillKey].modifiers[modKey] * modifiers[selectedItems.weapon.type]);
            }
            newStats.attack.raw += selectedItems[itemKey].skills[skillKey].modifiers[modKey];
          } else if(modKey === 'affinity') {
            newStats.affinity += selectedItems[itemKey].skills[skillKey].modifiers
            newStats.attack[modKey] += selectedItems[itemKey].skills[skillKey].modifiers[modKey];
          } else if(modKey.includes("resist") || modKey === 'defense') {
            newStats.defense[modKey] += selectedItems[itemKey].skills[skillKey].modifiers[modKey];
          }
        }
      }
    }
    if(!!newStats.attack.maxSharpness){
      newStats.attack.attack = (newStats.attack.attack * sharpnessModifiers.raw[newStats.attack.maxSharpness]).toFixed(2);
      newStats.attack.raw = (newStats.attack.raw * sharpnessModifiers.raw[newStats.attack.maxSharpness]).toFixed(2);
      // newStats.attack.elementDamage = (newStats.attack.elementDamage * sharpnessModifiers.elemental[newStats.attack.maxSharpness]).toFixed(2);
    }
    if(!!newStats.attack.affinity) {
      newStats.attack.attack = (parseFloat(newStats.attack.attack) + (newStats.attack.attack * newStats.attack.affinity/100)).toFixed(2);
      newStats.attack.raw = (parseFloat(newStats.attack.raw) + (newStats.attack.attack * newStats.attack.affinity/100)).toFixed(2);
    }
    this.setState(() => ({ "status": newStats }));
  }

  renderStats = (value) => {
    const {
      status
    } = this.state;

    if(!!status[value]) {
      return Object.keys(status[value]).map(key => {
        return (
          <div className="status__item" key={key}>
            <div className="status__itemTitle">
              {
                (key === 'elementDamage' && 'Element Damage') ||
                (key === 'elementType' && 'Element Type') ||
                (key !== 'maxSharpness' && key.replace("resist", ""))
              }
            </div>
            <div className="status__itemValue">{
              (key === 'sharpness' && <div className="status__sharpnessContainer" dangerouslySetInnerHTML={ {__html: status[value][key]} } />) ||
              (key !== 'maxSharpness' && status[value][key])
            }</div>
          </div>
        )
      })
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="status">
        <h1 className="status__title">Status</h1>
        <h2 className="status__title status__title--secondary">Attack Status</h2>
        {this.renderStats("attack")}
        <h2 className="status__title status__title--secondary">Defense Status</h2>
        {this.renderStats("defense")}
      </div>
    );
  }
}

export default Status;
