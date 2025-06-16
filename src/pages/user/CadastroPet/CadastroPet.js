import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { FaCamera, FaPlus, FaTrash, FaPaw, FaDog, FaCat, FaHeart, FaSyringe, FaStethoscope } from 'react-icons/fa';
import styles from './CadastroPet.module.css';
import { useAuth } from '../../../contexts/AuthContext';
import { registerPet } from '../../../services/petService';

// Componente para cadastro de pets
const CadastroPet = () => {
  // Hooks para navegação e contexto de tema
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();

  // Estados para carregamento e mensagens de feedback
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    name: '',
    birthday_date: '',
    traits: {
      size: '',
      breed: '',
      color: '',
      fur_type: '',
      temperament: '',
      trained: false,
      description: ''
    },
    picture: '',
    is_available: true,
    owner_id: user ? user._id : '',
    additional_data: {
      vacinas: [''],
      doencas: ['']
    }
  });

  // Estado para armazenar erros de validação
  const [errors, setErrors] = useState({
    name: '',
    birthday_date: '',
    'traits.size': '',
    'traits.breed': '',
    'traits.color': '',
    'traits.fur_type': '',
    'traits.temperament': '',
    'traits.trained': '',
    'traits.description': '',
    picture: '',
    owner_id: '',
    'additional_data.vacinas': '',
    'additional_data.doencas': '',
  });

  // Estado para armazenar a prévia da imagem
  const [imagePreview, setImagePreview] = useState(null);

  // Opções para os dropdowns (baseado no schema PetIn)
  const sizes = ['small', 'medium', 'large'];
  const furTypes = ['short', 'medium', 'long', 'hairless'];
  const temperaments = ['calm', 'energetic', 'aggressive', 'friendly'];

  // Função para lidar com mudanças nos inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Lidar com checkboxes (trained)
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        traits: {
          ...prev.traits,
          [name]: checked
        }
      }));
    } else if (name.includes('.')) {
      // Lidar com campos aninhados (ex: traits.size, additional_data.vacinas)
      const [parent, child] = name.split('.');
      if (parent === 'traits') {
        setFormData(prev => ({
          ...prev,
          traits: {
            ...prev.traits,
            [child]: value
          }
        }));
      } else if (parent === 'additional_data') {
        setFormData(prev => ({
          ...prev,
          additional_data: {
            ...prev.additional_data,
            [child]: value
          }
        }));
      }
    } else {
      // Lidar com campos de nível superior
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Limpar erros se existirem
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Função para lidar com a seleção de imagem (agora aceita URL)
  const handlePictureChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      picture: value
    }));
  };

  // Função para adicionar ou remover vacinas
  const handleVacinaChange = (index, value) => {
    const newVacinas = [...formData.additional_data.vacinas];
    newVacinas[index] = value;
    setFormData(prev => ({
      ...prev,
      additional_data: {
        ...prev.additional_data,
        vacinas: newVacinas
      }
    }));
  };

  // Função para adicionar nova vacina
  const addVacina = () => {
    setFormData(prev => ({
      ...prev,
      additional_data: {
        ...prev.additional_data,
        vacinas: [...prev.additional_data.vacinas, '']
      }
    }));
  };

  // Função para remover vacina
  const removeVacina = (index) => {
    setFormData(prev => ({
      ...prev,
      additional_data: {
        ...prev.additional_data,
        vacinas: prev.additional_data.vacinas.filter((_, i) => i !== index)
      }
    }));
  };

  // Função para adicionar ou remover doenças
  const handleDoencaChange = (index, value) => {
    const newDoencas = [...formData.additional_data.doencas];
    newDoencas[index] = value;
    setFormData(prev => ({
      ...prev,
      additional_data: {
        ...prev.additional_data,
        doencas: newDoencas
      }
    }));
  };

  // Função para adicionar nova doença
  const addDoenca = () => {
    setFormData(prev => ({
      ...prev,
      additional_data: {
        ...prev.additional_data,
        doencas: [...prev.additional_data.doencas, '']
      }
    }));
  };

  // Função para remover doença
  const removeDoenca = (index) => {
    setFormData(prev => ({
      ...prev,
      additional_data: {
        ...prev.additional_data,
        doencas: prev.additional_data.doencas.filter((_, i) => i !== index)
      }
    }));
  };

  // Função para validar o formulário
  const validateForm = () => {
    const newErrors = {};
    let hasError = false;

    if (!formData.name.trim()) {
      newErrors.name = 'Nome do pet é obrigatório.';
      hasError = true;
    }
    if (!formData.birthday_date) {
      newErrors.birthday_date = 'Data de nascimento é obrigatória.';
      hasError = true;
    } else {
      // Validação simples de formato de data (AAAA-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(formData.birthday_date)) {
        newErrors.birthday_date = 'Formato de data inválido. Use AAAA-MM-DD.';
        hasError = true;
      }
    }

    // Validações de traits
    if (!formData.traits.size) {
      newErrors['traits.size'] = 'Porte é obrigatório.';
      hasError = true;
    }
    if (!formData.traits.breed.trim()) {
      newErrors['traits.breed'] = 'Raça é obrigatória.';
      hasError = true;
    }
    if (!formData.traits.color.trim()) {
      newErrors['traits.color'] = 'Cor é obrigatória.';
      hasError = true;
    }
    if (!formData.traits.fur_type) {
      newErrors['traits.fur_type'] = 'Tipo de pelo é obrigatório.';
      hasError = true;
    }
    if (!formData.traits.temperament) {
      newErrors['traits.temperament'] = 'Temperamento é obrigatório.';
      hasError = true;
    }
    if (!formData.traits.description.trim()) {
      newErrors['traits.description'] = 'Descrição é obrigatória.';
      hasError = true;
    }
    // Validação da URL da imagem
    if (formData.picture && !/^(ftp|http|https):\/\/[^ "]+$/.test(formData.picture)) {
      newErrors.picture = 'URL da imagem inválida.';
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  // Função para enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage({ type: 'error', text: 'Por favor, corrija os erros no formulário.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const petData = {
        name: formData.name,
        birthday_date: `${formData.birthday_date}T00:00:00Z`,
        traits: formData.traits,
        picture: formData.picture,
        is_available: formData.is_available,
        owner_id: formData.owner_id,
        additional_data: {
          vacinas: formData.additional_data.vacinas.filter(v => v.trim() !== ''),
          doencas: formData.additional_data.doencas.filter(d => d.trim() !== ''),
        },
      };

      console.log('Enviando dados do pet:', petData);
      const response = await registerPet(petData);
      console.log('Pet cadastrado com sucesso:', response);
      setMessage({ type: 'success', text: 'Pet cadastrado com sucesso!' });
      setTimeout(() => navigate('/feed'), 1500);

    } catch (error) {
      console.error('Erro no cadastro do pet:', error);
      setMessage({ type: 'error', text: error.response?.data?.detail || 'Erro ao cadastrar pet. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
      <div className={styles.top}>
        <div className={styles.imageBox}>
          <div className={styles.imagePlaceholder}>
            {formData.picture ? (
              <img src={formData.picture} alt="Preview" className={styles.previewImage} />
            ) : (
              <FaCamera className={styles.cameraIcon} />
            )}
          </div>
          {errors.picture && <span className={styles.error}>{errors.picture}</span>}
        </div>
        
        <div className={styles.summaryBox}>
          <h2><FaPaw /> Cadastro de Pet</h2>
          {message.text && (
            <div className={`${styles.message} ${styles[message.type]}`}>
              {message.text}
            </div>
          )}
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
            <label>Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Data de Nascimento</label>
            <input
              type="text"
              name="birthday_date"
              value={formData.birthday_date}
              onChange={handleInputChange}
              placeholder="Ex: 2023-01-15"
              required
              disabled={loading}
            />
            {errors.birthday_date && <span className={styles.error}>{errors.birthday_date}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Raça</label>
            <input
              type="text"
              name="traits.breed"
              value={formData.traits.breed}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
            {errors['traits.breed'] && <span className={styles.error}>{errors['traits.breed']}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Cor</label>
            <input
              type="text"
              name="traits.color"
              value={formData.traits.color}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
            {errors['traits.color'] && <span className={styles.error}>{errors['traits.color']}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Porte</label>
            <select
              name="traits.size"
              value={formData.traits.size}
              onChange={handleInputChange}
              required
              disabled={loading}
            >
              <option value="">Selecione</option>
              {sizes.map(size => (
                <option key={size} value={size}>{size.charAt(0).toUpperCase() + size.slice(1)}</option>
              ))}
            </select>
            {errors['traits.size'] && <span className={styles.error}>{errors['traits.size']}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Tipo de Pelo</label>
            <select
              name="traits.fur_type"
              value={formData.traits.fur_type}
              onChange={handleInputChange}
              required
              disabled={loading}
            >
              <option value="">Selecione</option>
              {furTypes.map(type => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
            {errors['traits.fur_type'] && <span className={styles.error}>{errors['traits.fur_type']}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Temperamento</label>
            <select
              name="traits.temperament"
              value={formData.traits.temperament}
              onChange={handleInputChange}
              required
              disabled={loading}
            >
              <option value="">Selecione</option>
              {temperaments.map(temperament => (
                <option key={temperament} value={temperament}>{temperament.charAt(0).toUpperCase() + temperament.slice(1)}</option>
              ))}
            </select>
            {errors['traits.temperament'] && <span className={styles.error}>{errors['traits.temperament']}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>URL da Imagem</label>
            <input
              type="text"
              name="picture"
              value={formData.picture}
              onChange={handlePictureChange}
              placeholder="Ex: https://exemplo.com/imagem.jpg"
              disabled={loading}
            />
            {errors.picture && <span className={styles.error}>{errors.picture}</span>}
          </div>

          <div className={styles.formCheckboxGroup}>
            <input
              type="checkbox"
              id="trained"
              name="trained"
              checked={formData.traits.trained}
              onChange={handleInputChange}
              disabled={loading}
            />
            <label htmlFor="trained">Treinado</label>
            {errors['traits.trained'] && <p className={styles.error}>{errors['traits.trained']}</p>}
          </div>

          <div className={`${styles.inputGroup} ${styles.descriptionInputGroup}`}>
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              name="traits.description"
              value={formData.traits.description}
              onChange={handleInputChange}
              placeholder="Descreva o pet"
              className={styles.textarea}
            ></textarea>
            {errors['traits.description'] && <p className={styles.error}>{errors['traits.description']}</p>}
          </div>

          <div className={`${styles.sectionTitle} ${styles.fullWidthGridItem}`}>
            <FaSyringe /> Vacinas
          </div>
          <div className={`${styles.inlineAdd} ${styles.fullWidthGridItem}`}>
            {formData.additional_data.vacinas.map((vacina, index) => (
              <div key={index} className={styles.inputWithButton}>
                <input
                  type="text"
                  value={vacina}
                  onChange={(e) => handleVacinaChange(index, e.target.value)}
                  placeholder="Nome da vacina"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => removeVacina(index)}
                  className={styles.removeButton}
                  disabled={loading}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addVacina}
              className={styles.addButton}
              disabled={loading}
            >
              <FaPlus /> Adicionar Vacina
            </button>
          </div>

          <div className={`${styles.sectionTitle} ${styles.fullWidthGridItem}`}>
            <FaStethoscope /> Doenças
          </div>
          <div className={`${styles.inlineAdd} ${styles.fullWidthGridItem}`}>
            {formData.additional_data.doencas.map((doenca, index) => (
              <div key={index} className={styles.inputWithButton}>
                <input
                  type="text"
                  value={doenca}
                  onChange={(e) => handleDoencaChange(index, e.target.value)}
                  placeholder="Nome da doença"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => removeDoenca(index)}
                  className={styles.removeButton}
                  disabled={loading}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addDoenca}
              className={styles.addButton}
              disabled={loading}
            >
              <FaPlus /> Adicionar Doença
            </button>
          </div>

        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar Pet'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroPet;
