// services/noteService.js
import Note from '../models/Note.js';

class NoteService {
  async createNote(noteData) {
    return await Note.create(noteData);
  }

  async getAllNotes(query = {}) {
    const { search, tags } = query;
    let filter = {};

    if (search && search.length >= 2) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : [tags];
      filter.tags = { $all: tagArray };
    }

    return await Note.find(filter).sort({ createdAt: -1 });
  }

  async getNoteById(id) {
    return await Note.findById(id);
  }

  async updateNote(id, noteData) {
    return await Note.findByIdAndUpdate(id, noteData, { new: true });
  }

  async deleteNote(id) {
    return await Note.findByIdAndDelete(id);
  }

  async getAllTags() {
    const result = await Note.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    return result.map(tag => ({ name: tag._id, count: tag.count }));
  }
}

export default new NoteService();