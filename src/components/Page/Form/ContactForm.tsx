import React, { ChangeEvent, useState } from 'react';
import './ContactForm.scss';

const ContactForm = () => {
  const [pseudonym, setPseudonym] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [mail, setMail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const resetForm = () => {
    setPseudonym('');
    setLastname('');
    setFirstname('');
    setMail('');
    setMessage('');
    setError('');
    setIsSubmitting(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }
    try {
      const response = await fetch(
        'http://ludoviclebris-server.eddi.cloud/api/api/contact',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pseudonym: pseudonym,
            lastname: lastname,
            firstname: firstname,
            mail: mail,
            message: message,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);

      resetForm();
    } catch (error) {
      setError(
        "Une erreur s'est produite lors de la soumission du formulaire."
      );
      console.error(error);
    }
  };

  return (
    <form className="contactForm-container" onSubmit={handleSubmit}>
      <h1 className="contactForm-title">Contactez-nous</h1>
      <p>
        <span className="asterisk">*</span> champ obligatoire
      </p>
      <div className="item-container">
        <label className="label-item" htmlFor="pseudonym">
          Pseudo:
        </label>
        <input
          className="input-item"
          type="text"
          aria-label="pseudonym"
          id="pseudonym"
          value={pseudonym}
          onChange={(e) => setPseudonym(e.target.value)}
        />
      </div>
      <div className="item-container">
        <label className="label-item" htmlFor="lastname">
          Nom<span className="asterisk">*</span>:
        </label>
        <input
          className="input-item"
          type="text"
          aria-label="lastname"
          id="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
      </div>
      <div className="item-container">
        <label className="label-item" htmlFor="firstname">
          Prénom<span className="asterisk">*</span>:
        </label>
        <input
          className="input-item"
          type="text"
          aria-label="firstname"
          id="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
      </div>
      <div className="item-container">
        <label className="label-item" htmlFor="email">
          Adresse e-mail<span className="asterisk">*</span>:
        </label>
        <input
          className="input-item"
          type="email"
          id="email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          required
        />
      </div>
      <div className="item-container">
        <label className="label-item" htmlFor="message">
          Message<span className="asterisk">*</span>:
        </label>
        <textarea
          className="input-item input-textarea"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button className="btn-style-var" type="submit" disabled={isSubmitting}>
        Envoyer
      </button>
    </form>
  );
};

export default ContactForm;
