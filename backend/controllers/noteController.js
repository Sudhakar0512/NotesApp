// controllers/noteController.js
import noteService from '../services/noteService.js';

class NoteController {
  async createNote(req, res) {
    try {
      const note = await noteService.createNote(req.body);
      res.status(201).json(note);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllNotes(req, res) {
    try {
      const { search, tags } = req.query;
      const notes = await noteService.getAllNotes({ search, tags });
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllTags(req, res) {
    try {
      const tags = await noteService.getAllTags();
      res.json(tags);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getNoteById(req, res) {
    try {
      const note = await noteService.getNoteById(req.params.id);
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.json(note);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateNote(req, res) {
    try {
      const note = await noteService.updateNote(req.params.id, req.body);
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.json(note);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteNote(req, res) {
    try {
      const note = await noteService.deleteNote(req.params.id);
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.json({ message: 'Note deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async searchNotes(req, res) {
    try {
      const notes = await noteService.searchNotes(req.query.q);
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getNotesByTag(req, res) {
    try {
      const notes = await noteService.getNotesByTag(req.params.tag);
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new NoteController();