import React, { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import styles from './PoliticaPrivacidade.module.css';

const PoliticaPrivacidade = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
      <h1>Política de Privacidade</h1>
      
      <div className={styles.section}>
        <h2>1. Introdução</h2>
        <p>
          Bem-vindo à nossa plataforma de adoção de pets. Esta Política de Privacidade descreve como coletamos, 
          usamos e protegemos suas informações pessoais quando você utiliza nossos serviços.
        </p>
        <p>
          Ao acessar ou usar nossa plataforma, você concorda com os termos desta Política de Privacidade. 
          Se você não concordar com estes termos, por favor, não utilize nossos serviços.
        </p>
      </div>

      <div className={styles.section}>
        <h2>2. Informações que Coletamos</h2>
        <p>Coletamos os seguintes tipos de informações:</p>
        <ul>
          <li>Informações de cadastro (nome, email, telefone, endereço)</li>
          <li>Informações sobre seus pets (fotos, descrições, histórico médico)</li>
          <li>Dados de uso da plataforma (interações, preferências, histórico de navegação)</li>
          <li>Informações de pagamento (quando aplicável)</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>3. Como Usamos suas Informações</h2>
        <p>Utilizamos suas informações para:</p>
        <ul>
          <li>Gerenciar sua conta e fornecer nossos serviços</li>
          <li>Facilitar o processo de adoção de pets</li>
          <li>Enviar comunicações importantes sobre sua conta</li>
          <li>Melhorar nossos serviços e experiência do usuário</li>
          <li>Cumprir obrigações legais</li>
        </ul>
      </div>

      <div className={styles.highlight}>
        <p>
          <strong>Importante:</strong> Nunca compartilhamos suas informações pessoais com terceiros sem seu consentimento explícito, 
          exceto quando exigido por lei ou para proteger nossos direitos.
        </p>
      </div>

      <div className={styles.section}>
        <h2>4. Segurança de Dados</h2>
        <p>
          Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais 
          contra acesso não autorizado, alteração, divulgação ou destruição.
        </p>
      </div>

      <div className={styles.section}>
        <h2>5. Seus Direitos</h2>
        <p>Você tem o direito de:</p>
        <ul>
          <li>Acessar suas informações pessoais</li>
          <li>Corrigir informações imprecisas</li>
          <li>Solicitar a exclusão de seus dados</li>
          <li>Retirar seu consentimento a qualquer momento</li>
          <li>Receber uma cópia de seus dados em formato portátil</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>6. Cookies e Tecnologias Similares</h2>
        <p>
          Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o tráfego do site 
          e personalizar conteúdo. Você pode controlar o uso de cookies através das configurações do seu navegador.
        </p>
      </div>

      <div className={styles.section}>
        <h2>7. Alterações na Política de Privacidade</h2>
        <p>
          Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações 
          significativas publicando a nova Política de Privacidade nesta página e atualizando a data de "última atualização".
        </p>
      </div>

      <div className={styles.section}>
        <h2>8. Contato</h2>
        <p>
          Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos suas informações pessoais, 
          entre em contato conosco através do email: <a href="mailto:privacidade@petsadocao.com.br">privacidade@petsadocao.com.br</a>
        </p>
      </div>
    </div>
  );
};

export default PoliticaPrivacidade;
