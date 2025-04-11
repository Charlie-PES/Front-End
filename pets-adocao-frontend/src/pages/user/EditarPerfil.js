import React, { useState } from 'react';
import styles from './EditarPerfil.module.css';

const EditarPerfil = () => {
  const [usuario, setUsuario] = useState({
    nome: 'Ana Beatriz Souza',
    email: 'ana@example.com',
    cidade: 'São Paulo - SP',
    telefone: '(11) 91234-5678',
    senha: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Perfil atualizado com sucesso!');
    console.log('Usuário atualizado:', usuario);
  };

  return (
    <div className={styles.container}>
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Nome completo</label>
        <input
          type="text"
          name="nome"
          value={usuario.nome}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={usuario.email}
          onChange={handleChange}
          required
        />

        <label>Cidade</label>
        <input
          type="text"
          name="cidade"
          value={usuario.cidade}
          onChange={handleChange}
        />

        <label>Telefone</label>
        <input
          type="text"
          name="telefone"
          value={usuario.telefone}
          onChange={handleChange}
        />

        <label>Nova senha</label>
        <input
          type="password"
          name="senha"
          placeholder="Digite uma nova senha"
          value={usuario.senha}
          onChange={handleChange}
        />

        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default EditarPerfil;
