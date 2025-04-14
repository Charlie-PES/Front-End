import React, { useState } from 'react';
import styles from './Feed.module.css';

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      autor: 'ONG Amor Animal',
      conteudo: 'Hoje resgatamos 3 filhotes e todos passam bem! ❤️',
      imagem: '/images/feed1.jpg',
      data: '11/04/2025',
      tipo: 'noticia'
    },
    {
      id: 2,
      autor: 'Abrigo Patinhas',
      conteudo: 'Luna foi adotada! Obrigado por fazer a diferença 🐾',
      imagem: '/images/feed2.jpg',
      data: '10/04/2025',
      tipo: 'social'
    },
  ]);

  const [novoPost, setNovoPost] = useState('');

  const handlePublicar = () => {
    if (novoPost.trim() !== '') {
      const novo = {
        id: posts.length + 1,
        autor: 'Você',
        conteudo: novoPost,
        imagem: '',
        data: new Date().toLocaleDateString(),
        tipo: 'social'
      };
      setPosts([novo, ...posts]);
      setNovoPost('');
    }
  };

  return (
    <div className={styles.feedContainer}>
      <aside className={styles.leftSidebar}>
        <div className={styles.sidebarBox}>
          <h3>Tópicos</h3>
          <ul>
            <li>#adoções</li>
            <li>#resgates</li>
            <li>#sucesso</li>
            <li>#voluntariado</li>
          </ul>
        </div>
        <div className={styles.sidebarBox}>
          <h3>Filtrar</h3>
          <ul>
            <li>Todos</li>
            <li>Notícias</li>
            <li>Social</li>
          </ul>
        </div>
      </aside>

      <main className={styles.mainFeed}>
        <h1 className={styles.title}>📰 Feed de Adoção e Social</h1>

        <div className={styles.newPostBox}>
          <textarea
            placeholder="Compartilhe uma notícia ou história..."
            value={novoPost}
            onChange={(e) => setNovoPost(e.target.value)}
          />
          <button className={styles.adoptNowBtn} onClick={handlePublicar}>
            Publicar
          </button>
        </div>

        <div className={styles.postList}>
          {posts.map((post) => (
            <div key={post.id} className={styles.postCard}>
              <div className={styles.postHeader}>
                <h2>{post.autor}</h2>
                <span>{post.data}</span>
              </div>
              <p>{post.conteudo}</p>
              {post.imagem && (
                <img
                  src={post.imagem}
                  alt="Post"
                  className={styles.postImage}
                />
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Feed;
