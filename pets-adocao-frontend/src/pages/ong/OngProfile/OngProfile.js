import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './OngProfile.module.css';
import { 
  FaBuilding, 
  FaCalendarAlt, 
  FaEnvelope, 
  FaUsers, 
  FaPaw, 
  FaChartLine, 
  FaCog, 
  FaBell,
  FaSignOutAlt,
  FaBars
} from 'react-icons/fa';

// Função utilitária para gerar matriz do calendário
function getCalendarMatrix(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const matrix = [];
  let week = [];
  let dayOfWeek = firstDay.getDay();
  for (let i = 0; i < dayOfWeek; i++) week.push(null);
  for (let day = 1; day <= lastDay.getDate(); day++) {
    week.push(new Date(year, month, day));
    if (week.length === 7) {
      matrix.push(week);
      week = [];
    }
  }
  if (week.length) {
    while (week.length < 7) week.push(null);
    matrix.push(week);
  }
  return matrix;
}

const OngProfile = () => {
  const { darkMode } = useContext(ThemeContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [prevSection, setPrevSection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showActive, setShowActive] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [calendarDate, setCalendarDate] = useState(new Date());

  useEffect(() => {
    if (user) {
      setFormData({
        razaoSocial: user.razaoSocial || '',
        cnpj: user.cnpj || '',
        endereco: user.endereco || '',
        telefone: user.telefone || '',
        email: user.email || '',
        descricao: user.descricao || '',
        createdAt: user.createdAt || '',
      });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => setEditMode(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSave = (e) => {
    e.preventDefault();
    setEditMode(false);
    setFeedback('Dados salvos com sucesso!');
    setTimeout(() => setFeedback(''), 2000);
  };

  const handleSectionChange = (section) => {
    if (section === activeSection || isAnimating) return;
    setPrevSection(activeSection);
    setIsAnimating(true);
    setShowActive(false);
    setTimeout(() => {
      setActiveSection(section);
      setPrevSection(null);
      setIsAnimating(false);
      setShowActive(true);
    }, 500);
  };

  const menuItems = [
    { id: 'dashboard', icon: <FaChartLine />, label: 'Dashboard' },
    { id: 'pets', icon: <FaPaw />, label: 'Pets' },
    { id: 'adocoes', icon: <FaUsers />, label: 'Adoções' },
    { id: 'calendario', icon: <FaCalendarAlt />, label: 'Calendário' },
    { id: 'mensagens', icon: <FaEnvelope />, label: 'Mensagens' },
    { id: 'requisicoes', icon: <FaBell />, label: 'Requisições' },
    { id: 'configuracoes', icon: <FaCog />, label: 'Configurações' },
  ];

  // Exemplo de eventos
  const eventos = [
    { data: '2024-06-10', titulo: 'Feira de Adoção' },
    { data: '2024-06-15', titulo: 'Campanha de Vacinação' },
    { data: '2024-06-20', titulo: 'Palestra' }
  ];
  const hasEvent = (date) => {
    if (!date) return false;
    return eventos.some(ev => {
      const d = new Date(ev.data);
      return d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear();
    });
  };

  const renderContent = (section) => {
    switch (section) {
      case 'dashboard':
        return (
          <div className={styles.dashboardContent}>
            <h2>Dashboard</h2>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <h3>Pets Disponíveis</h3>
                <p className={styles.statNumber}>24</p>
              </div>
              <div className={styles.statCard}>
                <h3>Adoções Pendentes</h3>
                <p className={styles.statNumber}>8</p>
              </div>
              <div className={styles.statCard}>
                <h3>Mensagens Não Lidas</h3>
                <p className={styles.statNumber}>12</p>
              </div>
              <div className={styles.statCard}>
                <h3>Eventos do Mês</h3>
                <p className={styles.statNumber}>5</p>
              </div>
            </div>
          </div>
        );
      case 'pets':
        return (
          <div className={styles.petsContent}>
            <h2>Gerenciamento de Pets</h2>
            <div className={styles.petsGrid}>
              <div className={styles.petCard}><b>Nome:</b> Thor<br/><b>Espécie:</b> Cachorro<br/><b>Status:</b> <span style={{color:'#00796b', fontWeight:'bold'}}>Disponível</span></div>
              <div className={styles.petCard}><b>Nome:</b> Luna<br/><b>Espécie:</b> Gato<br/><b>Status:</b> <span style={{color:'#e65100', fontWeight:'bold'}}>Adotado</span></div>
              <div className={styles.petCard}><b>Nome:</b> Mel<br/><b>Espécie:</b> Cachorro<br/><b>Status:</b> <span style={{color:'#00796b', fontWeight:'bold'}}>Disponível</span></div>
            </div>
          </div>
        );
      case 'adocoes':
        return (
          <div className={styles.adocoesContent}>
            <h2>Processos de Adoção</h2>
            <table className={styles.adocoesTable}>
              <thead><tr><th>Pet</th><th>Adotante</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td>Thor</td><td>Maria Silva</td><td><span style={{color:'#f57c00', fontWeight:'bold'}}>Pendente</span></td></tr>
                <tr><td>Luna</td><td>João Souza</td><td><span style={{color:'#388e3c', fontWeight:'bold'}}>Finalizado</span></td></tr>
                <tr><td>Mel</td><td>-</td><td><span style={{color:'#00796b', fontWeight:'bold'}}>Disponível</span></td></tr>
              </tbody>
            </table>
          </div>
        );
      case 'calendario': {
        const year = calendarDate.getFullYear();
        const month = calendarDate.getMonth();
        const today = new Date();
        const calendarMatrix = getCalendarMatrix(year, month);
        return (
          <div className={styles.calendarioContent}>
            <h2>Calendário de Eventos</h2>
            <div className={styles.calendarioControls}>
              <button onClick={() => setCalendarDate(new Date(year, month - 1, 1))}>&lt;</button>
              <span>{calendarDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</span>
              <button onClick={() => setCalendarDate(new Date(year, month + 1, 1))}>&gt;</button>
            </div>
            <div className={styles.calendarioGrid}>
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((d) => (
                <div key={d} className={styles.calendarioHeaderCell}>{d}</div>
              ))}
              {calendarMatrix.flat().map((date, idx) => (
                <div
                  key={idx}
                  className={[
                    styles.calendarioCell,
                    date && date.toDateString() === today.toDateString() ? styles.calendarioToday : '',
                    hasEvent(date) ? styles.calendarioEvent : ''
                  ].join(' ')}
                >
                  {date && date.getDate()}
                  {hasEvent(date) && <span className={styles.eventDot} title="Evento"></span>}
                </div>
              ))}
            </div>
          </div>
        );
      }
      case 'mensagens':
        return (
          <div className={styles.mensagensContent}>
            <h2>Caixa de Entrada</h2>
            <ul className={styles.mensagensList}>
              <li><b>De:</b> Carlos (adotante) <br/><b>Assunto:</b> Interesse em adoção do Thor<br/><i>"Olá, gostaria de saber mais sobre o Thor..."</i></li>
              <li><b>De:</b> Ana (voluntária) <br/><b>Assunto:</b> Ajuda no evento<br/><i>"Posso ajudar na feira de adoção?"</i></li>
            </ul>
          </div>
        );
      case 'requisicoes':
        return (
          <div className={styles.requisicoesContent}>
            <h2>Requisições Pendentes</h2>
            <ul className={styles.requisicoesList}>
              <li><b>Tipo:</b> Doação de ração <br/><b>Solicitante:</b> PetShop BomPet <br/><b>Status:</b> <span style={{color:'#f57c00', fontWeight:'bold'}}>Pendente</span></li>
              <li><b>Tipo:</b> Voluntariado <br/><b>Solicitante:</b> Julia Lima <br/><b>Status:</b> <span style={{color:'#2e7d32', fontWeight:'bold'}}>Aprovado</span></li>
            </ul>
          </div>
        );
      case 'configuracoes':
        return (
          <div className={styles.configuracoesContent}>
            <h2>Configurações da ONG</h2>
            <div className={styles.configuracoesForm}>
              <label>Alterar senha:<br/><input type="password" placeholder="Nova senha" style={{marginTop:4}} /></label>
              <label><input type="checkbox" defaultChecked /> Receber notificações por email</label>
              <button className={styles.saveBtn} style={{marginTop:8}}>Salvar Configurações</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`${styles.ongProfile} ${darkMode ? styles.darkMode : ''}`}>
      <button className={styles.menuToggle} onClick={() => setSidebarOpen(!sidebarOpen)}>
        <FaBars size={22} />
      </button>
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        <div className={styles.ongInfo}>
          <div className={styles.ongLogo}>
            <FaBuilding size={40} />
          </div>
          {editMode ? (
            <form className={styles.ongEditForm} onSubmit={handleSave}>
              <input name="razaoSocial" value={formData.razaoSocial} onChange={handleChange} placeholder="Razão Social" required />
              <input name="cnpj" value={formData.cnpj} onChange={handleChange} placeholder="CNPJ" required />
              <input name="endereco" value={formData.endereco} onChange={handleChange} placeholder="Endereço" />
              <input name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Telefone" />
              <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
              <textarea name="descricao" value={formData.descricao} onChange={handleChange} placeholder="Descrição da ONG" rows={3} />
              <div className={styles.editButtons}>
                <button type="submit" className={styles.saveBtn}>Salvar</button>
                <button type="button" className={styles.cancelBtn} onClick={handleCancel}>Cancelar</button>
              </div>
            </form>
          ) : (
            <>
              <h2>{user?.razaoSocial || user?.displayName || 'Nome da ONG'}</h2>
              <div className={styles.ongDetails}>
                {user?.cnpj && <p><b>CNPJ:</b> {user.cnpj}</p>}
                {user?.endereco && <p><b>Endereço:</b> {user.endereco}</p>}
                {user?.telefone && <p><b>Telefone:</b> {user.telefone}</p>}
                {user?.email && <p><b>Email:</b> {user.email}</p>}
                {user?.descricao && <p><b>Descrição:</b> {user.descricao}</p>}
                {user?.createdAt && <p><b>Desde:</b> {new Date(user?.createdAt).toLocaleDateString('pt-BR')}</p>}
              </div>
              <p className={styles.ongType}>Organização Não Governamental</p>
              <button className={styles.editBtn} onClick={handleEdit}>Editar dados</button>
            </>
          )}
          {feedback && <div className={styles.feedbackMsg}>{feedback}</div>}
        </div>
        <nav className={styles.menu}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`${styles.menuItem} ${activeSection === item.id ? styles.active : ''}`}
              onClick={() => { handleSectionChange(item.id); setSidebarOpen(false); }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <button className={styles.logoutButton} onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Sair</span>
        </button>
      </aside>
      <main className={styles.content}>
        {prevSection && (
          <div className={`${styles.sectionContent} ${styles.fadeOut}`}>
            {renderContent(prevSection)}
          </div>
        )}
        {showActive && (
          <div className={`${styles.sectionContent} ${styles.active}`}>
            {renderContent(activeSection)}
          </div>
        )}
      </main>
    </div>
  );
};

export default OngProfile; 