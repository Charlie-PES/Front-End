import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Adotar.module.css';

const Adotar = () => {
  const [filtros, setFiltros] = useState({
    comportamento: '',
    tamanho: '',
    sexo: [],
    especial: '',
  });

  const pets = [
    { id: 1, nome: 'Carlinhos', imagem: '/images/dog1.png', sexo: 'Fêmea', porte: 'Pequeno', comportamento: 'Calmo', especial: 'Não' },
    { id: 2, nome: 'Bolinha', imagem: '/images/dog2.png', sexo: 'Macho', porte: 'Médio', comportamento: 'Protetor', especial: 'Não' },
    { id: 3, nome: 'Apolo', imagem: '/images/dog3.png', sexo: 'Fêmea', porte: 'Grande', comportamento: 'Brincalhão', especial: 'Sim' },
    { id: 4, nome: 'Gaia', imagem: '/images/dog4.png', sexo: 'Fêmea', porte: 'Médio', comportamento: 'Brincalhão', especial: 'Não' },
    { id: 5, nome: 'Spike', imagem: '/images/dog5.png', sexo: 'Macho', porte: 'Grande', comportamento: 'Calmo', especial: 'Sim' },
    { id: 6, nome: 'Duduzão', imagem: '/images/dog6.png', sexo: 'Fêmea', porte: 'Pequeno', comportamento: 'Protetor', especial: 'Não' },
    { id: 7, nome: 'Jaime', imagem: '/images/dog7.png', sexo: 'Macho', porte: 'Pequeno', comportamento: 'Calmo', especial: 'Sim' },
    { id: 8, nome: 'Mister bigodes', imagem: '/images/cat1.png', sexo: 'Macho', porte: 'Pequeno', comportamento: 'Calmo', especial: 'Sim' },
    { id: 9, nome: 'Alho', imagem: '/images/cat2.png', sexo: 'Macho', porte: 'Pequeno', comportamento: 'Calmo', especial: 'Sim' }
  ];

  const toggleSexo = (valor) => {
    setFiltros((prev) => ({
      ...prev,
      sexo: prev.sexo.includes(valor)
        ? prev.sexo.filter((s) => s !== valor)
        : [...prev.sexo, valor],
    }));
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetarFiltros = () => {
    setFiltros({
      comportamento: '',
      tamanho: '',
      sexo: [],
      especial: '',
    });
  };

  const petsFiltrados = pets.filter((pet) => {
    const sexoMatch = filtros.sexo.length === 0 || filtros.sexo.includes(pet.sexo);
    const porteMatch = !filtros.tamanho || pet.porte === filtros.tamanho;
    const comportamentoMatch = !filtros.comportamento || pet.comportamento === filtros.comportamento;
    const especialMatch = !filtros.especial || pet.especial === filtros.especial;
    return sexoMatch && porteMatch && comportamentoMatch && especialMatch;
  });

  return (
    <div className={styles.adotarContainer}>
      <aside className={styles.sidebar}>
        <h2>Filtrar</h2>

        <div className={styles.filterGroup}>
          <label>Comportamento</label>
          <select name="comportamento" onChange={handleFiltroChange} value={filtros.comportamento}>
            <option value="">Todos</option>
            <option value="Brincalhão">Brincalhão</option>
            <option value="Calmo">Calmo</option>
            <option value="Protetor">Protetor</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Porte</label>
          <select name="tamanho" onChange={handleFiltroChange} value={filtros.tamanho}>
            <option value="">Todos</option>
            <option value="Pequeno">Pequeno</option>
            <option value="Médio">Médio</option>
            <option value="Grande">Grande</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <h3 className={styles.checkboxGroupTitle}>Sexo</h3>
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                onChange={() => toggleSexo('Fêmea')}
                checked={filtros.sexo.includes('Fêmea')}
                className={styles.checkboxInput}
              />
              <span className={styles.checkboxCustom}></span>
              Fêmea
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                onChange={() => toggleSexo('Macho')}
                checked={filtros.sexo.includes('Macho')}
                className={styles.checkboxInput}
              />
              <span className={styles.checkboxCustom}></span>
              Macho
            </label>
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label>Necessidades especiais</label>
          <select name="especial" onChange={handleFiltroChange} value={filtros.especial}>
            <option value="">Todos</option>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>
        </div>

        <button className={styles.resetBtn} onClick={resetarFiltros}>Limpar filtros</button>
      </aside>

      <main className={styles.petsGrid}>
        {petsFiltrados.map((pet) => (
          <div key={pet.id} className={`${styles.petCard} ${styles.fadeIn}`}>
            <img src={pet.imagem} alt={pet.nome} />
            <h3>{pet.nome}</h3>
            <Link to={`/match/${pet.id}`}>
              <button className={styles.adotarBtn}>ME ADOTE</button>
            </Link>
          </div>
        ))}
        {petsFiltrados.length === 0 && (
          <p className={styles.noResults}>Nenhum pet encontrado com os filtros selecionados 🐾</p>
        )}
      </main>
    </div>
  );
};

export default Adotar;
