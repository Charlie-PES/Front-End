import React from 'react';
import styles from './ContateNos.module.css';
import { FaEnvelope, FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';

const ContateNos = () => {
  return (
    <div className={styles.container}>
      <h2>Contate Nós</h2>
      <p className={styles.subtitle}>
        Estamos aqui para te ajudar! Entre em contato por qualquer um dos canais abaixo.
      </p>

      <div className={styles.contactBox}>
        <div className={styles.item}>
          <FaPhoneAlt className={styles.icon} />
          <div>
            <h4>Telefone</h4>
            <p>(11) 4002-8922</p>
          </div>
        </div>

        <div className={styles.item}>
          <FaWhatsapp className={styles.icon} />
          <div>
            <h4>WhatsApp</h4>
            <p>(11) 91234-5678</p>
          </div>
        </div>

        <div className={styles.item}>
          <FaEnvelope className={styles.icon} />
          <div>
            <h4>E-mail</h4>
            <p>contato@adocaopets.com.br</p>
          </div>
        </div>

        <div className={styles.item}>
          <FaMapMarkerAlt className={styles.icon} />
          <div>
            <h4>Endereço</h4>
            <p>Rua dos Pets, 123 - São Paulo/SP</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContateNos;
