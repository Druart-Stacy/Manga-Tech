import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MangaList = () => {
  const [mangaData, setMangaData] = useState(JSON.parse(localStorage.getItem('mangas')) || []);

  if (mangaData.length === 0) {
    return <p>Aucun manga n'a été ajouté.</p>;
  }

  const handleDelete = (id) => {
    const updatedMangas = mangaData.filter((manga) => manga.id !== id);
    localStorage.setItem('mangas', JSON.stringify(updatedMangas));
    setMangaData(updatedMangas); // Mettre à jour l'état local
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedMangas = mangaData.map((manga) =>
      manga.id === id ? { ...manga, status: newStatus } : manga
    );
    localStorage.setItem('mangas', JSON.stringify(updatedMangas));
    setMangaData(updatedMangas); // Mettre à jour l'état local
  };

  return (
    <div>
      <h1>Liste des Mangas</h1>
      {mangaData.map((manga) => (
        <div key={manga.id}>
          <h2>{manga.title}</h2>
          <img src={manga.photo} className='MangaPhoto' alt="Photo du Manga" />
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
      <Link to="/add" className="add-manga-button">Ajouter un autre manga</Link>
    </div>
  );
};

export default MangaList;
