import React, { useState } from 'react';
import styles from './Faq.module.css';

const perguntasRespostas = [
  {
    pergunta: 'Como posso adotar um pet?',
    resposta:
      'Para adotar, vá até a página "Adotar", filtre os pets disponíveis e clique em "Me Adote" no pet desejado. Você será guiado pelo processo.',
  },
  {
    pergunta: 'Posso cadastrar um pet para adoção?',
    resposta:
      'Sim! Acesse sua conta, vá até seu perfil e clique em "Cadastrar Pet". Preencha os dados do animal e envie.',
  },
  {
    pergunta: 'É necessário criar conta para adotar?',
    resposta:
      'Sim, é necessário criar uma conta para acompanhar o processo, entrar em contato com o responsável e garantir segurança para ambos os lados.',
  },
  {
    pergunta: 'Existe algum custo para adoção?',
    resposta:
      'A maioria dos pets são gratuitos para adoção, mas algumas ONGs podem cobrar uma taxa simbólica de cuidados/vacinas. Isso será informado no processo.',
  },
  {
    pergunta: 'Como funciona o acompanhamento pós-adoção?',
    resposta:
      'Você poderá acessar a área "Acompanhamento Pós-Adoção" no seu perfil, registrar visitas, atualizações de saúde, vacinas e observações do pet.',
  },
];

const Faq = () => {
  const [ativa, setAtiva] = useState(null);

  const toggle = (index) => {
    setAtiva(index === ativa ? null : index);
  };

  return (
    <div className={styles.container}>
      <h2>Perguntas Frequentes (FAQ)</h2>
      <div className={styles.faqList}>
        {perguntasRespostas.map((item, index) => (
          <div
            key={index}
            className={`${styles.item} ${ativa === index ? styles.ativo : ''}`}
          >
            <div className={styles.pergunta} onClick={() => toggle(index)}>
              {item.pergunta}
              <span>{ativa === index ? '−' : '+'}</span>
            </div>
            {ativa === index && <div className={styles.resposta}>{item.resposta}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
