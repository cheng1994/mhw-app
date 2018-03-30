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
