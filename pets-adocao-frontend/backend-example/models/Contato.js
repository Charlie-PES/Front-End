/**
 * Modelo de Contato
 * 
 * Este arquivo define o esquema do modelo de Contato para o MongoDB.
 * Ele inclui validações e configurações para o Mongoose.
 */

const mongoose = require('mongoose');

// Esquema do modelo de Contato
const contatoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome é obrigatório'],
    trim: true,
    minlength: [3, 'O nome deve ter pelo menos 3 caracteres'],
    maxlength: [100, 'O nome não pode ter mais de 100 caracteres']
  },
  email: {
    type: String,
    required: [true, 'O email é obrigatório'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Por favor, forneça um email válido'
    ]
  },
  assunto: {
    type: String,
    required: [true, 'O assunto é obrigatório'],
    trim: true,
    minlength: [5, 'O assunto deve ter pelo menos 5 caracteres'],
    maxlength: [200, 'O assunto não pode ter mais de 200 caracteres']
  },
  mensagem: {
    type: String,
    required: [true, 'A mensagem é obrigatória'],
    trim: true,
    minlength: [10, 'A mensagem deve ter pelo menos 10 caracteres'],
    maxlength: [2000, 'A mensagem não pode ter mais de 2000 caracteres']
  },
  data: {
    type: Date,
    default: Date.now
  },
  lida: {
    type: Boolean,
    default: false
  },
  dataLeitura: {
    type: Date,
    default: null
  },
  respondida: {
    type: Boolean,
    default: false
  },
  dataResposta: {
    type: Date,
    default: null
  },
  resposta: {
    type: String,
    default: ''
  }
}, {
  // Opções do esquema
  timestamps: true, // Adiciona createdAt e updatedAt automaticamente
  versionKey: false // Remove o campo __v
});

// Índices para melhorar a performance das consultas
contatoSchema.index({ email: 1 });
contatoSchema.index({ data: -1 });
contatoSchema.index({ lida: 1 });

// Método para marcar como lida
contatoSchema.methods.marcarComoLida = function() {
  this.lida = true;
  this.dataLeitura = new Date();
  return this.save();
};

// Método para responder a mensagem
contatoSchema.methods.responder = function(resposta) {
  this.respondida = true;
  this.dataResposta = new Date();
  this.resposta = resposta;
  return this.save();
};

// Middleware para sanitizar dados antes de salvar
contatoSchema.pre('save', function(next) {
  // Sanitizar strings para evitar injeção de HTML
  if (this.nome) this.nome = this.nome.replace(/<[^>]*>/g, '');
  if (this.assunto) this.assunto = this.assunto.replace(/<[^>]*>/g, '');
  if (this.mensagem) this.mensagem = this.mensagem.replace(/<[^>]*>/g, '');
  if (this.resposta) this.resposta = this.resposta.replace(/<[^>]*>/g, '');
  
  next();
});

// Criar e exportar o modelo
const Contato = mongoose.model('Contato', contatoSchema);

module.exports = Contato; 