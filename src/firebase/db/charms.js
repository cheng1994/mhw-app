import axios from 'axios';

var charms = []

// temp usage of api will be replacing with firebase storage of data
const instance = axios.create({
  baseURL: 'https://mhw-db.com',
  timeout: 5000,
});

const promiseBoilerPlate = (searchParam) => {
  return new Promise((resolve, reject) => {
    instance.get('/charms' + searchParam)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      })
  })
}

// get all charms
export const getCharms = () => {
  return new Promise((resolve, reject)=>{
    if(charms.length > 0){
      resolve(charms);
    }
    instance.get('/armor')
      .then(response => {
        if(charms !== response)
          charms = response.data;
        resolve(charms)
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
