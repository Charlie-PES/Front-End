import React from 'react';
import styles from './ServicoConsumidor.module.css';
import { FaEnvelope, FaPhone, FaClock, FaWhatsapp } from 'react-icons/fa';

const ServicoConsumidor = () => {
  return (
    <div className={styles.container}>
      <h2>Serviço ao Consumidor</h2>

      <div className={styles.card}>
        <h3>📞 Central de Atendimento</h3>
        <p><FaPhone /> Telefone: (11) 4002-8922</p>
        <p><FaWhatsapp /> WhatsApp: (11) 91234-5678</p>
        <p><FaEnvelope /> E-mail: suporte@adocaopets.com.br</p>
      </div>

      <div className={styles.card}>
        <h3><FaClock /> Horário de Atendimento</h3>
        <p>Segunda a Sexta: 09:00 às 18:00</p>
        <p>Sábados: 09:00 às 13:00</p>
        <p>Domingos e feriados: fechado</p>
      </div>

      <div className={styles.card}>
        <h3>💡 Dúvidas rápidas</h3>
        <ul>
          <li>❓ Como adotar um pet?</li>
          <li>❓ Como cadastrar meu pet para adoção?</li>
          <li>❓ Como editar minhas informações?</li>
          <li>❓ Onde posso acompanhar a adoção?</li>
        </ul>
        <p>Para respostas, consulte nossa <strong><a href="/faq">página de FAQ</a></strong>.</p>
      </div>
    </div>
  );
};

export default ServicoConsumidor;
