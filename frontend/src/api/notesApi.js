// src/api/notesApi.js
// src/api/notesApi.js
const API_URL = 'http://localhost:8000/api/notes';

export const notesApi = {
  getAllNotes: async (search = '', tags = []) => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (tags?.length) {
        tags.forEach(tag => params.append('tags', tag));
      }
      const response = await fetch(`${API_URL}?${params}`);
      if (!response.ok) throw new Error('Failed to fetch notes');
      return await response.json();
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  },

  getAllTags: async () => {
    try {
      const response = await fetch(`${API_URL}/tags`);
      if (!response.ok) throw new Error('Failed to fetch tags');
      return await response.json();
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  },

  createNote: async (noteData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData)
      });
      if (!response.ok) throw new Error('Failed to create note');
      return await response.json();
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  },

  updateNote: async (id, noteData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData)
      });
      if (!response.ok) throw new Error('Failed to update note');
      return await response.json();
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  },

  deleteNote: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete note');
      return await response.json();
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  }
};
