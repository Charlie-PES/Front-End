import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaPaw, FaHeart, FaShare, FaMapMarkerAlt, FaDog, FaCat } from 'react-icons/fa';
import styles from './Adotar.module.css';
import { ThemeContext } from '../../../contexts/ThemeContext';

const Adotar = () => {
  const { darkMode } = useContext(ThemeContext);
  const [filtros, setFiltros] = useState({
    comportamento: '',
    tamanho: '',
    sexo: [],
    especial: '',
    tipo: 'todos'
  });
  const [busca, setBusca] = useState('');
  const [selectedPet, setSelectedPet] = useState(null);

  const pets = [
    { 
      id: 1, 
      nome: 'Carlinhos', 
      imagem: '/images/dog1.png', 
      sexo: 'Fêmea', 
      porte: 'Pequeno', 
      comportamento: 'Calmo', 
      especial: 'Não',
      tipo: 'cachorro',
      idade: '2 anos',
      localizacao: 'São Paulo, SP',
      descricao: 'Carlinhos é uma fêmea muito dócil e carinhosa. Adora brincar com crianças e se dá bem com outros animais.',
      vacinado: true,
      castrado: true
    },
    { 
      id: 2, 
      nome: 'Bolinha', 
      imagem: '/images/dog2.png', 
      sexo: 'Macho', 
      porte: 'Médio', 
      comportamento: 'Protetor', 
      especial: 'Não',
      tipo: 'cachorro',
      idade: '3 anos',
      localizacao: 'Rio de Janeiro, RJ',
      descricao: 'Bolinha é um macho muito protetor e leal. Ideal para famílias que buscam um guardião.',
      vacinado: true,
      castrado: true
    },
    { 
      id: 3, 
      nome: 'Apolo', 
      imagem: '/images/dog3.png', 
      sexo: 'Fêmea', 
      porte: 'Grande', 
      comportamento: 'Brincalhão', 
      especial: 'Sim',
      tipo: 'cachorro',
      idade: '1 ano',
      localizacao: 'Belo Horizonte, MG',
      descricao: 'Apolo é uma fêmea muito brincalhona e energética. Precisa de uma família que possa dar bastante atenção e exercício.',
      vacinado: true,
      castrado: false
    },
    { 
      id: 4, 
      nome: 'Gaia', 
      imagem: '/images/dog4.png', 
      sexo: 'Fêmea', 
      porte: 'Médio', 
      comportamento: 'Brincalhão', 
      especial: 'Não',
      tipo: 'cachorro',
      idade: '4 anos',
      localizacao: 'Curitiba, PR',
      descricao: 'Gaia é uma fêmea muito brincalhona e sociável. Adora passear e conhecer pessoas novas.',
      vacinado: true,
      castrado: true
    },
    { 
      id: 5, 
      nome: 'Spike', 
      imagem: '/images/dog5.png', 
      sexo: 'Macho', 
      porte: 'Grande', 
      comportamento: 'Calmo', 
      especial: 'Sim',
      tipo: 'cachorro',
      idade: '5 anos',
      localizacao: 'Porto Alegre, RS',
      descricao: 'Spike é um macho muito calmo e tranquilo. Ideal para famílias que buscam um companheiro mais quieto.',
      vacinado: true,
      castrado: true
    },
    { 
      id: 6, 
      nome: 'Duduzão', 
      imagem: '/images/dog6.png', 
      sexo: 'Fêmea', 
      porte: 'Pequeno', 
      comportamento: 'Protetor', 
      especial: 'Não',
      tipo: 'cachorro',
      idade: '2 anos',
      localizacao: 'Salvador, BA',
      descricao: 'Duduzão é uma fêmea muito protetora e leal. Adora ficar perto da família e alertar sobre visitas.',
      vacinado: true,
      castrado: true
    },
    { 
      id: 7, 
      nome: 'Jaime', 
      imagem: '/images/dog7.png', 
      sexo: 'Macho', 
      porte: 'Pequeno', 
      comportamento: 'Calmo', 
      especial: 'Sim',
      tipo: 'cachorro',
      idade: '3 anos',
      localizacao: 'Recife, PE',
      descricao: 'Jaime é um macho muito calmo e tranquilo. Ideal para apartamentos e famílias que buscam um companheiro mais quieto.',
      vacinado: true,
      castrado: true
    },
    { 
      id: 8, 
      nome: 'Mister bigodes', 
      imagem: '/images/cat1.png', 
      sexo: 'Macho', 
      porte: 'Pequeno', 
      comportamento: 'Calmo', 
      especial: 'Sim',
      tipo: 'gato',
      idade: '2 anos',
      localizacao: 'Brasília, DF',
      descricao: 'Mister bigodes é um macho muito calmo e independente. Adora ficar deitado no sol e receber carinhos.',
      vacinado: true,
      castrado: true
    },
    { 
      id: 9, 
      nome: 'Alho', 
      imagem: '/images/cat2.png', 
      sexo: 'Macho', 
      porte: 'Pequeno', 
      comportamento: 'Calmo', 
      especial: 'Sim',
      tipo: 'gato',
      idade: '1 ano',
      localizacao: 'Fortaleza, CE',
      descricao: 'Alho é um macho muito brincalhão e curioso. Adora explorar a casa e brincar com bolinhas.',
      vacinado: true,
      castrado: false
    }
  ];

  const toggleSexo = (valor) => {
    setFiltros((prev) => ({
      ...prev,
      sexo: prev.sexo.includes(valor)
        ? prev.sexo.filter((s) => s !== valor)
        : [...prev.sexo, valor],
    }));
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetarFiltros = () => {
    setFiltros({
      comportamento: '',
      tamanho: '',
      sexo: [],
      especial: '',
      tipo: 'todos'
    });
    setBusca('');
  };

  const petsFiltrados = pets.filter((pet) => {
    const sexoMatch = filtros.sexo.length === 0 || filtros.sexo.includes(pet.sexo);
    const porteMatch = !filtros.tamanho || pet.porte === filtros.tamanho;
    const comportamentoMatch = !filtros.comportamento || pet.comportamento === filtros.comportamento;
    const especialMatch = !filtros.especial || pet.especial === filtros.especial;
    const tipoMatch = filtros.tipo === 'todos' || pet.tipo === filtros.tipo;
    const buscaMatch = !busca || 
      pet.nome.toLowerCase().includes(busca.toLowerCase()) || 
      pet.descricao.toLowerCase().includes(busca.toLowerCase());
    
    return sexoMatch && porteMatch && comportamentoMatch && especialMatch && tipoMatch && buscaMatch;
  });

  const handlePetClick = (pet) => {
    setSelectedPet(pet);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closePetDetails = () => {
    setSelectedPet(null);
  };

  return (
    <div className={`${styles.adotarContainer} ${darkMode ? styles.darkMode : ''}`}>
      <div className={styles.searchContainer}>
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Buscar pets por nome ou características..." 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.mainContent}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h2>Filtrar</h2>
          </div>

          <div className={styles.filterGroup}>
            <label>Tipo</label>
            <div className={styles.tipoButtons}>
              <button 
                className={`${styles.tipoBtn} ${filtros.tipo === 'todos' ? styles.active : ''}`}
                onClick={() => handleFiltroChange({ target: { name: 'tipo', value: 'todos' } })}
              >
                <FaPaw /> Todos
              </button>
              <button 
                className={`${styles.tipoBtn} ${filtros.tipo === 'gato' ? styles.active : ''}`}
                onClick={() => handleFiltroChange({ target: { name: 'tipo', value: 'gato' } })}
              >
                <FaCat /> Gatos
              </button>
              <button 
                className={`${styles.tipoBtn} ${filtros.tipo === 'cachorro' ? styles.active : ''}`}
                onClick={() => handleFiltroChange({ target: { name: 'tipo', value: 'cachorro' } })}
              >
                <FaDog /> Cachorros
              </button>
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label>Comportamento</label>
            <select name="comportamento" onChange={handleFiltroChange} value={filtros.comportamento}>
              <option value="">Todos</option>
              <option value="Brincalhão">Brincalhão</option>
              <option value="Calmo">Calmo</option>
              <option value="Protetor">Protetor</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Porte</label>
            <select name="tamanho" onChange={handleFiltroChange} value={filtros.tamanho}>
              <option value="">Todos</option>
              <option value="Pequeno">Pequeno</option>
              <option value="Médio">Médio</option>
              <option value="Grande">Grande</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.checkboxGroupTitle}>Sexo</h3>
            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  onChange={() => toggleSexo('Fêmea')}
                  checked={filtros.sexo.includes('Fêmea')}
                  className={styles.checkboxInput}
                />
                <span className={styles.checkboxCustom}></span>
                Fêmea
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  onChange={() => toggleSexo('Macho')}
                  checked={filtros.sexo.includes('Macho')}
                  className={styles.checkboxInput}
                />
                <span className={styles.checkboxCustom}></span>
                Macho
              </label>
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label>Necessidades especiais</label>
            <select name="especial" onChange={handleFiltroChange} value={filtros.especial}>
              <option value="">Todos</option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
          </div>

          <button className={styles.resetBtn} onClick={resetarFiltros}>Limpar filtros</button>
        </aside>

        <main className={styles.petsGrid}>
          {petsFiltrados.length > 0 ? (
            petsFiltrados.map((pet) => (
              <div 
                key={pet.id} 
                className={`${styles.petCard} ${styles.fadeIn}`}
                onClick={() => handlePetClick(pet)}
              >
                <div className={styles.petImageContainer}>
                  <img src={pet.imagem} alt={pet.nome} />
                  <div className={styles.petTypeBadge}>
                    {pet.tipo === 'cachorro' ? <FaDog /> : <FaCat />}
                  </div>
                </div>
                <div className={styles.petInfo}>
                  <h3>{pet.nome}</h3>
                  <div className={styles.petDetails}>
                    <span>{pet.porte}</span>
                    <span>{pet.sexo}</span>
                  </div>
                  <div className={styles.petLocation}>
                    <FaMapMarkerAlt /> {pet.localizacao}
                  </div>
                </div>
                <div className={styles.petActions}>
                  <button className={styles.favoriteBtn}>
                    <FaHeart />
                  </button>
                  <button className={styles.shareBtn}>
                    <FaShare />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              <FaPaw className={styles.noResultsIcon} />
              <p>Nenhum pet encontrado com os filtros selecionados 🐾</p>
              <button className={styles.resetBtn} onClick={resetarFiltros}>Limpar filtros</button>
            </div>
          )}
        </main>
      </div>

      {selectedPet && (
        <div className={styles.petModal} onClick={closePetDetails}>
          <div className={styles.petModalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeModalBtn} onClick={closePetDetails}>×</button>
            <div className={styles.petModalImage}>
              <img src={selectedPet.imagem} alt={selectedPet.nome} />
            </div>
            <div className={styles.petModalInfo}>
              <h2>{selectedPet.nome}</h2>
              <div className={styles.petModalDetails}>
                <div className={styles.petModalDetail}>
                  <span className={styles.detailLabel}>Tipo:</span>
                  <span className={styles.detailValue}>
                    {selectedPet.tipo === 'cachorro' ? 'Cachorro' : 'Gato'}
                  </span>
                </div>
                <div className={styles.petModalDetail}>
                  <span className={styles.detailLabel}>Porte:</span>
                  <span className={styles.detailValue}>{selectedPet.porte}</span>
                </div>
                <div className={styles.petModalDetail}>
                  <span className={styles.detailLabel}>Sexo:</span>
                  <span className={styles.detailValue}>{selectedPet.sexo}</span>
                </div>
                <div className={styles.petModalDetail}>
                  <span className={styles.detailLabel}>Idade:</span>
                  <span className={styles.detailValue}>{selectedPet.idade}</span>
                </div>
                <div className={styles.petModalDetail}>
                  <span className={styles.detailLabel}>Comportamento:</span>
                  <span className={styles.detailValue}>{selectedPet.comportamento}</span>
                </div>
                <div className={styles.petModalDetail}>
                  <span className={styles.detailLabel}>Necessidades especiais:</span>
                  <span className={styles.detailValue}>{selectedPet.especial}</span>
                </div>
                <div className={styles.petModalDetail}>
                  <span className={styles.detailLabel}>Vacinado:</span>
                  <span className={styles.detailValue}>{selectedPet.vacinado ? 'Sim' : 'Não'}</span>
                </div>
                <div className={styles.petModalDetail}>
                  <span className={styles.detailLabel}>Castrado:</span>
                  <span className={styles.detailValue}>{selectedPet.castrado ? 'Sim' : 'Não'}</span>
                </div>
                <div className={styles.petModalDetail}>
                  <span className={styles.detailLabel}>Localização:</span>
                  <span className={styles.detailValue}>{selectedPet.localizacao}</span>
                </div>
              </div>
              <div className={styles.petModalDescription}>
                <h3>Sobre {selectedPet.nome}</h3>
                <p>{selectedPet.descricao}</p>
              </div>
              <div className={styles.petModalActions}>
                <Link to={`/match/${selectedPet.id}`} className={styles.adotarBtn}>
                  ME ADOTE
                </Link>
                <button className={styles.favoriteBtn}>
                  <FaHeart /> Favoritar
                </button>
                <button className={styles.shareBtn}>
                  <FaShare /> Compartilhar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adotar;
