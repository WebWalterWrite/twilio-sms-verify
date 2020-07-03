import axios from 'axios';

// url par défault
const url = "http://localhost:4000/api/twilio"

/**
 * @description - Envoi données au serveur
 * @param {string} route - endpoint api
 * @param {object} data - Données à transmettre
 */


const test =() => {
  return new Promise((resolve) => setTimeout(() => {
    const result = {status: "pending"};
    return resolve(result);
  }, 3000));
}

export const postData = async (route, data) => {

  try{
    const { status } = await axios.post(url+route, data);
  
  console.log(status)
    return status && status
  }
  catch(e){
    throw new Error(e);
  }
};

