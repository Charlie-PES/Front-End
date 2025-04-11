import React, { useState } from 'react';
import styles from './Inscricoes.module.css';

const Inscricoes = () => {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    tipo: '',
    mensagem: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Inscrição enviada com sucesso!');
    console.log('Dados da inscrição:', form);
  };

  return (
    <div className={styles.container}>
      <h2>Formulário de Inscrição</h2>
      <p className={styles.subtitulo}>
        Cadastre-se para colaborar com a nossa missão! 🐶🐱
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Nome completo</label>
        <input
          type="text"
          name="nome"
          placeholder="Seu nome"
          value={form.nome}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Seu e-mail"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Tipo de inscrição</label>
        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          required
        >
          <option value="">Selecione</option>
          <option value="Voluntário">Voluntário</option>
          <option value="Lar temporário">Lar temporário</option>
          <option value="Doações">Desejo doar</option>
          <option value="Novidades">Receber novidades</option>
        </select>

        <label>Mensagem (opcional)</label>
        <textarea
          name="mensagem"
          rows="4"
          placeholder="Conte um pouco mais sobre como deseja ajudar"
          value={form.mensagem}
          onChange={handleChange}
        />

        <button type="submit">Enviar inscrição</button>
      </form>
    </div>
  );
};

export default Inscricoes;
