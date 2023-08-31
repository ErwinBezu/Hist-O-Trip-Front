import React, { ChangeEvent, useState } from 'react';

const Form = () => {
  const [pseudo, setPseudo] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const resetForm = () => {
    setPseudo('');
    setLastname('');
    setFirstname('');
    setEmail('');
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
            pseudo: pseudo,
            lastname: lastname,
            firstname: firstname,
            email: email,
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="pseudo">Pseudo:</label>
        <input
          type="text"
          aria-label="pseudo"
          id="pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastname">Nom:</label>
        <input
          type="text"
          aria-label="lastname"
          id="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="firstname">Prénom:</label>
        <input
          type="text"
          aria-label="firstname"
          id="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Adresse e-mail:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isSubmitting}>
        Envoyer
      </button>
    </form>
  );
};

export default Form;
// const [status, setStatus] = useState('Submit');

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setStatus('Sending...');
//   const { pseudo, lastname, firstname, email, message } = e.target.elements;
//   let details = {
//     pseudo: pseudo.value,
//     lastname: lastname.value,
//     firstname: firstname.value,
//     email: email.value,
//     message: message.value,
//   };
//   let response = await fetch('URL_API', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8',
//     },
//     body: JSON.stringify(details),
//   });
//   setStatus('Submit');
//   let result = await response.json();
//   alert(result.status);
// };

// .then((res) => res.json())
// .then((data) => {
//   setPseudo('');
//   setLastname('');
//   setFirstname('');
//   setEmail('');
//   setMessage('');
// })
// .catch((err) => {
//   console.log(err.message);
// });
