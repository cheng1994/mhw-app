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
    let decorationsTemp = {...decorations};

    if(
      dataFromChild.type === 'head' ||
      dataFromChild.type === 'chest' ||
      dataFromChild.type === 'gloves' ||
      dataFromChild.type === 'waist' ||
      dataFromChild.type === 'legs'
    ) {
      if(!!selectedItems[dataFromChild.type]) {
        this.setState(() => ({
          "skills": [],
        }))
      }
      newSelectedItems[dataFromChild.type] = dataFromChild;
      for(var key in newSelectedItems[dataFromChild.type].slots) {
        decorationsTemp.push(newSelectedItems[dataFromChild.type].slots[key]);
      }
    } else if(!!dataFromChild.type) {
      newSelectedItems.weapon = dataFromChild;
      for(var key in newSelectedItems.weapon.slots) {
        decorationsTemp.push(newSelectedItems.weapon.slots[key]);
      }
    } else if (dataFromChild.name.includes('Charm')) {
      newSelectedItems.charm = dataFromChild;
    } else {
      for(var key in decorations) {
        if(!!!decorations[key].decoration && dataFromChild.slot === decorations[key].rank){
          decorations[key].deco = dataFromChild;
        }
      }
    }
    this.setState(() => ({ "selectedItems": newSelectedItems, "decorations": decorationsTemp }), () => {
      this.extractSkills();
    });
  }

  extractSkills = () => {
    const {
      selectedItems,
      decorations
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


    this.setState(() => ({ "skills": skillsTemp }));
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
          <Status selectedItems={selectedItems} decorations={decorations}/>
          <DecorationList decorations={decorations} />
        </div>

        <Search callbackFromParent={this.setFilteredItems} />
        <FilteredList filteredItems={filteredItems} callbackFromParent={event => this.setSelectedItems(event)}/>
      </div>
    );
  }
}

export default SetBuilder;
