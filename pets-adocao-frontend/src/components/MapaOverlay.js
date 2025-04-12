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
    },
    {
      id: 2,
      autor: 'Abrigo Patinhas',
      conteudo: 'Luna foi adotada! Obrigado por fazer a diferença 🐾',
      imagem: '/images/feed2.jpg',
      data: '10/04/2025',
    },
  ]);

  return (
    <div className={styles.feedContainer}>
      <h1 className={styles.title}>📰 Feed de Adoção</h1>
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
    </div>
  );
};

export default Feed;
