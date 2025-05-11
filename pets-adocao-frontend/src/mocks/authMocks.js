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
    ong: true
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
    createdAt: '2024-01-01T00:00:00.000Z'
  }
]; 