/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

import api from '../../services/api';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [working, setWorking] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setWorking(true);
      const response = await api.post('/sessions', { email });

      const { _id } = response.data;

      localStorage.setItem('user', _id);
      history.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
    setWorking(false);
  }
  return (
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre
        <strong> talentos </strong> para sua emrpesa
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail *</label>
        <input
          type="email"
          id="email"
          placeholder="Seu melhor email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <button className="btn" type="submit" disabled={working}>
          Entrar
        </button>
      </form>
    </>
  );
}
