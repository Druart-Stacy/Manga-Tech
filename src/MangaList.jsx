import React from 'react';
import { Link } from 'react-router-dom';

const MangaList = () => {
  const mangaData = JSON.parse(localStorage.getItem('mangas')) || [];

  if (mangaData.length === 0) {
    return <p>Aucun manga n'a été ajouté.</p>;
  }

  const handleDelete = (id) => {
    const updatedMangas = mangaData.filter((manga) => manga.id !== id);
    localStorage.setItem('mangas', JSON.stringify(updatedMangas));
    window.location.reload(); // Recharger la page pour mettre à jour la liste
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedMangas = mangaData.map((manga) =>
      manga.id === id ? { ...manga, status: newStatus } : manga
    );
    localStorage.setItem('mangas', JSON.stringify(updatedMangas));
    window.location.reload(); // Recharger la page pour mettre à jour la liste
  };

  return (
    <div>
      <h1>Liste des Mangas</h1>
      {mangaData.map((manga) => (
        <div key={manga.id}>
          <h2>{manga.title}</h2>
          <img src={manga.photo} alt="Photo du Manga" style={{ width: '100px', height: 'auto' }} />
          <p>Auteur: {manga.author}</p>
          <p>Description: {manga.description}</p>
          <p>Année de Sortie: {manga.releaseYear}</p>
          <p>Statut: {manga.status}</p>
          <button onClick={() => handleDelete(manga.id)}>Supprimer</button>
          <button onClick={() => handleStatusChange(manga.id, manga.status === 'Non lu' ? 'Lu' : 'Non lu')}>
            Marquer comme {manga.status === 'Non lu' ? 'Lu' : 'Non lu'}
          </button>
          <Link to={`/edit/${manga.id}`}>Modifier</Link>
        </div>
      ))}
    </div>
  );
};

export default MangaList;
