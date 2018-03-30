import axios from 'axios';

var weapons = [];

// temp usage of api will be replacing with firebase storage of data
const instance = axios.create({
  baseURL: 'https://mhw-db.com',
  timeout: 5000,
});

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
