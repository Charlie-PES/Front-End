import React, { useState, useContext } from 'react';
import { FaChevronDown, FaChevronUp, FaPaw, FaHeart, FaQuestion, FaUserPlus, FaShieldAlt } from 'react-icons/fa';
import { ThemeContext } from '../../contexts/ThemeContext';
import styles from './FAQ.module.css';

/**
 * Componente FAQ - Perguntas Frequentes
 * 
 * Este componente exibe uma lista de perguntas frequentes organizadas por categorias.
 * Implementa um design moderno, responsivo e adaptável ao modo escuro.
 * Utiliza um sistema de acordeão para exibir/esconder respostas.
 */
const FAQ = () => {
  // Contexto de tema para suporte ao modo escuro
  const { darkMode } = useContext(ThemeContext);
  
  // Estado para controlar qual item do acordeão está ativo
  const [activeIndex, setActiveIndex] = useState(null);

  // Dados das perguntas frequentes, reduzidos para um layout mais limpo
  const faqs = [
    {
      categoria: "Sobre a Plataforma",
      icon: <FaPaw />,
      perguntas: [
        {
          pergunta: "O que é o Pets Adoção?",
          resposta: "O Pets Adoção é uma plataforma que conecta pessoas interessadas em adotar pets com ONGs e protetores. Nossa missão é facilitar o processo de adoção responsável."
        },
        {
          pergunta: "Como funciona o processo de adoção?",
          resposta: "O processo é simples: você cria uma conta, navega pelos pets disponíveis, entra em contato com a ONG ou protetor responsável e, se houver compatibilidade, inicia o processo de adoção."
        },
        {
          pergunta: "O serviço é gratuito?",
          resposta: "Sim! O Pets Adoção é totalmente gratuito para usuários que desejam adotar. ONGs e protetores também podem utilizar a plataforma gratuitamente."
        }
      ]
    },
    {
      categoria: "Cadastro e Conta",
      icon: <FaUserPlus />,
      perguntas: [
        {
          pergunta: "Como criar uma conta?",
          resposta: "Para criar uma conta, clique em 'Registrar' no menu superior, preencha seus dados pessoais e escolha seu perfil (Adotante, ONG ou Protetor)."
        },
        {
          pergunta: "Quais são os tipos de conta disponíveis?",
          resposta: "Oferecemos três tipos de conta: Adotante (para quem deseja adotar), ONG (para organizações) e Protetor (para protetores independentes)."
        },
        {
          pergunta: "Como recuperar minha senha?",
          resposta: "Na página de login, clique em 'Esqueci minha senha'. Digite seu email cadastrado e você receberá um link para redefinir sua senha."
        }
      ]
    },
    {
      categoria: "Segurança e Privacidade",
      icon: <FaShieldAlt />,
      perguntas: [
        {
          pergunta: "Como meus dados são protegidos?",
          resposta: "Utilizamos criptografia de ponta a ponta e seguimos rigorosos protocolos de segurança para proteger seus dados pessoais."
        },
        {
          pergunta: "As ONGs e protetores são verificados?",
          resposta: "Sim! Todas as ONGs e protetores passam por um processo de verificação antes de poderem cadastrar animais."
        },
        {
          pergunta: "Como denunciar um perfil suspeito?",
          resposta: "Você pode denunciar qualquer perfil suspeito através do botão 'Denunciar' disponível na página do perfil."
        }
      ]
    },
    {
      categoria: "Dúvidas Gerais",
      icon: <FaQuestion />,
      perguntas: [
        {
          pergunta: "Como posso ajudar além da adoção?",
          resposta: "Você pode ajudar de várias formas: tornando-se voluntário em ONGs parceiras, fazendo doações, compartilhando pets para adoção."
        },
        {
          pergunta: "Vocês aceitam doações?",
          resposta: "Sim! Todas as doações são direcionadas diretamente para as ONGs e protetores cadastrados."
        },
        {
          pergunta: "Como reportar problemas na plataforma?",
          resposta: "Use o botão 'Reportar' disponível em cada página ou entre em contato através do nosso suporte."
        }
      ]
    }
  ];

  /**
   * Função para alternar o estado do acordeão
   * @param {string} index - Índice do item a ser alternado
   */
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={`${styles.faqContainer} ${darkMode ? styles.darkMode : ''}`}>
      {/* Cabeçalho da página */}
      <header className={styles.faqHeader}>
        <FaHeart className={styles.headerIcon} />
        <h1>Perguntas Frequentes</h1>
        <p>Encontre respostas para as principais dúvidas sobre nossa plataforma</p>
      </header>

      {/* Conteúdo principal */}
      <div className={styles.faqContent}>
        {faqs.map((categoria, categoriaIndex) => (
          <div key={categoriaIndex} className={styles.categoriaSection}>
            <h2>
              {categoria.icon}
              {categoria.categoria}
            </h2>
            <div className={styles.perguntasGrid}>
              {categoria.perguntas.map((faq, faqIndex) => {
                const index = `${categoriaIndex}-${faqIndex}`;
                const isActive = activeIndex === index;

                return (
                  <div 
                    key={faqIndex} 
                    className={`${styles.faqItem} ${isActive ? styles.active : ''}`}
                    onClick={() => toggleAccordion(index)}
                  >
                    <div className={styles.faqPergunta}>
                      <h3>{faq.pergunta}</h3>
                      {isActive ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    <div className={`${styles.faqResposta} ${isActive ? styles.show : ''}`}>
                      <p>{faq.resposta}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Rodapé com botão de contato */}
      <footer className={styles.faqFooter}>
        <p>Não encontrou o que procurava?</p>
        <button className={styles.contatoButton}>Entre em Contato</button>
      </footer>
    </div>
  );
};

export default FAQ; 