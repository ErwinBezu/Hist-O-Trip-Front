import React, { ChangeEvent, useState } from 'react';
import Field from '../../Utils/Field/FieldInput';
import FieldTextarea from '../../Utils/Field/FieldTextarea';
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
      const response = await fetch('http://localhost:8080/api/contact', {
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
      });

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

  const changeField = (
    value: string,
    name: 'email' | 'pseudonym' | 'lastname' | 'firstname' | 'message'
  ) => {
    if (name === 'email') {
      setMail(value);
    } else if (name === 'pseudonym') {
      setPseudonym(value);
    } else if (name === 'lastname') {
      setLastname(value);
    } else if (name === 'firstname') {
      setFirstname(value);
    } else if (name === 'message') {
      setMessage(value);
    }
  };

  const handleChangeField =
    (name: 'email' | 'pseudonym' | 'lastname' | 'firstname' | 'message') =>
    (value: string) => {
      changeField(value, name);
    };

  return (
    <div className="contactForm-mainContainer">
      <form className="contactForm-container" onSubmit={handleSubmit}>
        <h1 className="contactForm-title">Contactez-nous</h1>
        <p>
          <span className="asterisk">*</span> champ obligatoire
        </p>
        <Field
          type="text"
          placeholder="Pseudo"
          value={pseudonym}
          onChange={handleChangeField('pseudonym')}
          id="pseudonym"
        />
        <Field
          type="text"
          placeholder="Nom"
          value={lastname}
          onChange={handleChangeField('lastname')}
          id="lastname"
          required
        />
        <Field
          type="text"
          placeholder="Prénom"
          value={firstname}
          onChange={handleChangeField('firstname')}
          id="firstname"
          required
        />
        <Field
          type="email"
          placeholder="Adresse e-mail"
          value={mail}
          onChange={handleChangeField('email')}
          id="email"
          required
        />
        <FieldTextarea
          placeholder="Message"
          value={message}
          onChange={handleChangeField('message')}
          id="message"
          required
        />

        <button className="btn-style-var" type="submit" disabled={isSubmitting}>
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

/*<div className="item-container">
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
        </div>*/
