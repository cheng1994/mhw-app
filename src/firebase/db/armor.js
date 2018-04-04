import axios from 'axios';

var armors = []

// //get all Armors;
// export const getArmors = () =>
//   db.ref('armors').orderByChild('name').once('value');
//
// // get specific armor by name
// export const getArmor = (value) =>
//   db.ref('armors').orderByChild('slug').limitToFirst(12).startAt(value).once('value');
//
// export const getSkills = (value) =>
//   db.ref('skills').orderByChild('slug')
// filters: {
//   search: '',
//   type: '',
//   slot: '',
//   skill: '',
//   deco: '',
//   rarity: '',
//   element: ''
// }

// temp usage of api will be replacing with firebase storage of data
const instance = axios.create({
  baseURL: 'https://mhw-db.com',
  timeout: 5000,
});

const promiseBoilerPlate = (searchParam) => {
  return new Promise((resolve, reject) => {
    instance.get('/armor' + searchParam)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      })
  })
}

// get all armors
export const getArmors = () => {
  return new Promise((resolve, reject)=>{
    if(armors.length > 0){
      resolve(armors);
    }
    instance.get('/armor')
      .then(response => {
        if(armors !== response)
          armors = response.data;
        resolve(armors)
      })
      .catch(error => {
        reject(error);
      })
  });
}

export const getArmorByName = (value) => {
  return promiseBoilerPlate(`?q={ "name": { "$like": "${value}%" }}`);
}

export const get = (value) => {
  let param = "?q={";
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
