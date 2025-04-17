import React from 'react';
import styles from './NovoLocalOverlay.module.css';

const NovoLocalOverlay = ({ local = {}, onChange, onSubmit, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.formCard}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>

        <h2 className={styles.title}>Cadastrar nova ONG/Abrigo</h2>

        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.section}>
            <h3>Dados</h3>
            <div className={styles.mapPreview}>Clique no mapa para adicionar a localização</div>
            <input
              type="text"
              placeholder="Nome"
              value={local.nome || ''}
              onChange={(e) => onChange('nome', e.target.value)}
              required
            />
            <textarea
              placeholder="Sobre"
              maxLength={300}
              value={local.descricao || ''}
              onChange={(e) => onChange('descricao', e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Número de Whatsapp"
              value={local.whatsapp || ''}
              onChange={(e) => onChange('whatsapp', e.target.value)}
            />
            <input
              type="text"
              placeholder="Coloque o link da foto aqui"
              value={local.foto || ''}
              onChange={(e) => onChange('foto', e.target.value)}
            />
          </div>

          <div className={styles.section}>
            <h3>Visitação</h3>
            <textarea
              placeholder="Instruções"
              value={local.instrucoes || ''}
              onChange={(e) => onChange('instrucoes', e.target.value)}
            />
            <input
              type="text"
              placeholder="Horário das visitas"
              value={local.horario || ''}
              onChange={(e) => onChange('horario', e.target.value)}
            />
            <div className={styles.radioGroup}>
              <label>Atende fim de semana?</label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="fimSemana"
                    value="sim"
                    checked={local.fimSemana === 'sim'}
                    onChange={() => onChange('fimSemana', 'sim')}
                  />
                  Sim
                </label>
                <label>
                  <input
                    type="radio"
                    name="fimSemana"
                    value="nao"
                    checked={local.fimSemana === 'nao'}
                    onChange={() => onChange('fimSemana', 'nao')}
                  />
                  Não
                </label>
              </div>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>Confirmar</button>
        </form>
      </div>
    </div>
  );
};

export default NovoLocalOverlay;
