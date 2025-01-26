// components/NotesList.jsx
function NotesList({ notes, selectedNote, onSelectNote, onDelete, loading }) {
  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="space-y-2">
      {notes.map(note => (
        <div
          key={note._id}
          className={`p-3 rounded-lg cursor-pointer transition-colors ${
            selectedNote?._id === note._id
              ? 'bg-teal-50 border-teal-500'
              : 'bg-gray-50 hover:bg-gray-100'
          }`}
          onClick={() => onSelectNote(note)}
        >
          <h3 className="font-medium text-gray-800 mb-1">{note.title}</h3>
          <div className="flex flex-wrap gap-1 mb-2">
            {note.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-gray-200 rounded-full text-xs text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="text-xs text-gray-500">
            {new Date(note.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotesList;