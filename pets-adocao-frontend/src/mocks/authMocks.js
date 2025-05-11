export const mockAccounts = {
  user: {
    username: 'usuario_teste',
    email: 'usuario@teste.com',
    password: 'Teste@123',
    cpf: '123.456.789-00',
    tutor: true,
    adopter: true,
    ong: false
  },
  ong: {
    username: 'ong_teste',
    email: 'ong@teste.com',
    password: 'Teste@123',
    cnpj: '12.345.678/0001-90',
    razaoSocial: 'ONG Teste',
    endereco: 'Rua Teste, 123',
    telefone: '(11) 99999-9999',
    tutor: false,
    adopter: false,
    ong: true,
    tipo: 'ong'
  },
  temporary: {
    username: 'tutor_temporario',
    email: 'tutor@teste.com',
    password: 'Teste@123',
    cpf: '987.654.321-00',
    tutor: true,
    adopter: false,
    ong: false,
    tipo: 'temporary',
    bio: 'Sou um tutor temporário que resgata animais em situação de rua e busca encontrar um lar permanente para eles. Atualmente estou cuidando de alguns pets que precisam de um novo lar.',
    experiencia: 'Tenho experiência em cuidar de animais resgatados, incluindo cuidados básicos, medicações e socialização.',
    disponibilidade: 'Disponível para cuidar de pets temporariamente enquanto busco um lar permanente para eles.',
    preferencias: {
      tipo: ['dog', 'cat'],
      porte: ['small', 'medium', 'large'],
      idade: ['filhote', 'adulto', 'idoso'],
      necessidades: true
    }
  }
};

export const mockUsers = [
  {
    id: 1,
    username: 'usuario_teste',
    email: 'usuario@teste.com',
    cpf: '123.456.789-00',
    tutor: true,
    adopter: true,
    ong: false,
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 2,
    username: 'ong_teste',
    email: 'ong@teste.com',
    cnpj: '12.345.678/0001-90',
    razaoSocial: 'ONG Teste',
    endereco: 'Rua Teste, 123',
    telefone: '(11) 99999-9999',
    tutor: false,
    adopter: false,
    ong: true,
    tipo: 'ong',
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 3,
    username: 'tutor_temporario',
    email: 'tutor@teste.com',
    cpf: '987.654.321-00',
    tutor: true,
    adopter: false,
    ong: false,
    tipo: 'temporary',
    bio: 'Sou um tutor temporário que resgata animais em situação de rua e busca encontrar um lar permanente para eles. Atualmente estou cuidando de alguns pets que precisam de um novo lar.',
    experiencia: 'Tenho experiência em cuidar de animais resgatados, incluindo cuidados básicos, medicações e socialização.',
    disponibilidade: 'Disponível para cuidar de pets temporariamente enquanto busco um lar permanente para eles.',
    preferencias: {
      tipo: ['dog', 'cat'],
      porte: ['small', 'medium', 'large'],
      idade: ['filhote', 'adulto', 'idoso'],
      necessidades: true
    },
    createdAt: '2024-01-01T00:00:00.000Z'
  }
]; 