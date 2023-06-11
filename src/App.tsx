import { useState, useEffect } from 'react';
import { Routes, Route, Navigate,Link } from 'react-router-dom';
import NewNote, { ContactData } from './NewNote';
import NoteList from './NoteList';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function App() {
  const [notes, setNotes] = useState<ContactData[]>([]);
  const [filterOption, setFilterOption] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  const handleAddNote = (note: ContactData) => {
    const updatedNotes = [note, ...notes]; 
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const handleClearNote = (index: number) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const handleFilterChange = (option: string) => {
    setFilterOption(option);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const noteIndex = queryParams.get('noteIndex');
  const noteToEdit = noteIndex !== null ? notes[parseInt(noteIndex)] : null;

  let filteredNotes = notes;
  if (filterOption === 'active') {
    filteredNotes = notes.filter((note) => note.radioOption === 'option1');
  } else if (filterOption === 'inactive') {
    filteredNotes = notes.filter((note) => note.radioOption === 'option2');
  }

  if (searchQuery) {
    filteredNotes = filteredNotes.filter((note) =>
      note.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  const navigate = useNavigate();
  return (
    <div>
      <nav className="sticky top-0 bg-blue-500 py-4">
  <div className="container mx-auto flex justify-between items-center">
    <div className="flex items-center">
    <Link to="/">
            <img src="./logo.png" alt="Logo" className="h-10 mr-2 rounded-full" />
          </Link>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500 h-10"
      />
    </div>
    <div className="flex">
      
      <div className="mr-2">
        <select id="filter" value={filterOption} onChange={(e) => handleFilterChange(e.target.value)} className="px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500 h-10">
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <button className="px-4 py-2 bg-white text-blue-500 rounded-md font-medium mr-2 h-10" onClick={() => navigate('/new')}>Add</button>
    </div>
  </div>
</nav>


      <div style={{ marginTop: '70px' }}>
        <Routes>
          <Route
            path="/"
            element={<NoteList notes={filteredNotes} clearNote={handleClearNote} />}
          />
          <Route
            path="/new"
            element={
              <NewNote
                handleAddNote={handleAddNote}
                noteToEdit={noteToEdit}
                noteIndex={noteIndex !== null ? parseInt(noteIndex) : -1}
                notes={notes}
                setNotes={setNotes}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;