// src/components/NoteForm.jsx
import { useState, useEffect } from 'react';

function NoteForm({ note, onSave, onCancel, disabled }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: ''
  });

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title || '',
        content: note.content || '',
        tags: note.tags?.join(', ') || ''
      });
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tags = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean);
    onSave({ ...formData, tags });
    if (!note) {
      setFormData({ title: '', content: '', tags: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Note Title"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500"
          disabled={disabled}
          required
        />
      </div>
      <div>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          placeholder="Write your note here..."
          rows="6"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500"
          disabled={disabled}
          required
        />
      </div>
      <div>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
          placeholder="Tags (comma separated)"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500"
          disabled={disabled}
        />
      </div>
      <div className="flex justify-end space-x-3">
        {note && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            disabled={disabled}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:ring-2 disabled:opacity-50"
          disabled={disabled}
        >
          {note ? 'Update' : 'Save'} Note
        </button>
      </div>
    </form>
  );
}

export default NoteForm;