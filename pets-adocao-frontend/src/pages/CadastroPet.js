import React, { useState } from 'react';
import styles from './CadastroPet.module.css';
import { FaPlus, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

const CadastroPet = () => {
  const [formData, setFormData] = useState({
    nome: '',
    especie: '',
    raca: '',
    dataNascimento: '',
    cor: '',
    sexo: '',
    porte: '',
    peso: '',
    comportamento: '',
    vacinas: [],
    necessidades: [],
  });

  const [vacinaInput, setVacinaInput] = useState('');
  const [necessidadeInput, setNecessidadeInput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addVacina = () => {
    if (vacinaInput) {
      setFormData((prev) => ({
        ...prev,
        vacinas: [...prev.vacinas, vacinaInput],
      }));
      setVacinaInput('');
    }
  };

  const addNecessidade = () => {
    if (necessidadeInput) {
      setFormData((prev) => ({
        ...prev,
        necessidades: [...prev.necessidades, necessidadeInput],
      }));
      setNecessidadeInput('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Pet cadastrado:', formData);
    alert('Pet cadastrado com sucesso!');
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.imageBox}>
          <div className={styles.imagePlaceholder}>
            <img src="/icons/image-placeholder.png" alt="Imagem do pet" />
          </div>
        </div>
        <div className={styles.summaryBox}>
          <h2>Nome <FaEdit size={14} /></h2>
          <div className={styles.descriptionBox}>
            <strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</strong>
            <p>
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Exemplo de descrição do pet adotado.
            </p>
            <FaEdit size={14} className={styles.editIcon} />
          </div>
          <button className={styles.adotadoBtn}>Adotado <FaEdit size={12} /></button>
        </div>
      </div>

      <form className={styles.formBox} onSubmit={handleSubmit}>
        <h3>Informações do pet</h3>

        <div className={styles.formGrid}>
          <div>
            <label>Espécie</label>
            <select name="especie" onChange={handleChange}>
              <option>Selecionar</option>
              <option value="Cachorro">Cachorro</option>
              <option value="Gato">Gato</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
          <div>
            <label>Sexo</label>
            <select name="sexo" onChange={handleChange}>
              <option>Selecionar</option>
              <option value="Fêmea">Fêmea</option>
              <option value="Macho">Macho</option>
            </select>
          </div>
          <div>
            <label>Comportamento</label>
            <select name="comportamento" onChange={handleChange}>
              <option>Selecionar</option>
              <option value="Calmo">Calmo</option>
              <option value="Brincalhão">Brincalhão</option>
              <option value="Tímido">Tímido</option>
            </select>
          </div>
          <div>
            <label>Raça</label>
            <input type="text" name="raca" placeholder="Raça" onChange={handleChange} />
          </div>
          <div>
            <label>Cor</label>
            <input type="text" name="cor" placeholder="Cor" onChange={handleChange} />
          </div>
          <div>
            <label>Data de nascimento</label>
            <input type="date" name="dataNascimento" onChange={handleChange} />
          </div>
          <div>
            <label>Peso</label>
            <input type="text" name="peso" placeholder="0KG" onChange={handleChange} />
          </div>
          <div className={styles.inlineAdd}>
            <label>Vacinas</label>
            <div>
              <input
                type="text"
                value={vacinaInput}
                onChange={(e) => setVacinaInput(e.target.value)}
                placeholder="Adicionar"
              />
              <button type="button" onClick={addVacina}>
                <FaPlus />
              </button>
            </div>
          </div>
          <div className={styles.inlineAdd}>
            <label>Necessidades</label>
            <div>
              <input
                type="text"
                value={necessidadeInput}
                onChange={(e) => setNecessidadeInput(e.target.value)}
                placeholder="Adicionar"
              />
              <button type="button" onClick={addNecessidade}>
                <FaPlus />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          <button type="button" className={styles.cancelBtn}>
            <FaTimes /> Cancelar
          </button>
          <button type="submit" className={styles.registerBtn}>
            <FaCheck /> Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroPet;
