import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { FaCamera, FaPlus, FaTrash, FaPaw, FaDog, FaCat, FaHeart, FaSyringe, FaStethoscope } from 'react-icons/fa';
import styles from './CadastroPet.module.css';

// Componente para cadastro de pets
const CadastroPet = () => {
  // Hooks para navegação e contexto de tema
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    tipo: '',
    raca: '',
    idade: '',
    sexo: '',
    tamanho: '',
    cor: '',
    descricao: '',
    vacinas: [''],
    necessidades: [''],
    foto: null
  });

  // Estado para armazenar a prévia da imagem
  const [imagePreview, setImagePreview] = useState(null);

  // Função para lidar com mudanças nos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Função para lidar com a seleção de imagem
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        foto: file
      }));
      
      // Criar URL para prévia da imagem
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para adicionar ou remover vacinas
  const handleVacinaChange = (index, value) => {
    const newVacinas = [...formData.vacinas];
    newVacinas[index] = value;
    setFormData(prev => ({
      ...prev,
      vacinas: newVacinas
    }));
  };

  // Função para adicionar nova vacina
  const addVacina = () => {
    setFormData(prev => ({
      ...prev,
      vacinas: [...prev.vacinas, '']
    }));
  };

  // Função para remover vacina
  const removeVacina = (index) => {
    setFormData(prev => ({
      ...prev,
      vacinas: prev.vacinas.filter((_, i) => i !== index)
    }));
  };

  // Função para adicionar ou remover necessidades
  const handleNecessidadeChange = (index, value) => {
    const newNecessidades = [...formData.necessidades];
    newNecessidades[index] = value;
    setFormData(prev => ({
      ...prev,
      necessidades: newNecessidades
    }));
  };

  // Função para adicionar nova necessidade
  const addNecessidade = () => {
    setFormData(prev => ({
      ...prev,
      necessidades: [...prev.necessidades, '']
    }));
  };

  // Função para remover necessidade
  const removeNecessidade = (index) => {
    setFormData(prev => ({
      ...prev,
      necessidades: prev.necessidades.filter((_, i) => i !== index)
    }));
  };

  // Função para enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você implementaria a lógica para enviar os dados para o backend
    console.log('Dados do formulário:', formData);
    alert('Pet cadastrado com sucesso!');
    navigate('/feed');
  };

  return (
    <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
      <div className={styles.top}>
        <div className={styles.imageBox}>
          <div className={styles.imagePlaceholder}>
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className={styles.previewImage} />
            ) : (
              <FaCamera className={styles.cameraIcon} />
            )}
          </div>
          <label className={styles.uploadButton}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.fileInput}
            />
            <FaCamera /> Adicionar Foto
          </label>
        </div>
        
        <div className={styles.summaryBox}>
          <h2><FaPaw /> Cadastro de Pet</h2>
          <div className={styles.descriptionBox}>
            <p>Preencha os dados do pet para cadastrá-lo em nossa plataforma. 
               Quanto mais informações você fornecer, maiores serão as chances de encontrar um lar amoroso!</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.formBox}>
        <h3>Informações do Pet</h3>
        
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Nome do Pet</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Tipo</label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione</option>
              <option value="cachorro">Cachorro</option>
              <option value="gato">Gato</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Raça</label>
            <input
              type="text"
              name="raca"
              value={formData.raca}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Idade</label>
            <input
              type="text"
              name="idade"
              value={formData.idade}
              onChange={handleInputChange}
              placeholder="Ex: 2 anos"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Sexo</label>
            <select
              name="sexo"
              value={formData.sexo}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione</option>
              <option value="macho">Macho</option>
              <option value="femea">Fêmea</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Tamanho</label>
            <select
              name="tamanho"
              value={formData.tamanho}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione</option>
              <option value="pequeno">Pequeno</option>
              <option value="medio">Médio</option>
              <option value="grande">Grande</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Cor</label>
            <input
              type="text"
              name="cor"
              value={formData.cor}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Descrição</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleInputChange}
            rows="4"
            required
          />
        </div>

        <div className={styles.sectionTitle}>
          <FaSyringe /> Vacinas
        </div>
        <div className={styles.inlineAdd}>
          {formData.vacinas.map((vacina, index) => (
            <div key={index}>
              <input
                type="text"
                value={vacina}
                onChange={(e) => handleVacinaChange(index, e.target.value)}
                placeholder="Nome da vacina"
              />
              <button
                type="button"
                onClick={() => removeVacina(index)}
                className={styles.removeButton}
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addVacina}
            className={styles.addButton}
          >
            <FaPlus /> Adicionar Vacina
          </button>
        </div>

        <div className={styles.sectionTitle}>
          <FaStethoscope /> Necessidades Especiais
        </div>
        <div className={styles.inlineAdd}>
          {formData.necessidades.map((necessidade, index) => (
            <div key={index}>
              <input
                type="text"
                value={necessidade}
                onChange={(e) => handleNecessidadeChange(index, e.target.value)}
                placeholder="Descreva a necessidade especial"
              />
              <button
                type="button"
                onClick={() => removeNecessidade(index)}
                className={styles.removeButton}
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addNecessidade}
            className={styles.addButton}
          >
            <FaPlus /> Adicionar Necessidade
          </button>
        </div>

        <div className={styles.buttons}>
          <button
            type="button"
            onClick={() => navigate('/feed')}
            className={styles.cancelBtn}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={styles.registerBtn}
          >
            Cadastrar Pet
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroPet;
