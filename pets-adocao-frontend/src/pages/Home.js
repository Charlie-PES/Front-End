import React from 'react';
import styles from './Home.module.css';

const Home = () => {
    return (
        <div className={styles.homeContainer}>

            {/* Banner principal */}
            <section className={styles.banner}>
                <div className={styles.bannerText}>
                    <h1>Seja bem-vindo!</h1>
                    <p>Adote doguinhos e gatinhos</p>
                    <button className={styles.adoptButton}>Adote agora</button>
                </div>
                <img src="/images/bigdog.png" alt="Dog Banner" className={styles.bannerImage} />
            </section>

            {/* Categorias */}
            <section className={styles.categories}>
                <div className={styles.category}>
                    <img src="/images/dog1.png" alt="Cachorros" />
                    <p>Cachorros</p>
                </div>
                <div className={styles.category}>
                    <img src="/images/cat1.png" alt="Gatos" />
                    <p>Gatos</p>
                </div>
                <div className={styles.category}>
                    <img src="/images/misc1.png" alt="Outros" />
                    <p>Outros animais</p>
                </div>
            </section>

            {/* Pets para adoção */}
            <section className={styles.adocao}>
                <h2>Pets para adoção</h2>
                <p>Olhe nossos amiguinhos</p>
                <div className={styles.petCards}>
                    {['Ronaldinho', 'Bolinha', 'Zezé'].map((nome, i) => (
                        <div key={i} className={styles.petCard}>
                            <img src={`/images/dog${i + 1}.png`} alt={nome} />
                            <h3>{nome}</h3>
                            <p>
                                {nome === 'Ronaldinho' && 'Muito fofo, inteligente e educado'}
                                {nome === 'Bolinha' && 'Super simpático, leal e sabe muito'}
                                {nome === 'Zezé' && 'Super carente, sabe dividir, simples, ama passeios e ama comer queijo'}
                            </p>
                            <button className={styles.adoteBtn}>ME ADOTE</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Passos para adoção */}
            <section className={styles.steps}>
                <h2>Love algum animalzinho?</h2>
                <p>Siga esses passos</p>
                <div className={styles.stepsContainer}>
                    <div>
                        <img src="/images/dog5.png" alt="Passo 1" />
                        <p>Escolha um animalzinho</p>
                    </div>
                    <div>
                        <img src="/images/dog6.png" alt="Passo 2" />
                        <p>Adote ele</p>
                    </div>
                    <div>
                        <img src="/images/dog7.png" alt="Passo 3" />
                        <p>Deixam amigos para sempre</p>
                    </div>
                </div>
                <button className={styles.adoptNowBtn}>ADOTE AGORA</button>
            </section>

        </div>
    );
};

export default Home;
