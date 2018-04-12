import React, { Component } from 'react';
import './index.css';

import SkillsList from './SkillsList';
import Search from './Search';
import FilteredList from './FilteredList';
import Status from './Status';
import DecorationList from './DecorationList';
import PreviewSet from './PreviewSet';

const INITIAL_STATE = {
  filteredItems: [],
  selectedItems: {
    kinsect: {},
    head: {},
    charm: {},
    weapon: {},
    chest: {},
    gloves: {},
    legs: {},
    waist: {},
  },
  skills: [],
  decorations: []
}

class SetBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE }
  }

  setFilteredItems = (dataFromChild) => {
    this.setState(() => ({ 'filteredItems': dataFromChild }));
  }

  setSelectedItems = (dataFromChild) => {
    const {
      selectedItems,
      decorations
    } = this.state;

    let newSelectedItems = {...selectedItems};

    if(
      dataFromChild.type === 'head' ||
      dataFromChild.type === 'chest' ||
      dataFromChild.type === 'gloves' ||
      dataFromChild.type === 'waist' ||
      dataFromChild.type === 'legs'
    ) {
      if(!!selectedItems[dataFromChild.type]) {
        this.setState(() => ({ "skills": [] }))
      }
      newSelectedItems[dataFromChild.type] = dataFromChild;
    } else if(!!dataFromChild.type) {
      newSelectedItems.weapon = dataFromChild;
    } else if (dataFromChild.name.includes('Charm')) {
      newSelectedItems.charm = dataFromChild;
    } else {
      decorations.push(dataFromChild);
    }
    this.setState(() => ({ "selectedItems": newSelectedItems, decorations }), () => {
      this.extractSkills();
    });
  }

  extractSkills = () => {
    const {
      selectedItems
    } = this.state;
    let skillsTemp = [];
    for(var key in selectedItems) {
      if(!!selectedItems[key].skills){
        for(var skillKey in selectedItems[key].skills){
          if(skillsTemp.length === 0) {
            // eslint-disable-next-line
            skillsTemp.push(Object.assign({}, selectedItems[key].skills[skillKey]));
            //skillsTemp = skillsTemp.slice(0);
            // eslint-disable-next-line
          } else if (skillsTemp.filter((e) => e.skill === selectedItems[key].skills[skillKey].skill).length === 0) {
            skillsTemp.push(Object.assign({}, selectedItems[key].skills[skillKey]));
            //skillsTemp = skillsTemp.slice(0);
          } else {
            //skillsTemp = skillsTemp.slice(0);
            // eslint-disable-next-line
            skillsTemp.filter((e) => e.skill === selectedItems[key].skills[skillKey].skill)[0].level += parseInt(selectedItems[key].skills[skillKey].level)
          }
        }
      }
    }

    this.setState(() => ({ "skills": skillsTemp }), () => {
      console.log(this.state.skills);
    })
  }

  render(){
    const {
      filteredItems,
      selectedItems,
      skills,
      decorations
    } = this.state;
    return (
      <div className="setBuilder">
        <div className="setBuilder__setInfo">
          <PreviewSet selectedItems={selectedItems} />
          <SkillsList skills={skills} />
          <Status selectedItems={selectedItems} />
          <DecorationList decorations={decorations} />
        </div>

        <Search callbackFromParent={this.setFilteredItems} />
        <FilteredList filteredItems={filteredItems} callbackFromParent={event => this.setSelectedItems(event)}/>
      </div>
    );
  }
}

export default SetBuilder;
