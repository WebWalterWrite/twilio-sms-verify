import axios from 'axios';

// url par défault
const url = "http://localhost:4000/api/verify"

/**
 * @description - Envoi données au serveur
 * @param {string} route - endpoint api
 * @param {object} data - Données à transmettre
 */
export const postData = async (route, data) => {
  //const { result } = await axios.post(url+route, data);

  const result = {status: 200};
  
  return result;
};

