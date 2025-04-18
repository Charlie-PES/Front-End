import { createSeedAccounts as createSeedAccountsService } from '../services/authService';

// Função para criar contas pré-definidas
export const createSeedAccounts = () => {
  try {
    return createSeedAccountsService();
  } catch (error) {
    console.error('Erro ao criar contas pré-definidas:', error);
    return null;
  }
}; 