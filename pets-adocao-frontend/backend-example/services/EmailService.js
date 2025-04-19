/**
 * Serviço de Email
 * 
 * Este arquivo implementa um serviço para envio de emails usando Nodemailer.
 * Ele inclui funções para enviar notificações de contato e outras comunicações.
 */

const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs').promises;
const handlebars = require('handlebars');

// Configuração do transporter do Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Verificar conexão com o servidor de email
transporter.verify((error, success) => {
  if (error) {
    console.error('Erro na configuração do email:', error);
  } else {
    console.log('Servidor de email pronto para enviar mensagens');
  }
});

/**
 * Carrega um template HTML do sistema de arquivos
 * 
 * @param {string} templateName - Nome do arquivo de template
 * @returns {Promise<string>} Conteúdo do template
 */
async function loadTemplate(templateName) {
  try {
    const templatePath = path.join(__dirname, '../templates/email', `${templateName}.hbs`);
    const templateContent = await fs.readFile(templatePath, 'utf8');
    return handlebars.compile(templateContent);
  } catch (error) {
    console.error(`Erro ao carregar template ${templateName}:`, error);
    throw new Error(`Template ${templateName} não encontrado`);
  }
}

/**
 * Envia um email usando um template
 * 
 * @param {Object} options - Opções de envio
 * @param {string} options.to - Destinatário
 * @param {string} options.subject - Assunto
 * @param {string} options.template - Nome do template
 * @param {Object} options.context - Dados para o template
 * @returns {Promise<Object>} Resultado do envio
 */
async function sendEmail(options) {
  try {
    const { to, subject, template, context } = options;
    
    // Carregar e compilar o template
    const compiledTemplate = await loadTemplate(template);
    const html = compiledTemplate(context);
    
    // Configurar o email
    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
      to,
      subject,
      html
    };
    
    // Enviar o email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email enviado: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw error;
  }
}

/**
 * Envia uma notificação para o administrador sobre uma nova mensagem de contato
 * 
 * @param {Object} contato - Dados da mensagem de contato
 * @returns {Promise<Object>} Resultado do envio
 */
async function enviarNotificacaoContato(contato) {
  const { nome, email, assunto, mensagem } = contato;
  
  // Formatar a mensagem para o template
  const context = {
    nome,
    email,
    assunto,
    mensagem,
    data: new Date().toLocaleString('pt-BR'),
    adminUrl: `${process.env.FRONTEND_URL}/admin/contatos`
  };
  
  // Enviar email para o administrador
  return sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `Nova mensagem de contato: ${assunto}`,
    template: 'notificacao-contato',
    context
  });
}

/**
 * Envia uma resposta para o usuário que enviou uma mensagem de contato
 * 
 * @param {Object} contato - Dados da mensagem de contato
 * @param {string} resposta - Texto da resposta
 * @returns {Promise<Object>} Resultado do envio
 */
async function enviarRespostaContato(contato, resposta) {
  const { nome, email, assunto, mensagem } = contato;
  
  // Formatar a mensagem para o template
  const context = {
    nome,
    assunto,
    mensagemOriginal: mensagem,
    resposta,
    data: new Date().toLocaleString('pt-BR')
  };
  
  // Enviar email para o usuário
  return sendEmail({
    to: email,
    subject: `Re: ${assunto}`,
    template: 'resposta-contato',
    context
  });
}

/**
 * Envia um email de confirmação de adoção
 * 
 * @param {Object} adocao - Dados da adoção
 * @returns {Promise<Object>} Resultado do envio
 */
async function enviarConfirmacaoAdocao(adocao) {
  const { adotante, pet, responsavel } = adocao;
  
  // Formatar a mensagem para o template
  const context = {
    nomeAdotante: adotante.nome,
    nomePet: pet.nome,
    nomeResponsavel: responsavel.nome,
    telefoneResponsavel: responsavel.telefone,
    emailResponsavel: responsavel.email,
    data: new Date().toLocaleString('pt-BR')
  };
  
  // Enviar email para o adotante
  return sendEmail({
    to: adotante.email,
    subject: `Confirmação de adoção - ${pet.nome}`,
    template: 'confirmacao-adocao',
    context
  });
}

module.exports = {
  enviarNotificacaoContato,
  enviarRespostaContato,
  enviarConfirmacaoAdocao
}; 