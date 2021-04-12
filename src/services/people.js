import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api'

export default {
   fetchNamesList() {
      return axios(`${BASE_URL}/names/`)
   },

   fetchPeopleListByName(name) {
      return axios(`${BASE_URL}/users/${name}`)
   }
}