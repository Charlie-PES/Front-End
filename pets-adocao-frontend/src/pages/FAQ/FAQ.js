import React, { useState, useContext } from 'react';
import { FaChevronDown, FaChevronUp, FaPaw, FaHeart, FaQuestion, FaUserPlus, FaShieldAlt, FaMobileAlt, FaHandHoldingHeart } from 'react-icons/fa';
import { ThemeContext } from '../../contexts/ThemeContext';
import styles from './FAQ.module.css';

const FAQ = () => {
  const { darkMode } = useContext(ThemeContext);
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      categoria: "Sobre a Plataforma",
      icon: <FaPaw />,
      perguntas: [
        {
          pergunta: "O que é o Pets Adoção?",
          resposta: "O Pets Adoção é uma plataforma que conecta pessoas interessadas em adotar pets com ONGs e protetores. Nossa missão é facilitar o processo de adoção responsável e dar um lar para animais que precisam."
        },
        {
          pergunta: "Como funciona o processo de adoção?",
          resposta: "O processo é simples: você cria uma conta, navega pelos pets disponíveis, entra em contato com a ONG ou protetor responsável através da plataforma, agenda uma visita e, se houver compatibilidade, inicia o processo de adoção seguindo os requisitos específicos de cada organização."
        },
        {
          pergunta: "O serviço é gratuito?",
          resposta: "Sim! O Pets Adoção é totalmente gratuito para usuários que desejam adotar. ONGs e protetores também podem utilizar a plataforma gratuitamente para cadastrar animais para adoção."
        },
        {
          pergunta: "Vocês têm aplicativo móvel?",
          resposta: "Sim! Nosso aplicativo está disponível para Android e iOS. Você pode baixar gratuitamente nas lojas oficiais e ter acesso a todas as funcionalidades da plataforma no seu celular."
        },
        {
          pergunta: "Em quais regiões vocês atuam?",
          resposta: "Atualmente estamos presentes em todo o Brasil, com maior concentração de parceiros nas principais capitais. Você pode filtrar os pets por localização para encontrar os mais próximos de você."
        }
      ]
    },
    {
      categoria: "Cadastro e Conta",
      icon: <FaUserPlus />,
      perguntas: [
        {
          pergunta: "Como criar uma conta?",
          resposta: "Para criar uma conta, clique em 'Registrar' no menu superior, preencha seus dados pessoais e escolha seu perfil (Adotante, ONG ou Protetor). Você receberá um email de confirmação para ativar sua conta."
        },
        {
          pergunta: "Quais são os tipos de conta disponíveis?",
          resposta: "Oferecemos três tipos de conta: Adotante (para quem deseja adotar), ONG (para organizações) e Protetor (para protetores independentes). Cada tipo tem funcionalidades específicas para suas necessidades."
        },
        {
          pergunta: "Posso ter mais de um tipo de perfil?",
          resposta: "Não, cada usuário deve escolher um tipo de perfil principal. No entanto, você pode solicitar a alteração do tipo de perfil através do suporte se necessário."
        },
        {
          pergunta: "Como recuperar minha senha?",
          resposta: "Na página de login, clique em 'Esqueci minha senha'. Digite seu email cadastrado e você receberá um link para redefinir sua senha. Por segurança, o link expira em 24 horas."
        },
        {
          pergunta: "Como excluir minha conta?",
          resposta: "Você pode excluir sua conta através das configurações do perfil. Note que esta ação é irreversível e todos os seus dados serão permanentemente removidos após 30 dias."
        }
      ]
    },
    {
      categoria: "Segurança e Privacidade",
      icon: <FaShieldAlt />,
      perguntas: [
        {
          pergunta: "Como meus dados são protegidos?",
          resposta: "Utilizamos criptografia de ponta a ponta e seguimos rigorosos protocolos de segurança para proteger seus dados pessoais. Nunca compartilhamos suas informações com terceiros sem sua autorização."
        },
        {
          pergunta: "As ONGs e protetores são verificados?",
          resposta: "Sim! Todas as ONGs e protetores passam por um processo de verificação antes de poderem cadastrar animais. Verificamos documentação, histórico e referências para garantir a legitimidade."
        },
        {
          pergunta: "Como denunciar um perfil suspeito?",
          resposta: "Você pode denunciar qualquer perfil suspeito através do botão 'Denunciar' disponível na página do perfil. Nossa equipe investigará imediatamente e tomará as medidas necessárias."
        },
        {
          pergunta: "Minhas mensagens são privadas?",
          resposta: "Sim! Todas as mensagens trocadas através da plataforma são privadas e criptografadas. Apenas você e o destinatário têm acesso ao conteúdo das conversas."
        }
      ]
    },
    {
      categoria: "Funcionalidades",
      icon: <FaMobileAlt />,
      perguntas: [
        {
          pergunta: "Como funciona o sistema de match?",
          resposta: "O sistema de match utiliza inteligência artificial para conectar adotantes com pets compatíveis, considerando fatores como estilo de vida, espaço disponível, experiência com pets e preferências específicas."
        },
        {
          pergunta: "Posso compartilhar pets nas redes sociais?",
          resposta: "Sim! Cada pet tem botões de compartilhamento para as principais redes sociais. Quanto mais compartilhamentos, maiores as chances de encontrar um lar."
        },
        {
          pergunta: "Como funciona o feed de notícias?",
          resposta: "O feed exibe notícias sobre adoção, histórias de sucesso, dicas de cuidados com pets e atualizações das ONGs parceiras. Você pode filtrar o conteúdo por categoria e interagir com as publicações."
        },
        {
          pergunta: "Como usar os filtros de busca?",
          resposta: "Nossa busca avançada permite filtrar pets por espécie, raça, idade, porte, localização e características específicas. Você também pode salvar suas buscas favoritas."
        },
        {
          pergunta: "Como funciona o sistema de favoritos?",
          resposta: "Ao favoritar um pet, ele fica salvo na sua lista de favoritos para fácil acesso. Você também recebe notificações sobre atualizações no perfil do pet."
        }
      ]
    },
    {
      categoria: "Adoção Responsável",
      icon: <FaHandHoldingHeart />,
      perguntas: [
        {
          pergunta: "Quais são os requisitos para adotar?",
          resposta: "Os requisitos básicos incluem: ser maior de 18 anos, apresentar documentos de identificação, comprovante de residência e passar por uma entrevista com a ONG ou protetor. Requisitos específicos podem variar por organização."
        },
        {
          pergunta: "Existe suporte pós-adoção?",
          resposta: "Sim! Oferecemos suporte através de materiais educativos, contato com veterinários parceiros e acompanhamento nos primeiros meses. As ONGs também mantêm contato para garantir o bem-estar do pet."
        },
        {
          pergunta: "O que fazer se encontrar problemas na adoção?",
          resposta: "Em caso de problemas, entre em contato imediatamente com a ONG ou protetor responsável. Também disponibilizamos um canal de suporte 24/7 para mediar situações e garantir o melhor para todos os envolvidos."
        },
        {
          pergunta: "Existe período de adaptação?",
          resposta: "Sim! Recomendamos um período de adaptação de 15 a 30 dias, durante o qual oferecemos suporte especial. Este período é importante para garantir a compatibilidade entre o pet e a família."
        },
        {
          pergunta: "Como preparar a casa para o novo pet?",
          resposta: "Fornecemos um guia completo de preparação que inclui lista de itens necessários, dicas de adaptação do ambiente e recomendações de segurança específicas para cada tipo de pet."
        }
      ]
    },
    {
      categoria: "Dúvidas Gerais",
      icon: <FaQuestion />,
      perguntas: [
        {
          pergunta: "Como posso ajudar além da adoção?",
          resposta: "Você pode ajudar de várias formas: tornando-se voluntário em ONGs parceiras, fazendo doações, compartilhando pets para adoção, participando de eventos e campanhas, ou mesmo se tornando um lar temporário."
        },
        {
          pergunta: "Vocês aceitam doações?",
          resposta: "Sim! Todas as doações são direcionadas diretamente para as ONGs e protetores cadastrados. Você pode escolher para qual organização doar e acompanhar o impacto da sua contribuição."
        },
        {
          pergunta: "Como reportar problemas na plataforma?",
          resposta: "Use o botão 'Reportar' disponível em cada página ou entre em contato através do nosso suporte. Investigamos todas as denúncias para manter a plataforma segura e confiável."
        },
        {
          pergunta: "Vocês oferecem serviço de transporte?",
          resposta: "Algumas ONGs parceiras oferecem serviço de transporte para adoções em outras cidades. Consulte a disponibilidade diretamente com a organização responsável pelo pet."
        },
        {
          pergunta: "Como participar de eventos de adoção?",
          resposta: "Mantemos um calendário atualizado de eventos de adoção em nossa plataforma. Você pode se inscrever para receber notificações sobre eventos na sua região."
        },
        {
          pergunta: "Posso ser um lar temporário?",
          resposta: "Sim! Muitas ONGs precisam de lares temporários. Você pode se cadastrar como voluntário e indicar disponibilidade para ser lar temporário. Fornecemos todo o suporte necessário."
        }
      ]
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={`${styles.faqContainer} ${darkMode ? styles.darkMode : ''}`}>
      <header className={styles.faqHeader}>
        <FaHeart className={styles.headerIcon} />
        <h1>Perguntas Frequentes</h1>
        <p>Encontre respostas para as principais dúvidas sobre nossa plataforma</p>
      </header>

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

      <footer className={styles.faqFooter}>
        <p>Não encontrou o que procurava?</p>
        <button className={styles.contatoButton}>Entre em Contato</button>
      </footer>
    </div>
  );
};

export default FAQ; 