import React, { useState } from 'react';
import styles from './Match.module.css';
import { useNavigate } from 'react-router-dom';

const Match = () => {
  const navigate = useNavigate();
  const [preferencias, setPreferencias] = useState({
    nome: '',
    idade: '',
    tipoResidencia: '',
    tempoDisponivel: '',
    temOutrosPets: '',
    preferePorte: '',
    prefereSexo: '',
    comportamentoDesejado: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferencias((prev) => ({ ...prev, [name]: value }));
  };

  const handleSalvar = () => {
    // Aqui você poderia salvar no backend ou localStorage
    alert('Preferências salvas com sucesso!');
  };

  const handleProcurarPet = () => {
    // Aqui você pode usar lógica real para match ou apenas redirecionar
    navigate('/pet/1'); // exemplo
  };

  return (
    <div className={styles.matchContainer}>
      <h1 className={styles.title}>🎯 Encontre o Pet Ideal</h1>

      <form className={styles.form}>
        <input
          type="text"
          name="nome"
          placeholder="Seu nome"
          value={preferencias.nome}
          onChange={handleChange}
        />
        <input
          type="number"
          name="idade"
          placeholder="Sua idade"
          value={preferencias.idade}
          onChange={handleChange}
        />

        <select name="tipoResidencia" value={preferencias.tipoResidencia} onChange={handleChange}>
          <option value="">Tipo de residência</option>
          <option value="casa">Casa com quintal</option>
          <option value="apartamento">Apartamento</option>
          <option value="outro">Outro</option>
        </select>

        <select name="tempoDisponivel" value={preferencias.tempoDisponivel} onChange={handleChange}>
          <option value="">Tempo disponível por dia</option>
          <option value="muito">Muito tempo</option>
          <option value="medio">Médio</option>
          <option value="pouco">Pouco tempo</option>
        </select>

        <select name="temOutrosPets" value={preferencias.temOutrosPets} onChange={handleChange}>
          <option value="">Você já tem outros pets?</option>
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </select>

        <select name="preferePorte" value={preferencias.preferePorte} onChange={handleChange}>
          <option value="">Porte preferido</option>
          <option value="pequeno">Pequeno</option>
          <option value="medio">Médio</option>
          <option value="grande">Grande</option>
        </select>

        <select name="prefereSexo" value={preferencias.prefereSexo} onChange={handleChange}>
          <option value="">Sexo preferido do pet</option>
          <option value="macho">Macho</option>
          <option value="femea">Fêmea</option>
          <option value="tantoFaz">Tanto faz</option>
        </select>

        <select name="comportamentoDesejado" value={preferencias.comportamentoDesejado} onChange={handleChange}>
          <option value="">Comportamento desejado</option>
          <option value="calmo">Calmo</option>
          <option value="brincalhao">Brincalhão</option>
          <option value="guardiao">Protetor/Guarda</option>
        </select>

        <div className={styles.buttons}>
          <button type="button" onClick={handleSalvar} className={styles.saveButton}>Salvar Preferências</button>
          <button type="button" onClick={handleProcurarPet} className={styles.matchButton}>Encontrar Pet Ideal</button>
        </div>
      </form>
    </div>
  );
};

export default Match;
