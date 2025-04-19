/**
 * Controlador para o endpoint de contato
 * 
 * Este arquivo demonstra como implementar o endpoint de contato no backend.
 * Ele inclui validação de dados, armazenamento no banco de dados e envio de notificações.
 */

const { validationResult } = require('express-validator');
const Contato = require('../models/Contato');
const EmailService = require('../services/EmailService');

/**
 * Controlador para processar o envio de mensagens de contato
 * 
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @returns {Object} Resposta JSON com status da operação
 */
exports.enviarMensagem = async (req, res) => {
  try {
    // Validar dados recebidos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { nome, email, assunto, mensagem } = req.body;

    // Criar nova mensagem de contato
    const novaMensagem = new Contato({
      nome,
      email,
      assunto,
      mensagem,
      data: new Date()
    });

    // Salvar no banco de dados
    await novaMensagem.save();

    // Enviar notificação por email para o administrador
    await EmailService.enviarNotificacaoContato({
      nome,
      email,
      assunto,
      mensagem
    });

    // Responder com sucesso
    return res.status(201).json({
      success: true,
      message: 'Mensagem enviada com sucesso!',
      data: {
        id: novaMensagem._id,
        nome,
        email,
        assunto,
        data: novaMensagem.data
      }
    });
  } catch (error) {
    console.error('Erro ao processar mensagem de contato:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Erro ao processar sua mensagem. Por favor, tente novamente mais tarde.'
    });
  }
};

/**
 * Controlador para listar todas as mensagens de contato (apenas para administradores)
 * 
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @returns {Object} Resposta JSON com lista de mensagens
 */
exports.listarMensagens = async (req, res) => {
  try {
    // Verificar se o usuário é administrador
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Acesso negado. Apenas administradores podem listar mensagens.'
      });
    }

    // Buscar mensagens no banco de dados
    const mensagens = await Contato.find()
      .sort({ data: -1 }) // Ordenar por data, mais recentes primeiro
      .select('-__v'); // Excluir campo de versão

    return res.status(200).json({
      success: true,
      count: mensagens.length,
      data: mensagens
    });
  } catch (error) {
    console.error('Erro ao listar mensagens de contato:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Erro ao buscar mensagens. Por favor, tente novamente mais tarde.'
    });
  }
};

/**
 * Controlador para marcar uma mensagem como lida (apenas para administradores)
 * 
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @returns {Object} Resposta JSON com status da operação
 */
exports.marcarComoLida = async (req, res) => {
  try {
    // Verificar se o usuário é administrador
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Acesso negado. Apenas administradores podem marcar mensagens como lidas.'
      });
    }

    const { id } = req.params;

    // Buscar e atualizar a mensagem
    const mensagem = await Contato.findByIdAndUpdate(
      id,
      { lida: true, dataLeitura: new Date() },
      { new: true }
    );

    if (!mensagem) {
      return res.status(404).json({
        success: false,
        message: 'Mensagem não encontrada.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Mensagem marcada como lida.',
      data: mensagem
    });
  } catch (error) {
    console.error('Erro ao marcar mensagem como lida:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Erro ao processar sua solicitação. Por favor, tente novamente mais tarde.'
    });
  }
}; 