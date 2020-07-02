import twilio from 'twilio';
import { twilioKeys } from '../services/keys';

const { accountSid, authToken, serviceId } = twilioKeys;

const client = new twilio(accountSid, authToken);

/**
 * @function twilioVerify
 * @see {@link https://bit.ly/38k2Bxz | Twilio}
 * @description - Envoi le code de vérifications par sms.
 * @param {string} phone - numéro du destinataire.
 * @returns {string} Le status du la demande.
 */
export const twilioVerify = async phone => {
  try {
    const result = await client.verify
      .services(serviceId)
      .verifications
      .create({
        to: phone,
        channel: "sms",
      });

      return result;

  } catch (error) {
    throw new Error(error);
  }
};