import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './PetPage.module.css';

const PetPage = () => {
  const { id } = useParams();

  const pets = [
    {
      id: 1,
      nome: 'Green Tea',
      sexo: 'Macho',
      raca: 'SRD',
      cor: 'Branco e marrom',
      idade: '3 meses',
      vacinas: 'V10',
      porte: 'Médio',
      castrado: 'Não',
      imagem: '/images/pet1.jpg',
      compatibilidade: 90,
    },
    {
      id: 2,
      nome: 'White Tea',
      sexo: 'Fêmea',
      raca: 'SRD',
      cor: 'Branco',
      idade: '5 meses',
      vacinas: 'V8, Raiva',
      porte: 'Pequeno',
      castrado: 'Sim',
      imagem: '/images/pet2.jpg',
      compatibilidade: 75,
    },
    {
      id: 3,
      nome: 'Super Matcha',
      sexo: 'Macho',
      raca: 'Poodle',
      cor: 'Cinza',
      idade: '1 ano',
      vacinas: 'V10, Raiva',
      porte: 'Pequeno',
      castrado: 'Sim',
      imagem: '/images/pet3.jpg',
      compatibilidade: 85,
    },
  ];

  const pet = pets.find((p) => p.id === Number(id));

  if (!pet) {
    return <div className={styles.container}><h2>Pet não encontrado 😿</h2></div>;
  }

  const historico = [
    { icone: '📅', texto: 'Resgatado em: 02/01/2024' },
    { icone: '🏠', texto: 'Abrigo Amor Animal (02/01 até 15/02)' },
    { icone: '👩‍🦰', texto: 'Lar temporário (Ana) – 15/02 até hoje' },
  ];

  const outrosPets = pets.filter((p) => p.id !== pet.id).slice(0, 3);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.leftColumn}>
          <img src={pet.imagem} alt={pet.nome} className={styles.petImage} />

          <div className={styles.compatibilidadeBox}>
            <p><strong>Nível de compatibilidade com você</strong></p>
            <div className={styles.barra}>
              <div
                className={styles.preenchido}
                style={{ width: `${pet.compatibilidade}%` }}
              >
                {pet.compatibilidade}%
              </div>
            </div>
            <button className={styles.adotarBtn}>Adotar</button>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.section}>
            <p><strong>Nome:</strong> {pet.nome}</p>
            <p><strong>Sexo:</strong> {pet.sexo}</p>
            <p><strong>Raça:</strong> {pet.raca}</p>
            <p><strong>Cor:</strong> {pet.cor}</p>
            <p><strong>Idade:</strong> {pet.idade}</p>
            <p><strong>Vacinas:</strong> {pet.vacinas}</p>
            <p><strong>Porte:</strong> {pet.porte}</p>
            <p><strong>Castrado(a):</strong> {pet.castrado}</p>
          </div>

          <div className={styles.section}>
            <h3>Histórico de Rastreabilidade</h3>
            <ul className={styles.historico}>
              {historico.map((item, i) => (
                <li key={i}>{item.icone} {item.texto}</li>
              ))}
            </ul>
            <p><strong>Total de tempo sob cuidado:</strong> 2 meses e 10 dias</p>
          </div>

          <div className={styles.section}>
            <h3>Responsável</h3>
            <p><strong>Nome:</strong> Ana Beatriz Souza</p>
            <p><strong>Tipo de responsável:</strong> Lar temporário</p>
            <p><strong>📞</strong> (11) 98765-4321</p>
            <p><strong>📍</strong> São Paulo - SP</p>
          </div>
        </div>
      </div>

      <div className={styles.outros}>
        <h3>Outros para Adoção</h3>
        <div className={styles.outrosGrid}>
          {outrosPets.map((p) => (
            <div key={p.id} className={styles.outroCard}>
              <img src={p.imagem} alt={p.nome} className={styles.outroImagem} />
              <p><strong>{p.nome}</strong></p>
              <span>{p.raca}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetPage;
