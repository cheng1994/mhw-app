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
    {/* <div className="previewSet__item previewSet__item--kinsect">
    </div>
    <div className="previewSet__item previewSet__item--helm">
      {selectedItems.head.name}
      {
        !!selectedItems.head.assets &&

      }

    </div>
    <div className="previewSet__item previewSet__item--charm">
      {selectedItems.charm.name}
    </div>
    <div className="previewSet__item previewSet__item--weapon">
      {selectedItems.weapon.name}
    </div>
    <div className="previewSet__item previewSet__item--chest">
      {selectedItems.chest.name}
      {
        !!selectedItems.chest.assets &&
        <div className="previewSet__imageContainer">
          <img src={selectedItems.chest.assets.imageFemale}/>
          <img src={selectedItems.chest.assets.imageMale}/>
        </div>
      }
    </div>
    <div className="previewSet__item previewSet__item--gloves">
      {selectedItems.gloves.name}
      <div className="previewSet__imageContainer">
        <img src={selectedItems.gloves.assets.imageFemale}/>
        <img src={selectedItems.gloves.assets.imageMale}/>
      </div>
    </div>
    <div className="previewSet__item previewSet__item--legs">
      {selectedItems.legs.name}
      <div className="previewSet__imageContainer">
        <img src={selectedItems.legs.assets.imageFemale}/>
        <img src={selectedItems.legs.assets.imageMale}/>
      </div>
    </div>
    <div className="previewSet__item previewSet__item--waist">
      {selectedItems.waist.name}
      <div className="previewSet__imageContainer">
        <img src={selectedItems.waist.assets.imageFemale}/>
        <img src={selectedItems.waist.assets.imageMale}/>
      </div>
    </div> */}
  </div>
)

export default PreviewSet;
