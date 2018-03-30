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

export const getDecorationbyName = (value) => {
  return promiseBoilerPlate(`?q={ "name": { "$like": "${value}%" }}`);
}
