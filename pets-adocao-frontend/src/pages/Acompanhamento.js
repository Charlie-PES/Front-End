import React, { useState } from 'react';
import styles from './Acompanhamento.module.css';

const Acompanhamento = () => {
  const [petInfo, setPetInfo] = useState({ nome: '', data: '', raca: '', idade: '' });
  const [visitas, setVisitas] = useState([{ data: '', tipo: 'Consulta', observacoes: '' }]);
  const [registros, setRegistros] = useState([{ data: '', tipo: 'Vacinação', descricao: '' }]);

  const handleChangePetInfo = (e) => {
    const { name, value } = e.target;
    setPetInfo({ ...petInfo, [name]: value });
  };

  const handleAddVisita = () => {
    setVisitas([...visitas, { data: '', tipo: '', observacoes: '' }]);
  };

  const handleAddRegistro = () => {
    setRegistros([...registros, { data: '', tipo: '', descricao: '' }]);
  };

  const handleVisitaChange = (index, e) => {
    const newVisitas = [...visitas];
    newVisitas[index][e.target.name] = e.target.value;
    setVisitas(newVisitas);
  };

  const handleRegistroChange = (index, e) => {
    const newRegistros = [...registros];
    newRegistros[index][e.target.name] = e.target.value;
    setRegistros(newRegistros);
  };

  const handleEmitirRelatorio = () => {
    alert("Relatório gerado! (Funcionalidade futura)");
  };

  return (
    <div className={styles.container}>
      <h1>ACOMPANHAMENTO PÓS-ADOÇÃO <span role="img" aria-label="patinhas">🐾</span></h1>

      <section className={styles.card}>
        <h2>Informações do pet</h2>
        <input name="nome" placeholder="Nome do pet" value={petInfo.nome} onChange={handleChangePetInfo} />
        <input name="data" placeholder="Data da adoção" value={petInfo.data} onChange={handleChangePetInfo} />
        <input name="raca" placeholder="Raça" value={petInfo.raca} onChange={handleChangePetInfo} />
        <input name="idade" placeholder="Idade" value={petInfo.idade} onChange={handleChangePetInfo} />
      </section>

      <section className={styles.card}>
        <h2>Visitas e interações</h2>
        <button className={styles.addButton} onClick={handleAddVisita}>Adicionar visita</button>
        <table>
          <thead>
            <tr>
              <th>Data</th><th>Tipo</th><th>Observações</th><th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {visitas.map((v, index) => (
              <tr key={index}>
                <td><input name="data" value={v.data} onChange={(e) => handleVisitaChange(index, e)} /></td>
                <td><input name="tipo" value={v.tipo} onChange={(e) => handleVisitaChange(index, e)} /></td>
                <td><input name="observacoes" value={v.observacoes} onChange={(e) => handleVisitaChange(index, e)} /></td>
                <td><button>Editar</button> <button>Excluir</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={styles.card}>
        <h2>Registros de saúde</h2>
        <button className={styles.addButton} onClick={handleAddRegistro}>Adicionar registro</button>
        <table>
          <thead>
            <tr>
              <th>Data</th><th>Tipo</th><th>Descrição</th><th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((r, index) => (
              <tr key={index}>
                <td><input name="data" value={r.data} onChange={(e) => handleRegistroChange(index, e)} /></td>
                <td><input name="tipo" value={r.tipo} onChange={(e) => handleRegistroChange(index, e)} /></td>
                <td><input name="descricao" value={r.descricao} onChange={(e) => handleRegistroChange(index, e)} /></td>
                <td><button>Editar</button> <button>Excluir</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className={styles.reportSection}>
        <button className={styles.reportBtn} onClick={handleEmitirRelatorio}>Emitir Relatório</button>
      </div>
    </div>
  );
};

export default Acompanhamento;
