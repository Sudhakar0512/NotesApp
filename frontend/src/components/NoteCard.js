// src/components/NoteCard.js
import { Edit, Trash } from 'lucide-react';

function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow p-4">
      <h3 className="font-semibold text-gray-800 mb-2">{note.title}</h3>
      <p className="text-gray-600 text-sm line-clamp-2">{note.content}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {note.tags.map(tag => (
          <span key={tag} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-gray-500">
          {new Date(note.createdAt).toLocaleDateString()}
        </span>
        <div className="flex space-x-2">
          <button onClick={() => onEdit(note)} className="p-1 hover:bg-gray-100 rounded-full">
            <Edit className="h-4 w-4 text-gray-600" />
          </button>
          <button onClick={() => onDelete(note._id)} className="p-1 hover:bg-gray-100 rounded-full">
            <Trash className="h-4 w-4 text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;