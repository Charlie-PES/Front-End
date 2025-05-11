# Registro de Usuários

## Tipos de Usuários

O sistema suporta três tipos principais de usuários:

1. **Adotante**
   - Usuário que deseja adotar um pet permanentemente
   - Pode visualizar pets disponíveis para adoção
   - Pode iniciar processos de adoção
   - Pode favoritar pets

2. **Tutor Temporário**
   - Usuário que oferece lar temporário para pets
   - Pode registrar pets para adoção
   - Pode gerenciar pets sob seus cuidados
   - Pode definir preferências de pets que aceita cuidar

3. **ONG**
   - Organização não governamental
   - Pode registrar múltiplos pets
   - Pode gerenciar processos de adoção
   - Possui informações adicionais como CNPJ e razão social

## Processo de Registro

### 1. Seleção do Tipo de Conta
- O usuário acessa a página de registro
- Escolhe entre ser adotante ou tutor temporário
- ONGs têm um fluxo específico de registro

### 2. Dados Obrigatórios
- Nome completo
- Email (deve conter @ e .com)
- Senha (mínimo 8 caracteres, letra maiúscula, minúscula e caractere especial)
- CPF (para adotantes e tutores temporários)
- CNPJ (apenas para ONGs)

### 3. Dados Adicionais para ONGs
- Razão social
- Endereço completo
- Telefone de contato

### 4. Dados Adicionais para Tutores Temporários
- Endereço
- Cidade
- Estado
- CEP
- Experiência com pets
- Disponibilidade
- Preferências de pets (tipo, porte, idade, necessidades especiais)

## Validações

O sistema realiza as seguintes validações durante o registro:

1. **CPF/CNPJ**
   - Validação de dígitos verificadores
   - Formatação automática

2. **Email**
   - Formato válido
   - Domínio .com
   - Verificação de duplicidade

3. **Senha**
   - Mínimo 8 caracteres
   - Pelo menos uma letra maiúscula
   - Pelo menos uma letra minúscula
   - Pelo menos um caractere especial

4. **Campos Obrigatórios**
   - Todos os campos marcados como required
   - Validação específica por tipo de usuário

## Fluxo de Registro

1. Usuário acessa `/account-type`
2. Seleciona o tipo de conta
3. É redirecionado para o formulário específico
4. Preenche os dados
5. Sistema valida as informações
6. Conta é criada
7. Usuário é redirecionado para login

## Observações

- Um usuário pode ser tanto adotante quanto tutor temporário
- ONGs não podem ser adotantes ou tutores temporários
- O sistema mantém histórico de todas as ações do usuário
- Dados sensíveis são criptografados antes do armazenamento 