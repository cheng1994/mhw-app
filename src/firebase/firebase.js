import * as firebase from 'firebase';
import { fbConfig } from '../environments.js';

if (!firebase.apps.length) {
  firebase.initializeApp(fbConfig);
}

const db = firebase.database();
const auth = firebase.auth();
export {
  db,
  auth
};
