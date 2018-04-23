import React from 'react';
import './index.css';

const PreviewSet = ({ selectedItems }) => (
  <div className="previewSet__container">
    {
      Object.keys(selectedItems).map(key => {
        return (
          <div key={key} className={`previewSet__item previewSet__item--${key}`}>
            <div className="previewSet__name">{selectedItems[key].name}</div>
            {
              !!selectedItems[key].assets &&
              (<div className="previewSet__imageContainer">
                <img src={selectedItems[key].assets.imageFemale}/>
                <img src={selectedItems[key].assets.imageMale}/>
              </div>)
            }
          </div>
        )
      })
    }
  </div>
)

export default PreviewSet;
