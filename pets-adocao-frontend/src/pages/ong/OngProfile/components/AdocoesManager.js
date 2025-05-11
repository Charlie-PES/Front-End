import React, { useState } from 'react';
import { FaCheck, FaTimes, FaClock, FaUser, FaPaw } from 'react-icons/fa';
import styles from './AdocoesManager.module.css';

const AdocoesManager = () => {
  const [adocoes, setAdocoes] = useState([
    {
      id: 1,
      pet: {
        name: 'Rex',
        image: 'https://via.placeholder.com/150',
        type: 'Cachorro'
      },
      adotante: {
        name: 'João Silva',
        email: 'joao@email.com',
        phone: '(11) 99999-9999'
      },
      status: 'Pendente',
      dataSolicitacao: '2024-03-15',
      observacoes: 'Interessado em adotar um cachorro para companhia.'
    },
    // Adicione mais adoções aqui
  ]);

  const handleStatusChange = (id, newStatus) => {
    setAdocoes(adocoes.map(adocao =>
      adocao.id === id ? { ...adocao, status: newStatus } : adocao
    ));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Aprovado':
        return <FaCheck className={styles.statusIcon} />;
      case 'Rejeitado':
        return <FaTimes className={styles.statusIcon} />;
      case 'Pendente':
        return <FaClock className={styles.statusIcon} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.adocoesManager}>
      <div className={styles.header}>
        <h2>Processos de Adoção</h2>
        <div className={styles.filters}>
          <select className={styles.filterSelect}>
            <option value="todos">Todos os Status</option>
            <option value="pendente">Pendentes</option>
            <option value="aprovado">Aprovados</option>
            <option value="rejeitado">Rejeitados</option>
          </select>
        </div>
      </div>

      <div className={styles.adocoesList}>
        {adocoes.map(adocao => (
          <div key={adocao.id} className={styles.adocaoCard}>
            <div className={styles.petInfo}>
              <div className={styles.petImage}>
                <img src={adocao.pet.image} alt={adocao.pet.name} />
                <FaPaw className={styles.petIcon} />
              </div>
              <div className={styles.petDetails}>
                <h3>{adocao.pet.name}</h3>
                <p>{adocao.pet.type}</p>
              </div>
            </div>

            <div className={styles.adotanteInfo}>
              <div className={styles.adotanteHeader}>
                <FaUser className={styles.adotanteIcon} />
                <h4>Informações do Adotante</h4>
              </div>
              <div className={styles.adotanteDetails}>
                <p><strong>Nome:</strong> {adocao.adotante.name}</p>
                <p><strong>Email:</strong> {adocao.adotante.email}</p>
                <p><strong>Telefone:</strong> {adocao.adotante.phone}</p>
              </div>
            </div>

            <div className={styles.adocaoDetails}>
              <div className={styles.statusSection}>
                <div className={`${styles.statusBadge} ${styles[adocao.status.toLowerCase()]}`}>
                  {getStatusIcon(adocao.status)}
                  <span>{adocao.status}</span>
                </div>
                <p className={styles.dataSolicitacao}>
                  Solicitado em: {new Date(adocao.dataSolicitacao).toLocaleDateString()}
                </p>
              </div>
              <p className={styles.observacoes}>
                <strong>Observações:</strong> {adocao.observacoes}
              </p>
            </div>

            {adocao.status === 'Pendente' && (
              <div className={styles.actions}>
                <button
                  className={`${styles.actionButton} ${styles.approveButton}`}
                  onClick={() => handleStatusChange(adocao.id, 'Aprovado')}
                >
                  <FaCheck />
                  Aprovar
                </button>
                <button
                  className={`${styles.actionButton} ${styles.rejectButton}`}
                  onClick={() => handleStatusChange(adocao.id, 'Rejeitado')}
                >
                  <FaTimes />
                  Rejeitar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdocoesManager; 