import React, { useState, useContext, useEffect } from 'react';
import { 
    FaHandHoldingHeart, 
    FaMapMarkerAlt, 
    FaQrcode, 
    FaSearch, 
    FaFilter, 
    FaCopy, 
    FaCheck,
    FaPaw,
    FaDog,
    FaCat,
    FaHeart,
    FaBoxOpen,
    FaShower,
    FaPills
} from 'react-icons/fa';
import { ThemeContext } from '../../../contexts/ThemeContext';
import styles from './Doacoes.module.css';

const Doacoes = () => {
    const { darkMode } = useContext(ThemeContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('todos');
    const [copiedPix, setCopiedPix] = useState(null);
    const [showCopiedMessage, setShowCopiedMessage] = useState(false);

    // Dados simulados de ONGs (em produção, viriam do backend)
    const ongs = [
        {
            id: 1,
            nome: 'Amigos dos Bichos',
            logo: '/images/ong1.png',
            descricao: 'ONG dedicada ao resgate e cuidado de animais abandonados.',
            necessidades: {
                alimentos: ['Ração para cães adultos', 'Ração para gatos filhotes'],
                higiene: ['Shampoo para cães', 'Areia sanitária'],
                medicamentos: ['Vermífugo', 'Anti-pulgas']
            },
            pontosColeta: [
                {
                    endereco: 'Rua das Flores, 123 - São Paulo, SP',
                    horario: 'Seg-Sex: 9h-18h'
                },
                {
                    endereco: 'Av. Principal, 456 - São Paulo, SP',
                    horario: 'Sáb-Dom: 10h-16h'
                }
            ],
            pix: {
                chave: 'ong.amigosdosbichos@gmail.com',
                tipo: 'email'
            }
        },
        {
            id: 2,
            nome: 'Lar Temporário',
            logo: '/images/ong2.png',
            descricao: 'Abrigo temporário para animais em situação de risco.',
            necessidades: {
                alimentos: ['Ração para cães filhotes', 'Ração para gatos adultos'],
                higiene: ['Tapete higiênico', 'Coleiras'],
                medicamentos: ['Anti-inflamatório', 'Soro']
            },
            pontosColeta: [
                {
                    endereco: 'Rua dos Animais, 789 - São Paulo, SP',
                    horario: 'Seg-Sex: 8h-17h'
                }
            ],
            pix: {
                chave: '11987654321',
                tipo: 'telefone'
            }
        }
    ];

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilter = (filter) => {
        setSelectedFilter(filter);
    };

    const handleCopyPix = async (chave, ongId) => {
        try {
            await navigator.clipboard.writeText(chave);
            setCopiedPix(ongId);
            setShowCopiedMessage(true);
            setTimeout(() => {
                setShowCopiedMessage(false);
                setCopiedPix(null);
            }, 2000);
        } catch (err) {
            console.error('Erro ao copiar chave PIX:', err);
        }
    };

    const filteredOngs = ongs.filter(ong => {
        const matchesSearch = ong.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ong.descricao.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (selectedFilter === 'todos') return matchesSearch;
        
        return matchesSearch && ong.necessidades[selectedFilter]?.length > 0;
    });

    return (
        <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
            <div className={styles.header}>
                <h1>
                    <FaHandHoldingHeart className={styles.icon} />
                    Doações
                </h1>
                <p>
                    <FaPaw className={styles.icon} /> Ajude as ONGs a continuar cuidando dos animais
                </p>
            </div>

            <div className={styles.searchSection}>
                <div className={styles.searchBar}>
                    <FaSearch className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Buscar ONGs..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <div className={styles.filters}>
                    <button
                        className={`${styles.filterButton} ${selectedFilter === 'todos' ? styles.active : ''}`}
                        onClick={() => handleFilter('todos')}
                    >
                        <FaPaw /> Todos
                    </button>
                    <button
                        className={`${styles.filterButton} ${selectedFilter === 'alimentos' ? styles.active : ''}`}
                        onClick={() => handleFilter('alimentos')}
                    >
                        <FaBoxOpen /> Alimentos
                    </button>
                    <button
                        className={`${styles.filterButton} ${selectedFilter === 'higiene' ? styles.active : ''}`}
                        onClick={() => handleFilter('higiene')}
                    >
                        <FaShower /> Higiene
                    </button>
                    <button
                        className={`${styles.filterButton} ${selectedFilter === 'medicamentos' ? styles.active : ''}`}
                        onClick={() => handleFilter('medicamentos')}
                    >
                        <FaPills /> Medicamentos
                    </button>
                </div>
            </div>

            <div className={styles.ongsGrid}>
                {filteredOngs.map((ong, index) => (
                    <div 
                        key={ong.id} 
                        className={styles.ongCard}
                        style={{ '--card-index': index }}
                    >
                        <div className={styles.ongHeader}>
                            <img src={ong.logo} alt={ong.nome} className={styles.ongLogo} />
                            <h2>
                                {ong.nome.includes('Cães') ? <FaDog className={styles.icon} /> : 
                                 ong.nome.includes('Gatos') ? <FaCat className={styles.icon} /> : 
                                 <FaPaw className={styles.icon} />} 
                                {ong.nome}
                            </h2>
                        </div>

                        <p className={styles.ongDescription}>{ong.descricao}</p>

                        <div className={styles.necessidades}>
                            <h3>
                                <FaHeart className={styles.icon} />
                                Necessidades
                            </h3>
                            {Object.entries(ong.necessidades).map(([tipo, items]) => (
                                items.length > 0 && (
                                    <div key={tipo} className={styles.necessidadeGrupo}>
                                        <h4>
                                            {tipo === 'alimentos' ? <FaBoxOpen className={styles.icon} /> :
                                             tipo === 'higiene' ? <FaShower className={styles.icon} /> :
                                             <FaPills className={styles.icon} />}
                                            {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                                        </h4>
                                        <ul>
                                            {items.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            ))}
                        </div>

                        <div className={styles.pontosColeta}>
                            <h3>
                                <FaMapMarkerAlt className={styles.icon} />
                                Pontos de Coleta
                            </h3>
                            {ong.pontosColeta.map((ponto, index) => (
                                <div key={index} className={styles.pontoColeta}>
                                    <p>{ponto.endereco}</p>
                                    <span>{ponto.horario}</span>
                                </div>
                            ))}
                        </div>

                        <div className={styles.pix}>
                            <h3>
                                <FaQrcode className={styles.icon} />
                                Doação via PIX
                            </h3>
                            <p>Chave PIX ({ong.pix.tipo}):</p>
                            <div className={styles.pixKey}>
                                {ong.pix.chave}
                                <button 
                                    className={styles.copyButton}
                                    onClick={() => handleCopyPix(ong.pix.chave, ong.id)}
                                >
                                    {copiedPix === ong.id ? (
                                        <>
                                            <FaCheck /> Copiado!
                                        </>
                                    ) : (
                                        <>
                                            <FaCopy /> Copiar
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Doacoes; 