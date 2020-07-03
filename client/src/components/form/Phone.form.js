import React, { useState } from "react";
import CodeForm from "./Code.form";
import './form.scss';

// Import api call
import { postData } from "../../api/fetch";

const PhoneForm = ({ state }) => {
  const [values, setValue] = useState({
    digit2: "",
    digit4: "",
    digit6: "",
    digit8: "",
    digit10: "",
  });

  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [result, setResult ] = useState(false);

  /**
   * @description - Supprimer / Se déplacer
   */
  const nextInput = (e) => {
    const { target, keyCode } = e;

    return keyCode === 8 && e.target.selectionEnd === 0
      ? target.previousSibling && target.previousSibling.focus() // Supprimer la saisie dans chaque input
      : keyCode === 37 && e.target.selectionEnd === 0
        ? target.previousSibling && target.previousSibling.focus() // Revenir à l'input précédent à l'aide de la fleche du clavier
        : target.value.length === 2 &&
        target.nextSibling &&
        target.nextSibling.focus(); // Passer à l'input suivant
  };

  // Envoyer le formulaire
  const sendForm = async (e) => {
    setModal(false);
   
    e.preventDefault();

    const { status, error, data } = validForm(e);

    if (!status) return setError(error);

    if (status) {
      setResult(true)
      const result = await postData("/verifications", { phone: data });
      return result && result == 200  && setModal(true);
    }
  };

  // Valider le formulaire
  const validForm = (e) => {
    setError(null);
    const form = new FormData(e.target);
    const data = new Map(form);
    const obj = Object.fromEntries(data);
    const phone = Object.values(obj)
      .map((el) => el)
      .join("");

    const regex = /^(0)(6|7)\d{8}$/;

    return !phone.length
      ? {
        status: false,
        error: "Veuillez saisir votre numéro de téléphone",
        data: null,
      }
      : !regex.test(phone)
        ? {
          status: false,
          error: "Veuillez saisir un numéro de mobile valide",
          data: null,
        }
        : { status: true, error: null, data: phone };
  };

  // MAJ de l'état de l'input
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValue({ ...values, [name]: value.trim() });
  };

  return (
    <>
      {modal && <CodeForm />}
      <section className="phone-form">
        <form noValidate onSubmit={sendForm}>
          <label htmlFor="tel">
            Saisissez votre N° de Mobile<sup className="info-bulle">i</sup>
            <span className="info-bulle-message">Au format 06 ou 07</span>
          </label>
          {[...Array(5)].map((_, i) => (
            <input
              key={i}
              type="tel"
              id="tel"
              name={`digit${(i + 1) * 2}`}
              onKeyDown={nextInput}
              maxLength={2}
              onChange={handleOnChange}
              value={values[`digit${(i + 1) * 2}`]}
            />
          ))}
          <div>
            { !result 
                ? <input type="submit" value="Envoyer le code" />
                : <div className="pending-response"><span>Envoi en cours</span></div>
            }
          </div>
          {error && <div className="input-error">{error}</div>}
        </form>
      </section>
    </>
  );
};

export default PhoneForm;
