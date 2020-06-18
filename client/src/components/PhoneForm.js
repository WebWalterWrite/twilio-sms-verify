import React, { useState } from "react";

const PhoneForm = () => {
  const [values, setValue] = useState({
    digit2: "",
    digit4: "",
    digit6: "",
    digit8: "",
    digit10: "",
  });

  const [error, setError] = useState(null);

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

  // Valider le formulaire
  const validForm = (e) => {
    e.preventDefault();

    setError(null);

    const form = new FormData(e.target);
    const data = new Map(form);
    const obj = Object.fromEntries(data);
    const phone = Object.values(obj)
      .map((el) => el)
      .join("");

    const regex = /^(0)(6|7)\d{8}$/;

    return !phone.length
      ? setError("Veuillez saisir votre numéro de téléphone")
      : regex.test(phone)
      ? phone
      : setError("Veuillez saisir un numéro de mobile valide");
  };

  // MAJ de l'état de l'input
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValue({ ...values, [name]: value.trim() });
  };
  return (
    <form noValidate onSubmit={validForm}>
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
        <input type="submit" value="Send code" />
      </div>
      {error && <div className="input-error">{error}</div>}
    </form>
  );
};

export default PhoneForm;
