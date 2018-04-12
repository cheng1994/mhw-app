import axios from 'axios';

var decorations = []

const instance = axios.create({
  baseURL: 'https://mhw-db.com',
  timeout: 5000,
});

const promiseBoilerPlate = (searchParam) => {
  return new Promise((resolve, reject) => {
    instance.get('/decorations' + searchParam)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      })
  })
}

// get all decorations
export const getDecorations = () => {
  return new Promise((resolve, reject)=>{
    if(decorations.length > 0){
      resolve(decorations);
    }
    instance.get('/decorations')
      .then(response => {
        if(decorations !== response)
          decorations = response.data;
        resolve(decorations)
      })
      .catch(error => {
        reject(error);
      })
  });
}

export const get = (value) => {
  let param = "?q={";
  // eslint-disable-next-line
  Object.keys(value).map(key => {
    if(value[key]){
      if(key === 'search'){
        param += `"name": { "$like": "${value[key]}%"},`
      } else if(key === 'slot') {
        param += `"type": "${value[key].toLowerCase()}",`
      } else if(key === 'skill') {
        param += `"skills.skill.name": "${value[key]}",`
      } else if(key === 'deco') {
        param += `"attributes.slotsRank${value[key]}": { "$exists": true },`
      } else if(key === 'rarity') {
        param += `"rarity": "${value[key]}",`
      } else if(key === 'element') {
        param += `"attributes.resist${value[key]}": { "$gt": 0 },`
      }
    }
  });
  param = param.replace(/,$/, '');
  param += "}";
  if(param === "?q={}"){
    param = ""
  }
  return promiseBoilerPlate(param);
}
