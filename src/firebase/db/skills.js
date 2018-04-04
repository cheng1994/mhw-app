import axios from 'axios';

var skills = []

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
    if(skills.length > 0){
      resolve(skills);
    }
    instance.get('/skills')
      .then(response => {
        if(skills !== response)
          skills = response.data;
        resolve(skills)
      })
      .catch(error => {
        reject(error);
      })
  });
}
