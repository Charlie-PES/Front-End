import React from 'react';
import styles from './PoliticaPrivacidade.module.css';

const PoliticaPrivacidade = () => {
  return (
    <div className={styles.container}>
      <h1>Política de Privacidade</h1>

      <p>
        Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais no sistema de adoção de pets.
      </p>

      <h2>1. Coleta de informações</h2>
      <p>
        Coletamos informações que você fornece voluntariamente ao se cadastrar, como nome, e-mail, telefone, localização e preferências de adoção.
      </p>

      <h2>2. Uso das informações</h2>
      <p>
        As informações são utilizadas para personalizar sua experiência, possibilitar adoções, contatos com responsáveis e melhorar os serviços da plataforma.
      </p>

      <h2>3. Compartilhamento</h2>
      <p>
        Seus dados poderão ser compartilhados apenas com ONGs, tutores responsáveis e parceiros diretamente envolvidos no processo de adoção.
      </p>

      <h2>4. Cookies</h2>
      <p>
        Utilizamos cookies para armazenar informações sobre sua navegação e preferências, otimizando seu uso da plataforma.
      </p>

      <h2>5. Segurança</h2>
      <p>
        Adotamos medidas de segurança para proteger suas informações contra acessos não autorizados, alteração, divulgação ou destruição.
      </p>

      <h2>6. Seus direitos</h2>
      <p>
        Você pode solicitar acesso, alteração ou exclusão dos seus dados a qualquer momento entrando em contato com nossa equipe de suporte.
      </p>

      <h2>7. Alterações nesta política</h2>
      <p>
        Reservamo-nos o direito de modificar esta política a qualquer momento. Quaisquer mudanças serão publicadas nesta página.
      </p>

      <h2>8. Contato</h2>
      <p>
        Em caso de dúvidas, entre em contato pelo e-mail: <strong>privacidade@adocaopets.com.br</strong>
      </p>
    </div>
  );
};

export default PoliticaPrivacidade;
