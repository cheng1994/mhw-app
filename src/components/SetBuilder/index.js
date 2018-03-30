import React, { Component } from 'react';
import './index.css';

import SkillsList from './SkillsList';
import Search from './Search';
import FilteredList from './FilteredList';

const INITIAL_STATE = {
  filteredItems: {}
}

class SetBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE }
  }

  setFilteredItems = (dataFromChild) => {
    this.setState(() => ({ 'filteredItems': dataFromChild }));
  }

  render(){
    return (
      <div className="setBuilder">
        <div className="setBuilder__setInfo">
          <SkillsList />
        </div>

        <Search callbackFromParent={this.setFilteredItems} />
        <FilteredList filteredItems={this.state.filteredItems} />
      </div>
    );
  }
}

export default SetBuilder;
