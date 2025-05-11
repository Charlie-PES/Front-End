# Registro de Pets

## Quem Pode Registrar Pets

Apenas dois tipos de usuários podem registrar pets no sistema:

1. **ONGs**
   - Podem registrar múltiplos pets
   - Gerenciam o processo de adoção
   - Podem atualizar informações dos pets

2. **Tutores Temporários**
   - Podem registrar pets sob seus cuidados
   - Gerenciam informações dos pets
   - Podem atualizar status e detalhes

## Dados do Pet

### Informações Básicas
- Nome
- Espécie (Cachorro/Gato)
- Raça
- Cor
- Idade
- Gênero (Macho/Fêmea)
- Porte (Pequeno/Médio/Grande)

### Características
- Nível de Energia (Baixo/Médio/Alto)
- Temperamento
- Comportamento
- Ambiente Ideal
- Compatibilidade com outros animais

### Saúde
- Status de Vacinação
- Status de Castração
- Necessidades Especiais
- Histórico de Saúde

### Mídia
- Múltiplas fotos do pet
- Preview em tempo real
- Suporte a diferentes formatos de imagem

## Processo de Registro

### 1. Acesso
- Usuário deve estar logado
- Deve ser ONG ou Tutor Temporário
- Acessa a página `/pets/add`

### 2. Upload de Fotos
- Seleção de múltiplas imagens
- Preview antes do envio
- Validação de formato e tamanho

### 3. Preenchimento de Dados
- Formulário dividido em seções
- Campos obrigatórios marcados
- Validação em tempo real

### 4. Envio
- Validação final dos dados
- Upload das imagens
- Criação do registro no banco de dados

## Validações

O sistema realiza as seguintes validações:

1. **Imagens**
   - Formato válido (jpg, png, etc.)
   - Tamanho máximo
   - Quantidade mínima e máxima

2. **Dados**
   - Campos obrigatórios preenchidos
   - Formato correto dos dados
   - Validação de idade e medidas

3. **Permissões**
   - Verificação do tipo de usuário
   - Validação de autenticação
   - Verificação de limites de registro

## Após o Registro

1. **ONGs**
   - Pet aparece na lista de disponíveis
   - Pode gerenciar processos de adoção
   - Pode atualizar informações

2. **Tutores Temporários**
   - Pet aparece na lista de disponíveis
   - Pode atualizar status e informações
   - Pode gerenciar cuidados

## Observações

- Cada pet recebe um ID único
- O sistema mantém histórico de alterações
- Fotos são otimizadas antes do armazenamento
- Dados são validados tanto no frontend quanto no backend 