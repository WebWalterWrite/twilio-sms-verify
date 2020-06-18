import React from "react";
import "./App.scss";
import PhoneForm from "./components/PhoneForm";

function App() {

  return (
    <>
      <header className="App-header">
        <h1>TwilioSmsVerify</h1>
      </header>
      <main>
        <section>
          <h2>
            Un simple exemple d'utilisation d'une vérification par code via sms
            avec le service VERIFY de twilio.
          </h2>
          <PhoneForm />
        </section>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
