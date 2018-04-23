import axios from 'axios';

export var skillsList = []

const instance = axios.create({
  baseURL: 'https://mhw-db.com',
  timeout: 5000,
});

const promiseBoilerPlate = (searchParam) => {
  return new Promise((resolve, reject) => {
    instance.get('/skills' + searchParam)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      })
  })
}

// get all skills
export const getSkills = () => {
  return new Promise((resolve, reject)=>{
    if(skillsList.length > 0){
      resolve(skillsList);
    }
    instance.get('/skills')
      .then(response => {
        skillsList = response.data;
        resolve(skillsList)
      })
      .catch(error => {
        reject(error);
      })
  });
}


// get specific SkillsList
export const getSkill = (skillId) => {
  return new Promise((resolve, reject) => {
    instance.get('/skills/' + skillId)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      })
  })
}
