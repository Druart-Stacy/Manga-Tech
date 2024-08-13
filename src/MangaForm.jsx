import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MangaForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [photo, setPhoto] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newManga = {
      id: Date.now(), // Génère un identifiant unique
      title,
      author,
      description,
      releaseYear,
      photo,
      status: 'Non lu',
    };

    const existingMangas = JSON.parse(localStorage.getItem('mangas')) || [];
    existingMangas.push(newManga);
    localStorage.setItem('mangas', JSON.stringify(existingMangas));
    
    // Rediriger vers la liste des mangas
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Ajouter un Manga</h1>
      <label>
        Titre:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Auteur:
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <label>
        Année de Sortie:
        <input type="number" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} required />
      </label>
      <label>
        Photo (URL):
        <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} required />
      </label>
      <button type="submit">Ajouter le Manga</button>
    </form>
  );
};

export default MangaForm;
