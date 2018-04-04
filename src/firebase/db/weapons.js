import axios from 'axios';

var weapons = [];

const slugConvert = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .join('-');
}

const instance = axios.create({
  baseURL: 'https://mhw-db.com',
  timeout: 5000,
});

const promiseBoilerPlate = (searchParam) => {
  return new Promise((resolve, reject) => {
    instance.get('/weapons' + searchParam)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      })
  })
}

export const getWeapons = () => {
  return new Promise((resolve, reject)=>{
    if(weapons.length > 0){
      resolve(weapons);
    }
    instance.get('/weapons')
      .then(response => {
        if(weapons !== response)
          weapons = response.data;
        resolve(weapons)
      })
      .catch(error => {
        reject(error);
      })
  });
}

export const getWeaponByName = (name) => {
  axios.get('https://mhw-db.com/weapons/' + name)
}

export const get = (value) => {
  let param = "?q={";
  Object.keys(value).map(key => {
    if(value[key]){
      if(key === 'search'){
        param += `"name": { "$like": "${value[key]}%"},`
      } else if(key === 'slot') {
        param += `"type": "${slugConvert(value[key])}",`
      } else if(key === 'deco') {
        param += `"attributes.slotsRank${value[key]}": { "$exists": true },`
      } else if(key === 'rarity') {
        param += `"rarity": "${value[key]}",`
      } else if(key === 'element') {
        param += `"attributes.elementType": "${value[key]}",`
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
