// src/components/Navbar.js
import { Search, X } from 'lucide-react';

function Navbar({ search, setSearch, selectedTags, setSelectedTags, allTags }) {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-800">NotesApp</span>
          <div className="flex items-center space-x-4 flex-1 max-w-2xl mx-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Search notes..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {allTags.map(tag => (
                <button
                  key={tag.name}
                  onClick={() => setSelectedTags(prev => 
                    prev.includes(tag.name) 
                      ? prev.filter(t => t !== tag.name)
                      : [...prev, tag.name]
                  )}
                  className={`px-3 py-1 rounded-full text-sm flex items-center gap-1
                    ${selectedTags.includes(tag.name) 
                      ? 'bg-teal-500 text-white' 
                      : 'bg-gray-100 text-gray-600'}`}
                >
                  {tag.name}
                  <span className="text-xs">({tag.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;