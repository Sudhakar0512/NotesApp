// components/NoteDetail.jsx
import { Edit, Trash, Calendar, Clock } from 'lucide-react';

function NoteDetail({ note, onEdit, onDelete }) {
 return (
   <div className="bg-white rounded-lg shadow-lg overflow-hidden">
     <header className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-white">
       <div className="flex justify-between items-center">
         <h2 className="text-3xl font-bold">{note.title}</h2>
         <div className="flex gap-3">
           <button
             onClick={() => onEdit(note)}
             className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
           >
             <Edit className="h-4 w-4" /> Edit
           </button>
           <button
             onClick={() => onDelete(note._id)}
             className="flex items-center gap-2 px-4 py-2 bg-red-500/80 rounded-lg hover:bg-red-500 transition-colors"
           >
             <Trash className="h-4 w-4" /> Delete
           </button>
         </div>
       </div>
     </header>
     
     <div className="p-8">
       <div className="prose max-w-none mb-8">
         <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
           {note.content}
         </p>
       </div>

       {note.tags.length > 0 && (
         <div className="flex flex-wrap gap-2 mb-8">
           {note.tags.map(tag => (
             <span
               key={tag}
               className="px-4 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm font-medium"
             >
               #{tag}
             </span>
           ))}
         </div>
       )}

       <footer className="flex flex-col sm:flex-row gap-4 pt-6 border-t text-sm text-gray-500">
         <div className="flex items-center gap-2">
           <Calendar className="h-4 w-4" />
           <span>Created {new Date(note.createdAt).toLocaleString()}</span>
         </div>
         {note.updatedAt && (
           <div className="flex items-center gap-2">
             <Clock className="h-4 w-4" />
             <span>Updated {new Date(note.updatedAt).toLocaleString()}</span>
           </div>
         )}
       </footer>
     </div>
   </div>
 );
}

export default NoteDetail;