import React, { Component } from 'react';
import './index.css';

import { weapon, armor, skills, charms, decorations } from '../../../firebase';
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

class Search extends Component {
  constructor(props){
    super(props);

    this.mounted = true;

    this.state = { ...INITIAL_STATE };
    this.getSkills();
  }

  getSkills = () => {
    skills.getSkills().then(data => {
      this.setState(() => ({ skills: data}));
    })
  }

  get(value) {
    if(this.mounted){
      if(!!value.type && value.type.toLowerCase() === 'armor'){
        armor.get(value).then(data => {
          this.setState(() => ({ 'filteredItems': data }), () => {
            this.props.callbackFromParent(this.state.filteredItems);
          });

        })
      } else if(!!value.type && value.type.toLowerCase() === 'weapons'){
        weapon.get(value).then(data => {
          this.setState(() => ({ 'filteredItems': data }), () => {
            this.props.callbackFromParent(this.state.filteredItems);
          });
        })
      } else if(!!value.type && value.type.toLowerCase() === 'charms') {
        charms.get(value).then(data => {
          this.setState(() => ({ 'filteredItems': data }), () => {
            this.props.callbackFromParent(this.state.filteredItems);
          });
        })
      } else if(!!value.type && value.type.toLowerCase() === 'decorations') {
        decorations.get(value).then(data => {
          this.setState(() => ({ 'filteredItems': data }), () => {
            this.props.callbackFromParent(this.state.filteredItems);
          });
        })
      }
    }
  }

  setFilters = (value, filter) => {
    const {
      filters
    } = this.state;

    if(value === '' && filter === 'type'){
      let temp = {
        search: '',
        type: '',
        slot: '',
        skill: '',
        deco: '',
        rarity: '',
        element: ''
      }

      this.setState(() => ({ "filters": temp, 'filteredItems': [] }), () => {
        this.props.callbackFromParent([]);
      });
    } else {
      filters[filter] = value;
      this.setState(() => ({ filters }), () => {
        this.get(filters);
      })
    }

  }

  componentWillUnmount(){
    this.mounted = false;
  }

  render(){
    const {
      filters,
      skills
    } = this.state

    return (
      <div className="search">
        <div className="search__filters">
          <DropDown
            index="0"
            filter="Type"
            items={['Armor', 'Weapons', 'Charms', 'Decorations']}
            callbackFromParent={item => this.setFilters(item, 'type')}
          />
          {
            (filters.type === 'Armor' || filters.type === 'Weapons') &&
            <DropDown
              index="1"
              filter="Slot"
              items={filters.type === 'Armor' ? armorSlot : weaponSlot}
              callbackFromParent={item => this.setFilters(item, 'slot')}
            />
          }
          {
            (filters.type === 'Armor' || filters.type === 'Charms') &&
            <SkillsModal skills={skills} callbackFromParent={item => this.setFilters(item, 'skill')}/>
          }
          {
            (filters.type === 'Weapons' || filters.type === 'Armor') &&
            <DropDown
              index="3"
              filter="Decoration Level"
              items={slots}
              callbackFromParent={item => this.setFilters(item, 'deco')}
            />
          }
          <DropDown
            index="4"
            filter="Rarity"
            items={rarity}
            callbackFromParent={item => this.setFilters(item, 'rarity')}
          />
          {
            (filters.type === 'Weapons' || filters.type === 'Armor') &&
            <DropDown
              index="5"
              filter="Element"
              items={element}
              callbackFromParent={item => this.setFilters(item, 'element')}
            />
          }
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
