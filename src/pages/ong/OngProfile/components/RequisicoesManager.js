import React, { useState } from 'react';
import { FaSearch, FaCheck, FaTimes, FaClock, FaUser, FaBox, FaHandHoldingHeart } from 'react-icons/fa';
import styles from './RequisicoesManager.module.css';

const RequisicoesManager = () => {
  const [requisicoes, setRequisicoes] = useState([
    {
      id: 1,
      type: 'doação',
      item: 'Ração para cães',
      quantity: '5 sacos',
      requester: {
        name: 'Maria Silva',
        email: 'maria@email.com',
        phone: '(11) 99999-9999'
      },
      status: 'Pendente',
      date: '2024-03-15T10:30:00',
      description: 'Doação de ração para cães adultos'
    },
    {
      id: 2,
      type: 'voluntário',
      item: 'Auxiliar em eventos',
      quantity: '1 pessoa',
      requester: {
        name: 'João Santos',
        email: 'joao@email.com',
        phone: '(11) 98888-8888'
      },
      status: 'Aprovado',
      date: '2024-03-14T15:45:00',
      description: 'Disponível para ajudar em eventos de adoção'
    },
    // Adicione mais requisições aqui
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (id, newStatus) => {
    setRequisicoes(requisicoes.map(req =>
      req.id === id ? { ...req, status: newStatus } : req
    ));
  };

  const filteredRequisicoes = requisicoes.filter(req => {
    const matchesSearch = 
      req.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.requester.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'todos' || req.status.toLowerCase() === filterStatus;

    return matchesSearch && matchesStatus;
  });

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

  const getTypeIcon = (type) => {
    switch (type) {
      case 'doação':
        return <FaBox className={styles.typeIcon} />;
      case 'voluntário':
        return <FaHandHoldingHeart className={styles.typeIcon} />;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={styles.requisicoesManager}>
      <div className={styles.header}>
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar requisições..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <select
          className={styles.filterSelect}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="todos">Todos os Status</option>
          <option value="pendente">Pendentes</option>
          <option value="aprovado">Aprovados</option>
          <option value="rejeitado">Rejeitados</option>
        </select>
      </div>

      <div className={styles.requisicoesList}>
        {filteredRequisicoes.map(requisicao => (
          <div key={requisicao.id} className={styles.requisicaoCard}>
            <div className={styles.requisicaoHeader}>
              <div className={styles.typeInfo}>
                {getTypeIcon(requisicao.type)}
                <span className={`${styles.type} ${styles[requisicao.type]}`}>
                  {requisicao.type}
                </span>
              </div>
              <div className={`${styles.statusBadge} ${styles[requisicao.status.toLowerCase()]}`}>
                {getStatusIcon(requisicao.status)}
                <span>{requisicao.status}</span>
              </div>
            </div>

            <div className={styles.requisicaoContent}>
              <div className={styles.itemInfo}>
                <h3>{requisicao.item}</h3>
                <p className={styles.quantity}>{requisicao.quantity}</p>
              </div>

              <div className={styles.requesterInfo}>
                <div className={styles.requesterHeader}>
                  <FaUser className={styles.requesterIcon} />
                  <h4>Informações do Solicitante</h4>
                </div>
                <div className={styles.requesterDetails}>
                  <p><strong>Nome:</strong> {requisicao.requester.name}</p>
                  <p><strong>Email:</strong> {requisicao.requester.email}</p>
                  <p><strong>Telefone:</strong> {requisicao.requester.phone}</p>
                </div>
              </div>

              <div className={styles.requisicaoDetails}>
                <p className={styles.description}>
                  <strong>Descrição:</strong> {requisicao.description}
                </p>
                <p className={styles.date}>
                  Solicitado em: {formatDate(requisicao.date)}
                </p>
              </div>

              {requisicao.status === 'Pendente' && (
                <div className={styles.actions}>
                  <button
                    className={`${styles.actionButton} ${styles.approveButton}`}
                    onClick={() => handleStatusChange(requisicao.id, 'Aprovado')}
                  >
                    <FaCheck />
                    Aprovar
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.rejectButton}`}
                    onClick={() => handleStatusChange(requisicao.id, 'Rejeitado')}
                  >
                    <FaTimes />
                    Rejeitar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequisicoesManager; 