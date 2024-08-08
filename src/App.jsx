import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MangaForm from './MangaForm';
import MangaList from './MangaList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MangaForm />} />
        <Route path="/list" element={<MangaList />} />
        <Route path="/edit/:id" element={<MangaForm />} /> {/* Route pour éditer */}
      </Routes>
    </Router>
  );
}

export default App;
