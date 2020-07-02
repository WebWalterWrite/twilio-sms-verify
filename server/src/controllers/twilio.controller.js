"use strict";
import { twilioVerify } from '../services/twilio'

export const phoneVerify = async (req, res) => {
  try {

    // simple format ( pattern length 10 et format numéro 06|07 à faire)
    const phone = req.body.phone.replace('0', '+33');

    const { data } = await twilioVerify(phone);

    return res.json({ status: data });

  } catch (error) {
    throw new Error(error);
  }
};