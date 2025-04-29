import { Link } from 'react-router-dom';
import { Book, Edit, Trash2 } from 'lucide-react';
import { Book as BookType } from '../types';

interface BookCardProps {
  book: BookType;
  onDelete: (id: string) => void;
}

const BookCard = ({ book, onDelete }: BookCardProps) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="h-48 overflow-hidden">
        <img 
          src={book.coverImage || 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
          alt={book.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 text-gray-800">{truncateText(book.title, 25)}</h3>
        <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
        <p className="text-xs text-gray-500 mb-3">{book.category}</p>
        <p className="text-sm text-gray-700 mb-4">{truncateText(book.description, 120)}</p>
        
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <Link to={`/books/${book.id}`} className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
            <Book className="h-4 w-4 mr-1" />
            Details
          </Link>
          
          <div className="flex space-x-2">
            <Link to={`/books/${book.id}/edit`} className="text-gray-600 hover:text-blue-600">
              <Edit className="h-4 w-4" />
            </Link>
            
            <button 
              onClick={() => onDelete(book.id)}
              className="text-gray-600 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;