# Documentação do Sistema de Matching de Pets

## Visão Geral
O sistema de matching de pets é uma funcionalidade que permite encontrar o pet ideal para um adotante com base em suas preferências e características. O sistema utiliza um algoritmo de pontuação para calcular a compatibilidade entre as preferências do usuário e os atributos dos pets disponíveis.

## Arquivos Relacionados

### Frontend
1. `src/pages/MatchPage.js`
   - Página principal do matching
   - Gerencia o formulário de preferências do usuário
   - Controla o fluxo de transição e redirecionamento

2. `src/components/MatchTransition/MatchTransition.js`
   - Componente de transição visual durante o matching
   - Exibe animações e feedback visual do processo

3. `src/services/matchService.js`
   - Serviço que implementa a lógica de matching
   - Comunica com o backend para buscar pets e calcular compatibilidade

### Backend
1. `src/controllers/matchController.js`
   - Controlador que gerencia as requisições de matching
   - Integra com o serviço de matching

2. `src/services/matchService.js` (backend)
   - Implementa a lógica de matching no servidor
   - Calcula scores de compatibilidade

## Atributos dos Pets

### Informações Básicas
- `id`: Identificador único do pet
- `nome`: Nome do pet
- `tipo`: Espécie (cachorro/gato)
- `raca`: Raça do pet
- `cor`: Cor do pet
- `idade`: Idade em anos
- `sexo`: Gênero do pet
- `porte`: Tamanho (pequeno/médio/grande)

### Características
- `energia`: Nível de energia (baixo/médio/alto)
- `temperamento`: Array de características comportamentais
- `comportamento`: Descrição do comportamento geral

### Saúde e Cuidados
- `vacinas`: Status de vacinação
- `castrado`: Status de castração
- `necessidades`: Necessidades especiais
- `specialNeeds`: Detalhes das necessidades especiais

### Ambiente e Compatibilidade
- `environment`: Ambiente ideal (apartamento/casa/ambos)
- `compatibility`: Compatibilidade com outros animais
- `goodWithOtherPets`: Boa convivência com outros pets

## Sistema de Pontuação

### Pesos dos Critérios
```javascript
const MATCH_WEIGHTS = {
    species: 20,          // Espécie (cão/gato)
    size: 15,            // Tamanho
    age: 15,             // Idade
    energy: 10,          // Nível de energia
    temperament: 10,     // Temperamento
    specialNeeds: 10,    // Necessidades especiais
    environment: 10,     // Ambiente ideal
    compatibility: 10    // Compatibilidade com outros animais
};
```

### Mapeamentos de Valores
```javascript
// Mapeamento de níveis de energia para valores numéricos
const ENERGY_LEVELS = {
    'low': 1,
    'medium': 2,
    'high': 3
};

// Mapeamento de tamanhos
const SIZE_MAPPING = {
    'small': 'pequeno',
    'medium': 'medio',
    'large': 'grande'
};

// Mapeamento de espécies
const SPECIES_MAPPING = {
    'dog': 'cachorro',
    'cat': 'gato'
};

// Mapeamento de ambientes
const ENVIRONMENT_MAPPING = {
    'apartment': 'apartamento',
    'house': 'casa',
    'both': 'ambos'
};
```

### Detalhamento da Pontuação

1. **Espécie (20 pontos)**
   - Match exato: 20 pontos
   - Não match: 0 pontos

2. **Tamanho (15 pontos)**
   - Match exato: 15 pontos
   - Não match: 0 pontos

3. **Idade (15 pontos)**
   - Diferença ≤ 2 anos: 15 pontos
   - Diferença ≤ 4 anos: 7.5 pontos
   - Diferença > 4 anos: 0 pontos

4. **Energia (10 pontos)**
   - Match exato: 10 pontos
   - Diferença de 1 nível: 5 pontos
   - Diferença de 2 níveis: 0 pontos

5. **Temperamento (10 pontos)**
   - Cada match de temperamento: 2 pontos
   - Máximo de 10 pontos (5 matches)

6. **Necessidades Especiais (10 pontos)**
   - Match exato: 10 pontos
   - Não match: 0 pontos

7. **Ambiente (10 pontos)**
   - Match exato: 10 pontos
   - Não match: 0 pontos

8. **Compatibilidade (10 pontos)**
   - Match exato: 10 pontos
   - Não match: 0 pontos

## Validação e Normalização

### Função validateAndNormalizeData
```javascript
const validateAndNormalizeData = (pet, userPreferences) => {
    // Verifica campos obrigatórios
    const requiredFields = ['species', 'size', 'age', 'energy', 'temperament', 'specialNeeds', 'environment', 'compatibility'];
    
    // Normaliza valores
    // - Converte para minúsculas
    // - Ordena arrays
    // - Padroniza booleanos
    // - Aplica mapeamentos de valores
};
```

## Fluxo do Processo

1. **Coleta de Preferências**
   - Usuário preenche formulário com preferências
   - Dados são validados e normalizados
   - Formulário inclui todos os critérios de matching

2. **Processamento**
   - Frontend envia preferências para o backend
   - Backend busca pets disponíveis
   - Sistema calcula scores para cada pet
   - Pets são ordenados por score
   - Pets com score < 30% são filtrados

3. **Resultado**
   - Top 3 matches são retornados
   - Frontend exibe transição visual
   - Usuário é redirecionado para o pet com maior compatibilidade

## Integração Front-Back

### Requisição
```javascript
// Frontend → Backend
const response = await api.post('/match/preferences', {
    species: 'dog',
    size: 'medium',
    age: 2,
    energy: 'high',
    temperament: ['calmo', 'afetuoso'],
    specialNeeds: false,
    environment: 'apartment',
    compatibility: 'yes'
});
```

### Resposta
```javascript
// Backend → Frontend
{
    matches: [
        {
            pet: {
                id: 1,
                nome: 'Rex',
                // ... outros dados do pet
            },
            matchScore: {
                score: 85,
                percentage: 85,
                details: {
                    species: true,
                    size: true,
                    age: true,
                    energy: true,
                    temperament: true,
                    specialNeeds: true,
                    environment: true,
                    compatibility: true
                }
            }
        }
        // ... outros matches
    ]
}
```

## Validações e Tratamentos

### Normalização de Dados
- Valores são convertidos para minúsculas
- Arrays são ordenados
- Valores booleanos são padronizados
- Datas são convertidas para formato padrão
- Aplicação de mapeamentos de valores (espécie, tamanho, ambiente)

### Validações
- Campos obrigatórios
- Tipos de dados corretos
- Valores dentro dos ranges permitidos
- Formato dos dados

### Tratamento de Erros
- Feedback visual para o usuário
- Logs de erro no backend
- Fallback para casos de erro
- Mensagens de erro amigáveis

## Melhorias Implementadas

### Normalização de Dados
- Mapeamento de valores para consistência
- Tratamento de casos especiais
- Padronização de formatos

### Cálculo de Score
- Sistema de pesos para diferentes critérios
- Tratamento de matches parciais
- Consideração de tolerâncias
- Filtro de score mínimo (30%)

### Interface
- Feedback visual durante o processo
- Transições suaves
- Suporte a modo escuro
- Design responsivo

### Performance
- Cálculos otimizados
- Cache de resultados
- Paginação de resultados
- Lazy loading de imagens

## Considerações Técnicas

### Segurança
- Validação de dados no backend
- Sanitização de inputs
- Proteção contra injeção de dados
- Autenticação de usuários

### Performance
- Otimização de queries
- Cache de resultados
- Lazy loading
- Compressão de dados

### Manutenibilidade
- Código modular
- Documentação clara
- Testes unitários
- Logs detalhados

## Próximos Passos

1. **Melhorias Planejadas**
   - Implementação de machine learning para matching
   - Sistema de feedback pós-adoção
   - Análise de compatibilidade histórica

2. **Otimizações**
   - Cache mais eficiente
   - Melhor tratamento de erros
   - Interface mais intuitiva

3. **Novas Funcionalidades**
   - Filtros adicionais
   - Sistema de recomendação
   - Histórico de matches 