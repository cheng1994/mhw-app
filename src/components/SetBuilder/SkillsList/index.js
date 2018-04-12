import React from 'react';
import './index.css';

const splitSlug = (str) => {
  return str
    .split('-')
    .map(function(word) {
      return word[0].toUpperCase() + word.substr(1);
    })
    .join(' ')
    .replace(/Rank \d/g, '');
}

const SkillsList = ({ skills }) => {
  const renderLevelBar = (level, key) => {
    let bars = Array(6).fill(1).map((x, i) => x+i);;
    return (
      <div key={`bars-${key}`} className="skillsList__levelContainer">
        {
          Object.keys(bars).map(key => {
            if(level > key) {
              return <div key={`bar-${key}`} className="skillsList__bar skillsList__bar--active"></div>
            } else {
              return <div key={`bar-${key}`} className="skillsList__bar"></div>
            }
          })
        }
      </div>
    )
  }

  return (
    <div className="skillsList">
      <h1 className="skillsList__title">Skills</h1>
      { !!skills &&
        Object.keys(skills).map(key => {
          return (
            <div key={key}>
              <div className="skillsList__item">{splitSlug(skills[key].slug)}</div>
              {renderLevelBar(skills[key].level, key)}
            </div>
          )
        })
      }
    </div>
  )
}

export default SkillsList
