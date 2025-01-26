// src/App.jsx
import { useState, useEffect } from 'react';
import { notesApi } from './api/notesApi';
import Navbar from './components/Navbar';
import NoteCard from './components/NoteCard';
import NoteForm from './components/NoteForm';

function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await notesApi.getAllNotes(search, selectedTags);
      setNotes(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch notes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const tags = await notesApi.getAllTags();
      setAllTags(tags);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [search, selectedTags]);

  useEffect(() => {
    fetchTags();
  }, []);

  const handleSave = async (noteData) => {
    try {
      setLoading(true);
      if (editingNote) {
        await notesApi.updateNote(editingNote._id, noteData);
        setEditingNote(null);
      } else {
        await notesApi.createNote(noteData);
      }
      await fetchNotes();
      await fetchTags();
      setError(null);
    } catch (err) {
      setError('Failed to save note');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await notesApi.deleteNote(id);
      await fetchNotes();
      await fetchTags();
      setError(null);
    } catch (err) {
      setError('Failed to delete note');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        search={search}
        setSearch={setSearch}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        allTags={allTags}
      />
      <div className="max-w-7xl mx-auto px-4 py-6">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        <div className="flex gap-6">
          
          <div className="w-2/3">
            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : (
              <div className="space-y-4">
                {notes.map(note => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    onEdit={setEditingNote}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                {editingNote ? 'Edit Note' : 'Add New Note'}
              </h2>
              <NoteForm
                note={editingNote}
                onSave={handleSave}
                onCancel={() => setEditingNote(null)}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;