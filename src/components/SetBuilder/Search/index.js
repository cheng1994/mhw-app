import React, { Component } from 'react';
import './index.css';

import { weapon } from '../../../firebase';
import { armor } from '../../../firebase';
import { decorations } from '../../../firebase';
import DropDown from './DropDown';
import SkillsModal from './SkillsModal';

const INITIAL_STATE = {
  searchText: '',
  weapons: [],
  decorations: {},
  filteredItems: {},
  error: null,
  filters: {
    type: '',
    slot: '',
    skill: '',
    deco: '',
    rarity: '',
    resistance: ''
  }
}

const weaponSlot = [
  'Great Sword',
  'Long Sword',
  'Sword and Shield',
  'Dual Blades',
  'Hammer',
  'Hunting Horn',
  'Lance',
  'Gunlance',
  'Switch Axe',
  'Charge Blade',
  'Insect Glaive',
  'Light Bowgun',
  'Heavy Bowgun',
  'Bow'
];

const armorSlot = [
  'Head',
  'Chest',
  'Gloves',
  'Waist',
  'Legs'
];

const slots = [
  1,
  2,
  3,
  4
]

const slugConvert = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .join('-');
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
})

class Search extends Component {
  constructor(props){
    super(props);

    this.mounted = true;

    this.state = { ...INITIAL_STATE };
    this.getDecorations();
  }

  getDecorations = () => {
    decorations.getDecorations().then(data => {
      console.log(data);
      this.setState(() => ({ decorations: data}));
    })
  }

  getArmor(value) {
    value = slugConvert(value);
    armor.getArmorByName(value).then(data => {
      this.setState(() => ({ 'filteredItems': data }))
      this.props.callbackFromParent(this.state.filteredItems);
    })
  }

  handleSearch(event) {
    this.setState(byPropKey('searchText', event.target.value));
    this.getArmor(event.target.value);
  }

  setFilters = (value, filter) => {
    const {
      filters
    } = this.state;

    filters[filter] = value;
    this.setState(() => ({ filters }))
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  render(){
    const {
      searchText,
      filters,
      decorations
    } = this.state

    return (
      <div className="search">
        <div className="search__filters">
          <DropDown
            index="0"
            filter="Type"
            items={['Armors', 'Weapons']}
            callbackFromParent={item => this.setFilters(item, 'type')}
          />
          <DropDown
            index="1"
            filter="Slot"
            items={filters.type == 'Armors' ? armorSlot : weaponSlot}
            callbackFromParent={item => this.setFilters(item, 'slot')}
          />
          <SkillsModal skills={decorations} callbackFromParent={item => this.setFilters(item, 'deco')}/>
          <DropDown
            index="3"
            filter="Decoration Slots"
            items={slots}
            callbackFromParent={item => this.setFilters(item, 'deco')}
          />
          <DropDown index="4" filter="Rarity" />
          <DropDown index="5" filter="Resistance" />
        </div>

        <div className="search__input">
          <input
            value={searchText}
            onChange={this.handleSearch.bind(this)}
            type="text"
            placeholder="Search for"
          />
        </div>
      </div>
    )
  }
}

export default Search;
