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

const OngProfile = () => {
  const { darkMode } = useContext(ThemeContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [feedback, setFeedback] = useState('');

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
    // window.location.reload(); // Removido para feedback dinâmico
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

  const renderContent = () => {
    switch (activeSection) {
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
      case 'calendario':
        return (
          <div className={styles.calendarioContent}>
            <h2>Calendário de Eventos</h2>
            <ul className={styles.eventList}>
              <li><b>10/06/2024</b> - Feira de Adoção no Parque Central</li>
              <li><b>15/06/2024</b> - Campanha de Vacinação</li>
              <li><b>20/06/2024</b> - Palestra: Cuidados com Animais Resgatados</li>
            </ul>
          </div>
        );
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
      {/* Botão de menu mobile */}
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
                {user?.createdAt && <p><b>Desde:</b> {new Date(user.createdAt).toLocaleDateString('pt-BR')}</p>}
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
              onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
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
        {renderContent()}
      </main>
    </div>
  );
};

export default OngProfile; 