"use strict";
import { twilioSendCode, twilioCheckCode } from "../services/twilio";

export const phoneVerify = async (req, res) => {
  try {
    const { phone } = req.body;

    // simple format ( pattern length 10 et format numéro 06|07 à faire)
    const isPhone = /^(0)[6-7](\d{8})$/.test(phone);

    if (isPhone) {
      let p = phone.replace("0", "+33");
      const result = await twilioSendCode(p);

      return res.json({ response: { status: result.status } });
    } else {
      return res.json({
        status: 400,
        message: "Saississez un numéro de mobile",
      });
    }
  } catch (error) {
    //throw new Error(error);
    return res.json({ response: { status: error } });
  }
};


export const codeVerify = async (req, res) => {
  try {
    const { code, phone } = req.body;

    const isPhone = /^(0)[6-7](\d{8})$/.test(phone); // test si format en 06 | 07, à 10 chiffres

    const isCode = /(^\d{6})$/.test(code); // Test si code digital à 6 chiffres

    if (!isPhone)
      return res
        .status(403)
        .json({
          response: {
            status: "failed",
            errorTxt: "invalid format",
            errorCode: "1",
          },
        });

    if (!isCode)
      return res
        .status(403)
        .json({
          response: {
            status: "failed",
            errorTxt: "invalid format",
            errorCode: "1",
          },
        });

    if (isPhone && isCode) {
      let p = phone.replace("0", "+33");

      const result = await twilioCheckCode(code, p);
      return res.json({ response: { status: result.status } });
    }
  } catch (error) {
    throw new Error(error);
  }
};
