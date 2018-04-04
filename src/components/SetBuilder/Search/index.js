import React, { Component } from 'react';
import './index.css';

import { weapon } from '../../../firebase';
import { armor } from '../../../firebase';
import { skills } from '../../../firebase';
import DropDown from './DropDown';
import SkillsModal from './SkillsModal';
import Pills from './Pills';

const INITIAL_STATE = {
  searchText: '',
  weapons: [],
  skills: [],
  filteredItems: {},
  error: null,
  filters: {
    search: '',
    type: '',
    slot: '',
    skill: '',
    deco: '',
    rarity: '',
    element: ''
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

const slots = Array(4).fill(1).map((x, i) => x+i);

const rarity = Array(8).fill(1).map((x, i) => x+i);

const element = [
  'Fire',
  'Water',
  'Thunder',
  'Ice',
  'Dragon'
]

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
})

class Search extends Component {
  constructor(props){
    super(props);

    this.mounted = true;

    this.state = { ...INITIAL_STATE };
    this.getSkills();
  }

  getSkills = () => {
    skills.getSkills().then(data => {
      console.log(data);
      this.setState(() => ({ skills: data}));
    })
  }

  get(value) {
    if(!!value.type && value.type.toLowerCase() === 'armor'){
      armor.get(value).then(data => {
        console.log(data);
        this.setState(() => ({ 'filteredItems': data }));
        this.props.callbackFromParent(this.state.filteredItems);
      })
    } else if(!!value.type && value.type.toLowerCase() === 'weapons'){
      weapon.get(value).then(data => {
        console.log(data);
        this.setState(() => ({ 'filteredItems': data }));
        this.props.callbackFromParent(this.state.filteredItems);
      })
    }

    // Object.keys(value).map(key => {
    //
    // })
    // armor.getArmorByName(value).then(data => {
    //
    //
    // })
  }

  setFilters = (value, filter) => {
    const {
      filters
    } = this.state;
    filters[filter] = value;
    this.setState(() => ({ filters }))
    this.get(filters);
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  render(){
    const {
      searchText,
      filters,
      skills
    } = this.state

    return (
      <div className="search">
        <div className="search__filters">
          <DropDown
            index="0"
            filter="Type"
            items={['Armor', 'Weapons']}
            callbackFromParent={item => this.setFilters(item, 'type')}
          />
          <DropDown
            index="1"
            filter="Slot"
            items={filters.type == 'Armor' ? armorSlot : weaponSlot}
            callbackFromParent={item => this.setFilters(item, 'slot')}
          />
          <SkillsModal skills={skills} callbackFromParent={item => this.setFilters(item, 'skill')}/>
          <DropDown
            index="3"
            filter="Decoration Slots"
            items={slots}
            callbackFromParent={item => this.setFilters(item, 'deco')}
          />
          <DropDown
            index="4"
            filter="Rarity"
            items={rarity}
            callbackFromParent={item => this.setFilters(item, 'rarity')}
          />
          <DropDown
            index="5"
            filter="Element"
            items={element}
            callbackFromParent={item => this.setFilters(item, 'element')}
          />
        </div>
        { !!filters.type &&
          <div className="search__container">
            <div className="search__input">
              <input
                value={filters.search}
                onChange={event => this.setFilters(event.target.value, 'search')}
                type="text"
                placeholder="Search for"
              />
            </div>
            <div className="search__pills">
              <Pills
                filters={filters}
                callbackFromParent={item => this.setFilters('', item)}
              />
            </div>
          </div>
        }

      </div>
    )
  }
}

export default Search;
