import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MangaForm = () => {
  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [status, setStatus] = useState('Non lu');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      loadMangaData(id);
    }
  }, [id]);

  const loadMangaData = (id) => {
    const savedManga = JSON.parse(localStorage.getItem('mangas')) || [];
    const manga = savedManga.find((item) => item.id === parseInt(id));
    if (manga) {
      setTitle(manga.title);
      setPhoto(manga.photo);
      setPhotoPreview(manga.photo);
      setAuthor(manga.author);
      setDescription(manga.description);
      setReleaseYear(manga.releaseYear);
      setStatus(manga.status);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!title) newErrors.title = 'Le titre est obligatoire.';
    if (!photo) newErrors.photo = 'La photo est obligatoire.';
    if (!author) newErrors.author = 'L\'auteur est obligatoire.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const mangaData = {
      id: id ? parseInt(id) : Date.now(),
      title,
      photo, // Stocke l'image en base64
      author,
      description,
      releaseYear,
      status
    };

    let allMangas = JSON.parse(localStorage.getItem('mangas')) || [];

    if (id) {
      allMangas = allMangas.map((manga) => (manga.id === mangaData.id ? mangaData : manga));
    } else {
      allMangas.push(mangaData);
    }

    localStorage.setItem('mangas', JSON.stringify(allMangas));

    setTitle('');
    setPhoto(null);
    setPhotoPreview('');
    setAuthor('');
    setDescription('');
    setReleaseYear('');
    setStatus('Non lu');
    setErrors({});
    navigate('/list');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre (obligatoire):</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
        </div>
        <div>
          <label>Photo (obligatoire):</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
          {errors.photo && <p style={{ color: 'red' }}>{errors.photo}</p>}
          {photoPreview && <img src={photoPreview} alt="Aperçu de la photo" style={{ width: '100px', height: 'auto', marginTop: '10px' }} />}
        </div>
        <div>
          <label>Auteur (obligatoire):</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          {errors.author && <p style={{ color: 'red' }}>{errors.author}</p>}
        </div>
        <div>
          <label>Description (optionnel):</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Année de sortie (optionnel):</label>
          <input
            type="number"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
          />
        </div>
        <div>
          <label>Statut:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Non lu">Non lu</option>
            <option value="Lu">Lu</option>
          </select>
        </div>
        <button type="submit">{id ? 'Mettre à jour le Manga' : 'Ajouter le Manga'}</button>
      </form>
    </div>
  );
};

export default MangaForm;
