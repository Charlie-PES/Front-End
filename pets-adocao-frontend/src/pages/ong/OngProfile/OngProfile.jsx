import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ongService } from '../../../services/ongService';
import styles from './OngProfile.module.css';

const OngProfile = () => {
  const { ongId } = useParams();
  const [ong, setOng] = useState(null);
  const [pets, setPets] = useState([]);
  const [adocoes, setAdocoes] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [mensagens, setMensagens] = useState([]);
  const [requisicoes, setRequisicoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [editedOng, setEditedOng] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Carregar dados iniciais
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [ongData, petsData, adocoesData, eventosData, mensagensData, requisicoesData] = await Promise.all([
          ongService.getOngProfile(ongId),
          ongService.getOngPets(ongId),
          ongService.getOngAdocoes(ongId),
          ongService.getOngEventos(ongId),
          ongService.getOngMensagens(ongId),
          ongService.getOngRequisicoes(ongId)
        ]);

        setOng(ongData);
        setEditedOng(ongData);
        setPets(petsData);
        setAdocoes(adocoesData);
        setEventos(eventosData);
        setMensagens(mensagensData);
        setRequisicoes(requisicoesData);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar dados da ONG');
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [ongId]);

  // Função para atualizar dados da ONG
  const handleUpdateOng = async () => {
    try {
      const updatedOng = await ongService.updateOngProfile(ongId, editedOng);
      setOng(updatedOng);
      setIsEditing(false);
      setFeedback('Dados atualizados com sucesso!');
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      setError('Erro ao atualizar dados');
      console.error('Erro:', err);
    }
  };

  // Função para atualizar status de adoção
  const handleUpdateAdocaoStatus = async (adocaoId, newStatus) => {
    try {
      await ongService.updateAdocaoStatus(ongId, adocaoId, newStatus);
      const updatedAdocoes = await ongService.getOngAdocoes(ongId);
      setAdocoes(updatedAdocoes);
      setFeedback('Status da adoção atualizado com sucesso!');
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      setError('Erro ao atualizar status da adoção');
      console.error('Erro:', err);
    }
  };

  // Função para atualizar status de requisição
  const handleUpdateRequisicaoStatus = async (requisicaoId, newStatus) => {
    try {
      await ongService.updateRequisicaoStatus(ongId, requisicaoId, newStatus);
      const updatedRequisicoes = await ongService.getOngRequisicoes(ongId);
      setRequisicoes(updatedRequisicoes);
      setFeedback('Status da requisição atualizado com sucesso!');
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      setError('Erro ao atualizar status da requisição');
      console.error('Erro:', err);
    }
  };

  // Função para gerar dias do mês
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Adiciona dias vazios no início
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Adiciona os dias do mês
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  // Função para verificar se um dia tem evento
  const hasEventOnDay = (date) => {
    return eventos.some(evento => {
      const eventoDate = new Date(evento.data);
      return eventoDate.getDate() === date.getDate() &&
             eventoDate.getMonth() === date.getMonth() &&
             eventoDate.getFullYear() === date.getFullYear();
    });
  };

  // Função para obter eventos de um dia
  const getEventsForDay = (date) => {
    return eventos.filter(evento => {
      const eventoDate = new Date(evento.data);
      return eventoDate.getDate() === date.getDate() &&
             eventoDate.getMonth() === date.getMonth() &&
             eventoDate.getFullYear() === date.getFullYear();
    });
  };

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!ong) {
    return <div className={styles.error}>ONG não encontrada</div>;
  }

  return (
    <div className={styles.ongProfile}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.ongInfo}>
          <div className={styles.ongLogo}>
            {ong.logo ? (
              <img src={ong.logo} alt={ong.razaoSocial} />
            ) : (
              <span>{ong.razaoSocial[0]}</span>
            )}
          </div>
          <h2>{ong.razaoSocial}</h2>
          <p className={styles.ongType}>ONG de Proteção Animal</p>
        </div>

        <nav className={styles.menu}>
          <button
            className={`${styles.menuItem} ${activeSection === 'dashboard' ? styles.active : ''}`}
            onClick={() => setActiveSection('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`${styles.menuItem} ${activeSection === 'pets' ? styles.active : ''}`}
            onClick={() => setActiveSection('pets')}
          >
            Pets
          </button>
          <button
            className={`${styles.menuItem} ${activeSection === 'adocoes' ? styles.active : ''}`}
            onClick={() => setActiveSection('adocoes')}
          >
            Adoções
          </button>
          <button
            className={`${styles.menuItem} ${activeSection === 'calendario' ? styles.active : ''}`}
            onClick={() => setActiveSection('calendario')}
          >
            Calendário
          </button>
          <button
            className={`${styles.menuItem} ${activeSection === 'mensagens' ? styles.active : ''}`}
            onClick={() => setActiveSection('mensagens')}
          >
            Mensagens
          </button>
          <button
            className={`${styles.menuItem} ${activeSection === 'requisicoes' ? styles.active : ''}`}
            onClick={() => setActiveSection('requisicoes')}
          >
            Requisições
          </button>
          <button
            className={`${styles.menuItem} ${activeSection === 'configuracoes' ? styles.active : ''}`}
            onClick={() => setActiveSection('configuracoes')}
          >
            Configurações
          </button>
        </nav>

        <button className={styles.logoutButton}>
          Sair
        </button>
      </aside>

      {/* Conteúdo Principal */}
      <main className={styles.content}>
        {feedback && (
          <div className={styles.feedbackMsg}>
            {feedback}
          </div>
        )}

        {activeSection === 'dashboard' && (
          <div className={`${styles.dashboardContent} ${styles.sectionContent} ${styles.active}`}>
            <h2>Dashboard</h2>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <h3>
                  <span role="img" aria-label="pets">🐾</span>
                  Total de Pets
                </h3>
                <p className={styles.statNumber}>{pets.length}</p>
                <p className={styles.statSubtitle}>
                  {pets.filter(p => p.status === 'disponivel').length} disponíveis para adoção
                </p>
              </div>
              <div className={styles.statCard}>
                <h3>
                  <span role="img" aria-label="adoptions">🏠</span>
                  Adoções Pendentes
                </h3>
                <p className={styles.statNumber}>
                  {adocoes.filter(a => a.status === 'pendente').length}
                </p>
                <p className={styles.statSubtitle}>
                  {adocoes.filter(a => a.status === 'aprovado').length} aprovadas este mês
                </p>
              </div>
              <div className={styles.statCard}>
                <h3>
                  <span role="img" aria-label="messages">✉️</span>
                  Mensagens Não Lidas
                </h3>
                <p className={styles.statNumber}>
                  {mensagens.filter(m => !m.lida).length}
                </p>
                <p className={styles.statSubtitle}>
                  {mensagens.length} mensagens no total
                </p>
              </div>
              <div className={styles.statCard}>
                <h3>
                  <span role="img" aria-label="requests">📋</span>
                  Requisições Pendentes
                </h3>
                <p className={styles.statNumber}>
                  {requisicoes.filter(r => r.status === 'pendente').length}
                </p>
                <p className={styles.statSubtitle}>
                  {requisicoes.filter(r => r.status === 'aprovado').length} aprovadas este mês
                </p>
              </div>
            </div>

            <div className={styles.recentActivity}>
              <h3>Atividades Recentes</h3>
              <div className={styles.activityList}>
                {[...adocoes, ...requisicoes]
                  .sort((a, b) => new Date(b.data) - new Date(a.data))
                  .slice(0, 5)
                  .map((item, index) => (
                    <div key={index} className={styles.activityItem}>
                      <div className={styles.activityIcon}>
                        {item.tipo === 'adocao' ? '🏠' : '📋'}
                      </div>
                      <div className={styles.activityContent}>
                        <p className={styles.activityTitle}>
                          {item.tipo === 'adocao' 
                            ? `Nova solicitação de adoção para ${item.pet.nome}`
                            : `Nova requisição: ${item.tipo}`}
                        </p>
                        <p className={styles.activityDate}>
                          {new Date(item.data).toLocaleDateString()}
                        </p>
                      </div>
                      <div className={styles.activityStatus}>
                        {item.status}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'pets' && (
          <div className={`${styles.petsContent} ${styles.sectionContent} ${styles.active}`}>
            <h2>Pets</h2>
            <div className={styles.petsGrid}>
              {pets.map(pet => (
                <div key={pet.id} className={styles.petCard}>
                  <h3>{pet.nome}</h3>
                  <p>Espécie: {pet.especie}</p>
                  <p>Raça: {pet.raca}</p>
                  <p>Idade: {pet.idade} anos</p>
                  <p>Status: {pet.status}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'adocoes' && (
          <div className={`${styles.adocoesContent} ${styles.sectionContent} ${styles.active}`}>
            <h2>Adoções</h2>
            <table className={styles.adocoesTable}>
              <thead>
                <tr>
                  <th>Pet</th>
                  <th>Adotante</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {adocoes.map(adocao => (
                  <tr key={adocao.id}>
                    <td>{adocao.pet.nome}</td>
                    <td>{adocao.adotante.nome}</td>
                    <td>{new Date(adocao.data).toLocaleDateString()}</td>
                    <td>{adocao.status}</td>
                    <td>
                      {adocao.status === 'pendente' && (
                        <>
                          <button onClick={() => handleUpdateAdocaoStatus(adocao.id, 'aprovado')}>
                            Aprovar
                          </button>
                          <button onClick={() => handleUpdateAdocaoStatus(adocao.id, 'rejeitado')}>
                            Rejeitar
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeSection === 'calendario' && (
          <div className={`${styles.calendarioContent} ${styles.sectionContent} ${styles.active}`}>
            <h2>Calendário de Eventos</h2>
            <div className={styles.calendarioControls}>
              <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}>
                ←
              </button>
              <h3>{currentMonth.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</h3>
              <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}>
                →
              </button>
            </div>

            <div className={styles.calendarioHeader}>
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                <span key={day}>{day}</span>
              ))}
            </div>

            <div className={styles.calendarioGrid}>
              {generateCalendarDays().map((date, index) => (
                <div
                  key={index}
                  className={`${styles.calendarioDia} ${
                    date && date.toDateString() === new Date().toDateString() ? styles.today : ''
                  } ${
                    date && hasEventOnDay(date) ? styles.hasEvent : ''
                  }`}
                  onClick={() => {
                    if (date) {
                      setSelectedDate(date);
                      setSelectedEvent(getEventsForDay(date)[0]);
                    }
                  }}
                >
                  {date ? date.getDate() : ''}
                </div>
              ))}
            </div>

            {selectedEvent && (
              <div className={styles.eventoPopup}>
                <h3>{selectedEvent.titulo}</h3>
                <p>Data: {new Date(selectedEvent.data).toLocaleDateString()}</p>
                <p>Local: {selectedEvent.local}</p>
                <p>Descrição: {selectedEvent.descricao}</p>
                <button onClick={() => setSelectedEvent(null)}>Fechar</button>
              </div>
            )}
          </div>
        )}

        {activeSection === 'mensagens' && (
          <div className={`${styles.mensagensContent} ${styles.sectionContent} ${styles.active}`}>
            <h2>Mensagens</h2>
            <ul className={styles.mensagensList}>
              {mensagens.map(mensagem => (
                <li key={mensagem.id} className={mensagem.lida ? '' : styles.naoLida}>
                  <h3>{mensagem.assunto}</h3>
                  <p>De: {mensagem.remetente}</p>
                  <p>Data: {new Date(mensagem.data).toLocaleDateString()}</p>
                  <p>{mensagem.conteudo}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeSection === 'requisicoes' && (
          <div className={`${styles.requisicoesContent} ${styles.sectionContent} ${styles.active}`}>
            <h2>Requisições</h2>
            <ul className={styles.requisicoesList}>
              {requisicoes.map(requisicao => (
                <li key={requisicao.id}>
                  <h3>{requisicao.tipo}</h3>
                  <p>Solicitante: {requisicao.solicitante}</p>
                  <p>Data: {new Date(requisicao.data).toLocaleDateString()}</p>
                  <p>Status: {requisicao.status}</p>
                  {requisicao.status === 'pendente' && (
                    <div>
                      <button onClick={() => handleUpdateRequisicaoStatus(requisicao.id, 'aprovado')}>
                        Aprovar
                      </button>
                      <button onClick={() => handleUpdateRequisicaoStatus(requisicao.id, 'rejeitado')}>
                        Rejeitar
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeSection === 'configuracoes' && (
          <div className={`${styles.configuracoesContent} ${styles.sectionContent} ${styles.active}`}>
            <h2>Configurações</h2>
            {isEditing ? (
              <form className={styles.ongEditForm} onSubmit={(e) => {
                e.preventDefault();
                handleUpdateOng();
              }}>
                <input
                  type="text"
                  value={editedOng.razaoSocial}
                  onChange={(e) => setEditedOng({...editedOng, razaoSocial: e.target.value})}
                  placeholder="Razão Social"
                />
                <input
                  type="text"
                  value={editedOng.cnpj}
                  onChange={(e) => setEditedOng({...editedOng, cnpj: e.target.value})}
                  placeholder="CNPJ"
                />
                <input
                  type="text"
                  value={editedOng.endereco}
                  onChange={(e) => setEditedOng({...editedOng, endereco: e.target.value})}
                  placeholder="Endereço"
                />
                <input
                  type="tel"
                  value={editedOng.telefone}
                  onChange={(e) => setEditedOng({...editedOng, telefone: e.target.value})}
                  placeholder="Telefone"
                />
                <input
                  type="email"
                  value={editedOng.email}
                  onChange={(e) => setEditedOng({...editedOng, email: e.target.value})}
                  placeholder="Email"
                />
                <textarea
                  value={editedOng.descricao}
                  onChange={(e) => setEditedOng({...editedOng, descricao: e.target.value})}
                  placeholder="Descrição"
                />
                <div className={styles.editButtons}>
                  <button type="submit" className={styles.saveBtn}>Salvar</button>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={() => {
                      setIsEditing(false);
                      setEditedOng(ong);
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <div className={styles.ongDetails}>
                <p><strong>Razão Social:</strong> {ong.razaoSocial}</p>
                <p><strong>CNPJ:</strong> {ong.cnpj}</p>
                <p><strong>Endereço:</strong> {ong.endereco}</p>
                <p><strong>Telefone:</strong> {ong.telefone}</p>
                <p><strong>Email:</strong> {ong.email}</p>
                <p><strong>Descrição:</strong> {ong.descricao}</p>
                <button
                  className={styles.editBtn}
                  onClick={() => setIsEditing(true)}
                >
                  Editar Dados
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default OngProfile; 