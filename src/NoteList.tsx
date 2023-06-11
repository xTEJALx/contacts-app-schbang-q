import React from 'react';
import { Link } from 'react-router-dom';
import { ContactData } from './NewNote';

interface NoteListProps {
  notes: ContactData[];
  clearNote: (index: number) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, clearNote }) => {
  const handleClearNote = (index: number) => {
    clearNote(index);
  };

  return (
    <div className='font-josefin font-semibold'>
      {notes.length === 0 ? (
        <div className='flex justify-center text-2xl'>
            <p >Add contacts to view</p>
        </div>
            
        
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {notes.map((note, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-md shadow-md"
              style={{ color: note.radioOption === 'option2' ? 'red' : 'green' }}
            >
              <h2 className="text-lg font-bold underline">{note.firstName}</h2>
              <p ><span className='font-medium'>Mobile Number: </span>{note.mobileNumber}</p>
              <p ><span className='font-medium'>Email: </span>{note.email}</p>
              <p ><span className='font-medium'>City: </span>{note.city}</p>
              <p ><span className='font-medium'>Country: </span>{note.country}</p>
              <div className="flex space-x-2 mt-2">
                
              <Link
                  to={`/new?noteIndex=${index}`}
                  className="px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleClearNote(index)}
                  className="px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
                >
                  Delete
                </button>
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteList;