import React, { useState } from "react";
import { postData } from "../../api/fetch";

import "./form.scss";
import mobile from "../../images/smartphone.svg";

const Modal = ({ phone, state }) => {
  const [number, setNumber] = useState({
    digit1: "",
    digit2: "",
    digit3: "",
    digit4: "",
    digit5: "",
    digit6: "",
  });
  const [error, setError] = useState(null);

  /**
   * @description - Supprimer / Se déplacer
   */
  const nextInput = ({ keyCode, target }) => {
    return keyCode === 8 && target.selectionEnd === 0
      ? target.previousSibling && target.previousSibling.focus() // Supprimer la saisie dans chaque input
      : keyCode === 37 && target.selectionEnd === 0
      ? target.previousSibling && target.previousSibling.focus() // Revenir à l'input précédent à l'aide de la fleche du clavier
      : target.value.length === 1 &&
        target.nextSibling &&
        target.nextSibling.focus(); // Passer à l'input suivan
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    return setNumber({ ...number, [name]: value });
  };

  // Envoyer le formulaire
  const sendForm = async (e) => {
    e.preventDefault();

    const { status, error, data } = validForm(e);

    const result =
      status && (await postData("/checking", { code: data, phone: phone }));

    return !status ? setError(error) : result === "approved" && state(false);
  };

  // Valider le formulaire
  const validForm = (e) => {
    setError(null);

    const data = new Map(new FormData(e.target));
    const code = Object.values(Object.fromEntries(data))
      .map((el) => el)
      .join("");

    const isValid = /^([0-9]{6})+$/.test(code);

    return !isValid
      ? {
          status: false,
          error: "Saissisez votre code à 6 chiffres",
          data: null,
        }
      : {
          status: true,
          error: null,
          data: code,
        };
  };

  return (
    <section className="modal">
      <form onSubmit={sendForm}>
        <label htmlFor="code">Saissisez le code reçu par sms</label>
        <img src={mobile} alt="téléphone mobile" />
        {[...Array(6)].map((_, i) => {
          return (
            <input
              type="text"
              inputMode="decimal"
              id="code"
              name={`digit${i + 1}`}
              value={number[`digit${i + 1}`]}
              onChange={handleChange}
              onKeyUp={nextInput}
              maxLength={1}
            />
          );
        })}
        <div>
          <input type="submit" value="Vérifier le code" />
        </div>
        <div>
          <span className="send-code-button">renvoyer le code</span>
        </div>
        {error && <div className="input-error">{error}</div>}
      </form>
    </section>
  );
};

export default Modal;
