// App.jsx
import { useState, useEffect } from 'react';
import { notesApi } from './api/notesApi';
import Navbar from './components/Navbar';
import NotesList from './components/NoteList';
import NoteDetail from './components/NoteDetail';
import NoteForm from './components/NoteForm';
import { Plus } from 'lucide-react';

function App() {
 const [notes, setNotes] = useState([]);
 const [selectedNote, setSelectedNote] = useState(null);
 const [search, setSearch] = useState('');
 const [selectedTags, setSelectedTags] = useState([]);
 const [allTags, setAllTags] = useState([]);
 const [isCreating, setIsCreating] = useState(false);
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
     if (selectedNote?.isEditing) {
       await notesApi.updateNote(selectedNote._id, noteData);
       setSelectedNote(null);
     } else {
       await notesApi.createNote(noteData);
     }
     await fetchNotes();
     await fetchTags();
     setIsCreating(false);
     setError(null);
   } catch (err) {
     setError('Failed to save note');
   } finally {
     setLoading(false);
   }
 };

 const handleDelete = async (id) => {
   try {
     setLoading(true);
     await notesApi.deleteNote(id);
     setSelectedNote(null);
     await fetchNotes();
     await fetchTags();
     setError(null);
   } catch (err) {
     setError('Failed to delete note');
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
         <div className="w-1/3">
           <div className="bg-white rounded-lg shadow-md p-4 mb-4">
             <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-bold text-gray-800">Notes</h2>
               <button
                 onClick={() => {
                   setIsCreating(true);
                   setSelectedNote(null);
                 }}
                 className="p-2 bg-teal-500 text-white rounded-full hover:bg-teal-600"
               >
                 <Plus size={20} />
               </button>
             </div>
             <NotesList
               notes={notes}
               selectedNote={selectedNote}
               onSelectNote={(note) => {
                 setSelectedNote(note);
                 setIsCreating(false);
               }}
               onDelete={handleDelete}
               loading={loading}
             />
           </div>
         </div>
         <div className="w-2/3">
           {isCreating ? (
             <div className="bg-white rounded-lg shadow-md p-6">
               <h2 className="text-xl font-bold text-gray-800 mb-6">
                 Create New Note
               </h2>
               <NoteForm
                 onSave={handleSave}
                 onCancel={() => {
                   setIsCreating(false);
                 }}
                 disabled={loading}
               />
             </div>
           ) : selectedNote ? (
             selectedNote.isEditing ? (
               <div className="bg-white rounded-lg shadow-md p-6">
                 <h2 className="text-xl font-bold text-gray-800 mb-6">
                   Edit Note
                 </h2>
                 <NoteForm
                   note={selectedNote}
                   onSave={handleSave}
                   onCancel={() => {
                     setSelectedNote(prev => ({ ...prev, isEditing: false }));
                   }}
                   disabled={loading}
                 />
               </div>
             ) : (
               <NoteDetail
                 note={selectedNote}
                 onEdit={(note) => setSelectedNote({ ...note, isEditing: true })}
                 onDelete={handleDelete}
               />
             )
           ) : (
             <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-md">
               <p className="text-gray-500">Select a note to view details</p>
             </div>
           )}
         </div>
       </div>
     </div>
   </div>
 );
}

export default App;