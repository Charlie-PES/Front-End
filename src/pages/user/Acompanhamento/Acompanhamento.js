import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { FaPaw, FaPlus, FaTrash, FaEdit, FaFileDownload, FaCalendarAlt, FaStethoscope, FaHeartbeat, FaCheck, FaTimes } from 'react-icons/fa';
import styles from './Acompanhamento.module.css';

/**
 * Componente de Acompanhamento Pós-Adoção
 * 
 * Este componente permite aos usuários acompanharem o progresso dos pets após a adoção,
 * registrando visitas, interações e registros de saúde.
 * 
 * Estrutura preparada para integração com backend:
 * - Funções de carregamento de dados (loadPetData, loadVisits, loadHealthRecords)
 * - Funções de salvamento (savePetInfo, saveVisit, saveHealthRecord)
 * - Funções de exclusão (deleteVisit, deleteHealthRecord)
 */
const Acompanhamento = () => {
  // Hooks para navegação e contexto de tema
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  
  // Estado para armazenar os dados do pet
  const [petInfo, setPetInfo] = useState({
    id: '',
    nome: '',
    dataAdocao: '',
    raca: '',
    idade: '',
    foto: '',
    tutor: '',
    status: 'ativo'
  });

  // Estado para armazenar as visitas e interações
  const [visitas, setVisitas] = useState([]);
  
  // Estado para armazenar os registros de saúde
  const [registros, setRegistros] = useState([]);
  
  // Estado para controlar o carregamento
  const [loading, setLoading] = useState(true);
  
  // Estado para controlar mensagens de feedback
  const [message, setMessage] = useState({ text: '', type: '' });

  /**
   * Carrega os dados do pet do backend
   * Esta função seria implementada para buscar os dados do pet do servidor
   */
  const loadPetData = async () => {
    try {
      setLoading(true);
      // Simulação de chamada à API
      // const response = await fetch(`/api/pets/${petId}`);
      // const data = await response.json();
      
      // Dados simulados para demonstração
      const mockData = {
        id: '1',
        nome: 'Max',
        dataAdocao: '2023-05-15',
        raca: 'Labrador',
        idade: '2 anos',
        foto: 'https://example.com/pet-image.jpg',
        tutor: 'João Silva',
        status: 'ativo'
      };
      
      setPetInfo(mockData);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar dados do pet:', error);
      setMessage({ text: 'Erro ao carregar dados do pet', type: 'error' });
      setLoading(false);
    }
  };

  /**
   * Carrega as visitas do backend
   * Esta função seria implementada para buscar as visitas do servidor
   */
  const loadVisits = async () => {
    try {
      // Simulação de chamada à API
      // const response = await fetch(`/api/pets/${petId}/visits`);
      // const data = await response.json();
      
      // Dados simulados para demonstração
      const mockVisits = [
        { id: '1', data: '2023-06-01', tipo: 'Consulta Veterinária', observacoes: 'Check-up de rotina, tudo bem' },
        { id: '2', data: '2023-07-15', tipo: 'Banho', observacoes: 'Banho e tosa realizados com sucesso' }
      ];
      
      setVisitas(mockVisits);
    } catch (error) {
      console.error('Erro ao carregar visitas:', error);
      setMessage({ text: 'Erro ao carregar visitas', type: 'error' });
    }
  };

  /**
   * Carrega os registros de saúde do backend
   * Esta função seria implementada para buscar os registros de saúde do servidor
   */
  const loadHealthRecords = async () => {
    try {
      // Simulação de chamada à API
      // const response = await fetch(`/api/pets/${petId}/health-records`);
      // const data = await response.json();
      
      // Dados simulados para demonstração
      const mockRecords = [
        { id: '1', data: '2023-05-20', tipo: 'Vacinação', descricao: 'Vacina contra raiva' },
        { id: '2', data: '2023-06-10', tipo: 'Medicamento', descricao: 'Antiparasitário' }
      ];
      
      setRegistros(mockRecords);
    } catch (error) {
      console.error('Erro ao carregar registros de saúde:', error);
      setMessage({ text: 'Erro ao carregar registros de saúde', type: 'error' });
    }
  };

  // Carrega os dados ao montar o componente
  useEffect(() => {
    loadPetData();
    loadVisits();
    loadHealthRecords();
  }, []);

  /**
   * Atualiza as informações do pet
   * @param {Event} e - Evento do formulário
   */
  const handleChangePetInfo = (e) => {
    const { name, value } = e.target;
    setPetInfo({ ...petInfo, [name]: value });
  };

  /**
   * Salva as informações do pet no backend
   * Esta função seria implementada para salvar as informações do pet no servidor
   */
  const savePetInfo = async () => {
    try {
      // Simulação de chamada à API
      // const response = await fetch(`/api/pets/${petInfo.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(petInfo)
      // });
      
      setMessage({ text: 'Informações do pet salvas com sucesso!', type: 'success' });
      
      // Limpa a mensagem após 3 segundos
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
    } catch (error) {
      console.error('Erro ao salvar informações do pet:', error);
      setMessage({ text: 'Erro ao salvar informações do pet', type: 'error' });
    }
  };

  /**
   * Adiciona uma nova visita à lista
   */
  const handleAddVisita = () => {
    setVisitas([...visitas, { id: Date.now().toString(), data: '', tipo: 'Consulta', observacoes: '' }]);
  };

  /**
   * Adiciona um novo registro de saúde à lista
   */
  const handleAddRegistro = () => {
    setRegistros([...registros, { id: Date.now().toString(), data: '', tipo: 'Vacinação', descricao: '' }]);
  };

  /**
   * Atualiza os dados de uma visita
   * @param {number} index - Índice da visita na lista
   * @param {Event} e - Evento do formulário
   */
  const handleVisitaChange = (index, e) => {
    const newVisitas = [...visitas];
    newVisitas[index][e.target.name] = e.target.value;
    setVisitas(newVisitas);
  };

  /**
   * Atualiza os dados de um registro de saúde
   * @param {number} index - Índice do registro na lista
   * @param {Event} e - Evento do formulário
   */
  const handleRegistroChange = (index, e) => {
    const newRegistros = [...registros];
    newRegistros[index][e.target.name] = e.target.value;
    setRegistros(newRegistros);
  };

  /**
   * Salva uma visita no backend
   * @param {Object} visita - Dados da visita
   * @param {number} index - Índice da visita na lista
   */
  const saveVisit = async (visita, index) => {
    try {
      // Simulação de chamada à API
      // const response = await fetch(`/api/pets/${petInfo.id}/visits`, {
      //   method: visita.id ? 'PUT' : 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(visita)
      // });
      
      // Atualiza o ID da visita se for uma nova visita
      if (!visita.id) {
        const newVisitas = [...visitas];
        newVisitas[index].id = 'new-id';
        setVisitas(newVisitas);
      }
      
      setMessage({ text: 'Visita salva com sucesso!', type: 'success' });
      
      // Limpa a mensagem após 3 segundos
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
    } catch (error) {
      console.error('Erro ao salvar visita:', error);
      setMessage({ text: 'Erro ao salvar visita', type: 'error' });
    }
  };

  /**
   * Salva um registro de saúde no backend
   * @param {Object} registro - Dados do registro
   * @param {number} index - Índice do registro na lista
   */
  const saveHealthRecord = async (registro, index) => {
    try {
      // Simulação de chamada à API
      // const response = await fetch(`/api/pets/${petInfo.id}/health-records`, {
      //   method: registro.id ? 'PUT' : 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(registro)
      // });
      
      // Atualiza o ID do registro se for um novo registro
      if (!registro.id) {
        const newRegistros = [...registros];
        newRegistros[index].id = 'new-id';
        setRegistros(newRegistros);
      }
      
      setMessage({ text: 'Registro de saúde salvo com sucesso!', type: 'success' });
      
      // Limpa a mensagem após 3 segundos
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
    } catch (error) {
      console.error('Erro ao salvar registro de saúde:', error);
      setMessage({ text: 'Erro ao salvar registro de saúde', type: 'error' });
    }
  };

  /**
   * Exclui uma visita do backend
   * @param {string} id - ID da visita
   */
  const deleteVisit = async (id) => {
    try {
      // Simulação de chamada à API
      // const response = await fetch(`/api/pets/${petInfo.id}/visits/${id}`, {
      //   method: 'DELETE'
      // });
      
      setVisitas(visitas.filter(v => v.id !== id));
      setMessage({ text: 'Visita excluída com sucesso!', type: 'success' });
      
      // Limpa a mensagem após 3 segundos
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
    } catch (error) {
      console.error('Erro ao excluir visita:', error);
      setMessage({ text: 'Erro ao excluir visita', type: 'error' });
    }
  };

  /**
   * Exclui um registro de saúde do backend
   * @param {string} id - ID do registro
   */
  const deleteHealthRecord = async (id) => {
    try {
      // Simulação de chamada à API
      // const response = await fetch(`/api/pets/${petInfo.id}/health-records/${id}`, {
      //   method: 'DELETE'
      // });
      
      setRegistros(registros.filter(r => r.id !== id));
      setMessage({ text: 'Registro de saúde excluído com sucesso!', type: 'success' });
      
      // Limpa a mensagem após 3 segundos
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
    } catch (error) {
      console.error('Erro ao excluir registro de saúde:', error);
      setMessage({ text: 'Erro ao excluir registro de saúde', type: 'error' });
    }
  };

  /**
   * Gera um relatório de acompanhamento
   * Esta função seria implementada para gerar um relatório no backend
   */
  const handleEmitirRelatorio = async () => {
    try {
      // Simulação de chamada à API
      // const response = await fetch(`/api/pets/${petInfo.id}/report`, {
      //   method: 'GET'
      // });
      // const blob = await response.blob();
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `relatorio-${petInfo.nome}.pdf`;
      // a.click();
      
      setMessage({ text: 'Relatório gerado com sucesso!', type: 'success' });
      
      // Limpa a mensagem após 3 segundos
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      setMessage({ text: 'Erro ao gerar relatório', type: 'error' });
    }
  };

  return (
    <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
      {/* Cabeçalho da página */}
      <header className={styles.header}>
        <h1>
          <FaPaw className={styles.icon} />
          Acompanhamento Pós-Adoção
        </h1>
        <p className={styles.subtitle}>
          Registre e acompanhe o progresso do seu pet após a adoção
        </p>
      </header>

      {/* Mensagem de feedback */}
      {message.text && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.type === 'success' ? <FaCheck /> : <FaTimes />}
          {message.text}
        </div>
      )}

      {/* Seção de informações do pet */}
      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>Informações do Pet</h2>
          <button 
            className={styles.saveButton} 
            onClick={savePetInfo}
          >
            Salvar
          </button>
        </div>
        
        <div className={styles.petInfoGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="nome">Nome do Pet</label>
            <input 
              id="nome"
              name="nome" 
              placeholder="Nome do pet" 
              value={petInfo.nome} 
              onChange={handleChangePetInfo} 
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="dataAdocao">Data da Adoção</label>
            <div className={styles.inputWithIcon}>
              <FaCalendarAlt className={styles.inputIcon} />
              <input 
                id="dataAdocao"
                name="dataAdocao" 
                type="date" 
                value={petInfo.dataAdocao} 
                onChange={handleChangePetInfo} 
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="raca">Raça</label>
            <input 
              id="raca"
              name="raca" 
              placeholder="Raça" 
              value={petInfo.raca} 
              onChange={handleChangePetInfo} 
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="idade">Idade</label>
            <input 
              id="idade"
              name="idade" 
              placeholder="Idade" 
              value={petInfo.idade} 
              onChange={handleChangePetInfo} 
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="tutor">Tutor</label>
            <input 
              id="tutor"
              name="tutor" 
              placeholder="Nome do tutor" 
              value={petInfo.tutor} 
              onChange={handleChangePetInfo} 
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="status">Status</label>
            <select 
              id="status"
              name="status" 
              value={petInfo.status} 
              onChange={handleChangePetInfo}
            >
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
              <option value="adotado">Adotado</option>
            </select>
          </div>
        </div>
      </section>

      {/* Seção de visitas e interações */}
      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>
            <FaCalendarAlt className={styles.sectionIcon} />
            Visitas e Interações
          </h2>
          <button 
            className={styles.addButton} 
            onClick={handleAddVisita}
          >
            <FaPlus /> Adicionar Visita
          </button>
        </div>
        
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Data</th>
                <th>Tipo</th>
                <th>Observações</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {visitas.length > 0 ? (
                visitas.map((visita, index) => (
                  <tr key={visita.id || index}>
                    <td>
                      <div className={styles.inputWithIcon}>
                        <FaCalendarAlt className={styles.inputIcon} />
                        <input 
                          name="data" 
                          type="date" 
                          value={visita.data} 
                          onChange={(e) => handleVisitaChange(index, e)} 
                        />
                      </div>
                    </td>
                    <td>
                      <select 
                        name="tipo" 
                        value={visita.tipo} 
                        onChange={(e) => handleVisitaChange(index, e)}
                      >
                        <option value="Consulta Veterinária">Consulta Veterinária</option>
                        <option value="Banho">Banho</option>
                        <option value="Tosa">Tosa</option>
                        <option value="Passeio">Passeio</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </td>
                    <td>
                      <textarea 
                        name="observacoes" 
                        value={visita.observacoes} 
                        onChange={(e) => handleVisitaChange(index, e)} 
                        placeholder="Observações sobre a visita"
                      />
                    </td>
                    <td className={styles.actions}>
                      <button 
                        className={styles.actionButton} 
                        onClick={() => saveVisit(visita, index)}
                        title="Salvar"
                      >
                        <FaCheck />
                      </button>
                      <button 
                        className={styles.actionButton} 
                        onClick={() => deleteVisit(visita.id)}
                        title="Excluir"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className={styles.emptyMessage}>
                    Nenhuma visita registrada. Adicione uma nova visita.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Seção de registros de saúde */}
      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>
            <FaStethoscope className={styles.sectionIcon} />
            Registros de Saúde
          </h2>
          <button 
            className={styles.addButton} 
            onClick={handleAddRegistro}
          >
            <FaPlus /> Adicionar Registro
          </button>
        </div>
        
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Data</th>
                <th>Tipo</th>
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {registros.length > 0 ? (
                registros.map((registro, index) => (
                  <tr key={registro.id || index}>
                    <td>
                      <div className={styles.inputWithIcon}>
                        <FaCalendarAlt className={styles.inputIcon} />
                        <input 
                          name="data" 
                          type="date" 
                          value={registro.data} 
                          onChange={(e) => handleRegistroChange(index, e)} 
                        />
                      </div>
                    </td>
                    <td>
                      <select 
                        name="tipo" 
                        value={registro.tipo} 
                        onChange={(e) => handleRegistroChange(index, e)}
                      >
                        <option value="Vacinação">Vacinação</option>
                        <option value="Medicamento">Medicamento</option>
                        <option value="Exame">Exame</option>
                        <option value="Cirurgia">Cirurgia</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </td>
                    <td>
                      <textarea 
                        name="descricao" 
                        value={registro.descricao} 
                        onChange={(e) => handleRegistroChange(index, e)} 
                        placeholder="Descrição do registro de saúde"
                      />
                    </td>
                    <td className={styles.actions}>
                      <button 
                        className={styles.actionButton} 
                        onClick={() => saveHealthRecord(registro, index)}
                        title="Salvar"
                      >
                        <FaCheck />
                      </button>
                      <button 
                        className={styles.actionButton} 
                        onClick={() => deleteHealthRecord(registro.id)}
                        title="Excluir"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className={styles.emptyMessage}>
                    Nenhum registro de saúde registrado. Adicione um novo registro.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Seção de relatório */}
      <div className={styles.reportSection}>
        <button 
          className={styles.reportBtn} 
          onClick={handleEmitirRelatorio}
        >
          <FaFileDownload /> Emitir Relatório
        </button>
      </div>
    </div>
  );
};

export default Acompanhamento;
