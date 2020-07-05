import React from "react";
import "./App.scss";
import PhoneForm from "./components/form/Phone.form";

function App() {

  return (
    <>
      <header>
        <h1>TwilioSmsVerify</h1>
          <p>
            Un simple exemple d'utilisation d'une vérification par code via sms
            avec le service VERIFY de twilio.
          </p>
      </header>
      <main>
        <section>
          <PhoneForm />
        </section>
      </main>
      <footer>
        <div>
          Icons made by{" "}
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
            Freepik
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
