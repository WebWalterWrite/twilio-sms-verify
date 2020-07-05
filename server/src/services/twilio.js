import twilio from 'twilio';
import { twilioKeys } from '../services/keys';

const { accountSid, authToken, serviceId } = twilioKeys;

const client = new twilio(accountSid, authToken);

/**
 * @function twilioSendCode
 * @see {@link https://bit.ly/38k2Bxz | Twilio}
 * @description - Envoi le code de vérifications par sms.
 * @param {string} phone - numéro du destinataire.
 * @returns {string} Le status du la demande.
 */
export const twilioSendCode = async phone => {
  try {
    const { data } = await client.verify
      .services(serviceId)
      .verifications
      .create({
        to: phone,
        channel: "sms",
      });
    
      return data;

  } catch (error) {
    throw new Error(error);
  }
};

/**
 * @function twilioCheckCode
 * @see {@link https://bit.ly/38k2Bxz | Twilio}
 * @description - Envoi le code de vérifications par sms.
 * @param {string} phone - numéro du destinataire.
 * @param {string} code - code reçu par sms.
 * @returns {string} Le status du la demande.
 */
export const twilioCheckCode = async ( code, phone ) => {
  try {
    const { data } = await client.verify
      .services(serviceId)
      .verificationChecks
      .create({ to: phone, code: code });

    return data;

  } catch (error) {
     throw new Error(error);
  }
};