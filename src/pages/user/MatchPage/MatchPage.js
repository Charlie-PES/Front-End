import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPaw, FaDog, FaCat, FaHome, FaClock, FaHeart, FaSave, FaSearch, FaUsers, FaLeaf } from 'react-icons/fa';
import { ThemeContext } from '../../../contexts/ThemeContext';
import styles from './MatchPage.module.css';

/**
 * Componente MatchPage
 * 
 * Este componente permite aos usuários encontrar o pet ideal com base em suas preferências.
 * Funcionalidades:
 * - Formulário de preferências para match de pets
 * - Salvamento de preferências
 * - Busca de pets compatíveis
 * - Suporte a modo escuro
 * - Design responsivo para dispositivos móveis
 * 
 * Estrutura para integração com backend:
 * - Funções assíncronas para salvar e buscar dados
 * - Tratamento de estados de carregamento e erros
 * - Validação de formulário
 */
const MatchPage = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  
  // Estado para armazenar as preferências do usuário
  const [preferencias, setPreferencias] = useState({
    nome: '',
    idade: '',
    tipoResidencia: '',
    tempoDisponivel: '',
    temOutrosPets: '',
    preferePorte: '',
    prefereSexo: '',
    comportamentoDesejado: '',
    tamanhoResidencia: '',
    temQuintal: false,
    temVaranda: false,
    trabalhaEmCasa: false,
    estiloDeVida: '',
    outrosPets: [],
    restricoes: []
  });
  
  // Estados para controle de UI
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  
  // Efeito para animação de entrada
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  /**
   * Atualiza o estado das preferências quando um campo é alterado
   * @param {Object} e - Evento de mudança do input
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferencias((prev) => ({ ...prev, [name]: value }));
    
    // Limpa o erro do campo quando o usuário começa a digitar
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  /**
   * Atualiza o estado das preferências quando um checkbox é alterado
   * @param {Object} e - Evento de mudança do checkbox
   */
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPreferencias((prev) => ({ ...prev, [name]: checked }));
  };
  
  /**
   * Atualiza o estado das preferências quando um campo de múltipla seleção é alterado
   * @param {Object} e - Evento de mudança do input
   */
  const handleMultiSelectChange = (e) => {
    const { name, value, checked } = e.target;
    setPreferencias((prev) => {
      const currentValues = prev[name] || [];
      if (checked) {
        return { ...prev, [name]: [...currentValues, value] };
      } else {
        return { ...prev, [name]: currentValues.filter(v => v !== value) };
      }
    });
  };
  
  /**
   * Valida o formulário antes de enviar
   * @returns {boolean} - True se o formulário for válido, false caso contrário
   */
  const validateForm = () => {
    const errors = {};
    
    if (!preferencias.nome.trim()) {
      errors.nome = 'Por favor, informe seu nome';
    }
    
    if (!preferencias.idade) {
      errors.idade = 'Por favor, informe sua idade';
    } else if (isNaN(preferencias.idade) || preferencias.idade < 0) {
      errors.idade = 'Idade inválida';
    }
    
    if (!preferencias.tipoResidencia) {
      errors.tipoResidencia = 'Por favor, selecione o tipo de residência';
    }
    
    if (!preferencias.tempoDisponivel) {
      errors.tempoDisponivel = 'Por favor, selecione o tempo disponível';
    }
    
    if (!preferencias.temOutrosPets) {
      errors.temOutrosPets = 'Por favor, selecione se já tem outros pets';
    }
    
    if (!preferencias.preferePorte) {
      errors.preferePorte = 'Por favor, selecione o porte preferido';
    }
    
    if (!preferencias.prefereSexo) {
      errors.prefereSexo = 'Por favor, selecione o sexo preferido';
    }
    
    if (!preferencias.comportamentoDesejado) {
      errors.comportamentoDesejado = 'Por favor, selecione o comportamento desejado';
    }
    
    if (!preferencias.estiloDeVida) {
      errors.estiloDeVida = 'Por favor, selecione seu estilo de vida';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  /**
   * Salva as preferências do usuário
   * Em produção, esta função faria uma chamada à API
   */
  const handleSalvar = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError(null);
    setSuccessMessage('');
    
    try {
      // Simula uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Em produção, aqui seria uma chamada à API
      // const response = await api.post('/preferencias', preferencias);
      
      // Salva no localStorage como fallback
      localStorage.setItem('preferencias', JSON.stringify(preferencias));
      
      setSuccessMessage('Preferências salvas com sucesso!');
      
      // Limpa a mensagem após 3 segundos
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      setError('Erro ao salvar preferências. Tente novamente mais tarde.');
      console.error('Erro ao salvar preferências:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Busca pets compatíveis com as preferências
   * Em produção, esta função faria uma chamada à API
   */
  const handleProcurarPet = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Simula uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Em produção, aqui seria uma chamada à API
      // const response = await api.get('/pets/match', { params: preferencias });
      // const pets = response.data;
      
      // Simula dados de pets compatíveis
      const pets = [
        { id: 1, nome: 'Max', tipo: 'cachorro', idade: 2, porte: 'médio', sexo: 'macho', comportamento: 'brincalhão' },
        { id: 2, nome: 'Luna', tipo: 'gato', idade: 1, porte: 'pequeno', sexo: 'fêmea', comportamento: 'calmo' },
        { id: 3, nome: 'Thor', tipo: 'cachorro', idade: 3, porte: 'grande', sexo: 'macho', comportamento: 'protetor' }
      ];
      
      // Navega para a página de resultados com os pets compatíveis
      navigate('/resultados-match', { state: { pets, preferencias } });
    } catch (err) {
      setError('Erro ao buscar pets compatíveis. Tente novamente mais tarde.');
      console.error('Erro ao buscar pets:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Carrega preferências salvas do localStorage
   */
  useEffect(() => {
    const savedPreferences = localStorage.getItem('preferencias');
    if (savedPreferences) {
      try {
        setPreferencias(JSON.parse(savedPreferences));
      } catch (err) {
        console.error('Erro ao carregar preferências:', err);
      }
    }
  }, []);
  
  return (
    <div className={`${styles.matchContainer} ${darkMode ? styles.darkMode : ''}`}>
      <div className={`${styles.matchContent} ${isVisible ? styles.visible : ''}`}>
        <h1 className={styles.title}>
          <FaPaw className={styles.titleIcon} />
          Encontre o Pet Ideal
        </h1>
        <p className={styles.subtitle}>
          Preencha suas preferências para encontrar o pet perfeito para você
        </p>
        
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}
        
        {successMessage && (
          <div className={styles.successMessage}>
            {successMessage}
          </div>
        )}
        
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.formGroup}>
            <label htmlFor="nome">Seu Nome</label>
            <input
              id="nome"
              type="text"
              name="nome"
              placeholder="Digite seu nome"
              value={preferencias.nome}
              onChange={handleChange}
              className={formErrors.nome ? styles.inputError : ''}
            />
            {formErrors.nome && <span className={styles.errorText}>{formErrors.nome}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="idade">Sua Idade</label>
            <input
              id="idade"
              type="number"
              name="idade"
              placeholder="Digite sua idade"
              value={preferencias.idade}
              onChange={handleChange}
              className={formErrors.idade ? styles.inputError : ''}
            />
            {formErrors.idade && <span className={styles.errorText}>{formErrors.idade}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="tipoResidencia">
              <FaHome className={styles.inputIcon} />
              Tipo de Residência
            </label>
            <select 
              id="tipoResidencia"
              name="tipoResidencia" 
              value={preferencias.tipoResidencia} 
              onChange={handleChange}
              className={formErrors.tipoResidencia ? styles.inputError : ''}
            >
              <option value="">Selecione o tipo de residência</option>
              <option value="apartamento">Apartamento</option>
              <option value="casa">Casa</option>
              <option value="sítio">Sítio</option>
            </select>
            {formErrors.tipoResidencia && <span className={styles.errorText}>{formErrors.tipoResidencia}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="tempoDisponivel">
              <FaClock className={styles.inputIcon} />
              Tempo Disponível
            </label>
            <select 
              id="tempoDisponivel"
              name="tempoDisponivel" 
              value={preferencias.tempoDisponivel} 
              onChange={handleChange}
              className={formErrors.tempoDisponivel ? styles.inputError : ''}
            >
              <option value="">Selecione o tempo disponível</option>
              <option value="muito">Muito tempo</option>
              <option value="medio">Médio</option>
              <option value="pouco">Pouco tempo</option>
            </select>
            {formErrors.tempoDisponivel && <span className={styles.errorText}>{formErrors.tempoDisponivel}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="temOutrosPets">
              <FaPaw className={styles.inputIcon} />
              Já Possui Outros Pets?
            </label>
            <select 
              id="temOutrosPets"
              name="temOutrosPets" 
              value={preferencias.temOutrosPets} 
              onChange={handleChange}
              className={formErrors.temOutrosPets ? styles.inputError : ''}
            >
              <option value="">Selecione uma opção</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>
            {formErrors.temOutrosPets && <span className={styles.errorText}>{formErrors.temOutrosPets}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="preferePorte">
              <FaDog className={styles.inputIcon} />
              Porte Preferido
            </label>
            <select 
              id="preferePorte"
              name="preferePorte" 
              value={preferencias.preferePorte} 
              onChange={handleChange}
              className={formErrors.preferePorte ? styles.inputError : ''}
            >
              <option value="">Selecione o porte preferido</option>
              <option value="pequeno">Pequeno</option>
              <option value="medio">Médio</option>
              <option value="grande">Grande</option>
            </select>
            {formErrors.preferePorte && <span className={styles.errorText}>{formErrors.preferePorte}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="prefereSexo">
              <FaHeart className={styles.inputIcon} />
              Sexo Preferido
            </label>
            <select 
              id="prefereSexo"
              name="prefereSexo" 
              value={preferencias.prefereSexo} 
              onChange={handleChange}
              className={formErrors.prefereSexo ? styles.inputError : ''}
            >
              <option value="">Selecione o sexo preferido</option>
              <option value="macho">Macho</option>
              <option value="femea">Fêmea</option>
              <option value="tantoFaz">Tanto faz</option>
            </select>
            {formErrors.prefereSexo && <span className={styles.errorText}>{formErrors.prefereSexo}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="comportamentoDesejado">
              <FaCat className={styles.inputIcon} />
              Comportamento Desejado
            </label>
            <select 
              id="comportamentoDesejado"
              name="comportamentoDesejado" 
              value={preferencias.comportamentoDesejado} 
              onChange={handleChange}
              className={formErrors.comportamentoDesejado ? styles.inputError : ''}
            >
              <option value="">Selecione o comportamento desejado</option>
              <option value="calmo">Calmo</option>
              <option value="brincalhao">Brincalhão</option>
              <option value="guardiao">Protetor/Guarda</option>
            </select>
            {formErrors.comportamentoDesejado && <span className={styles.errorText}>{formErrors.comportamentoDesejado}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="tamanhoResidencia">Tamanho da Residência (m²)</label>
            <input
              id="tamanhoResidencia"
              type="number"
              name="tamanhoResidencia"
              placeholder="Digite o tamanho em metros quadrados"
              value={preferencias.tamanhoResidencia}
              onChange={handleChange}
            />
          </div>

          <div className={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                name="temQuintal"
                checked={preferencias.temQuintal}
                onChange={handleCheckboxChange}
              />
              Possui quintal
            </label>
            <label>
              <input
                type="checkbox"
                name="temVaranda"
                checked={preferencias.temVaranda}
                onChange={handleCheckboxChange}
              />
              Possui varanda
            </label>
            <label>
              <input
                type="checkbox"
                name="trabalhaEmCasa"
                checked={preferencias.trabalhaEmCasa}
                onChange={handleCheckboxChange}
              />
              Trabalha em casa
            </label>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="estiloDeVida">
              <FaLeaf className={styles.inputIcon} />
              Estilo de Vida
            </label>
            <select
              id="estiloDeVida"
              name="estiloDeVida"
              value={preferencias.estiloDeVida}
              onChange={handleChange}
              className={formErrors.estiloDeVida ? styles.inputError : ''}
            >
              <option value="">Selecione seu estilo de vida</option>
              <option value="active">Ativo</option>
              <option value="calm">Calmo</option>
              <option value="balanced">Equilibrado</option>
            </select>
            {formErrors.estiloDeVida && <span className={styles.errorText}>{formErrors.estiloDeVida}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>
              <FaUsers className={styles.inputIcon} />
              Outros Pets (se houver)
            </label>
            <div className={styles.multiSelect}>
              {['Cachorro', 'Gato', 'Pássaro', 'Outro'].map(pet => (
                <label key={pet}>
                  <input
                    type="checkbox"
                    name="outrosPets"
                    value={pet.toLowerCase()}
                    checked={preferencias.outrosPets.includes(pet.toLowerCase())}
                    onChange={handleMultiSelectChange}
                  />
                  {pet}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Restrições</label>
            <div className={styles.multiSelect}>
              {['Alergia', 'Tempo limitado', 'Orçamento limitado', 'Sem restrições'].map(restricao => (
                <label key={restricao}>
                  <input
                    type="checkbox"
                    name="restricoes"
                    value={restricao.toLowerCase()}
                    checked={preferencias.restricoes.includes(restricao.toLowerCase())}
                    onChange={handleMultiSelectChange}
                  />
                  {restricao}
                </label>
              ))}
            </div>
          </div>
          
          <div className={styles.buttonGroup}>
            <button 
              type="button" 
              onClick={handleSalvar} 
              className={`${styles.saveButton} ${isLoading ? styles.loading : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className={styles.spinner}></span>
              ) : (
                <>
                  <FaSave className={styles.buttonIcon} />
                  Salvar Preferências
                </>
              )}
            </button>
            
            <button 
              type="button" 
              onClick={handleProcurarPet} 
              className={`${styles.searchButton} ${isLoading ? styles.loading : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className={styles.spinner}></span>
              ) : (
                <>
                  <FaSearch className={styles.buttonIcon} />
                  Encontrar Pets
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MatchPage;
