import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { bookService } from '../services/bookService';
import { BookFormData } from '../types';
import BookForm from '../components/BookForm';
import Alert from '../components/Alert';
import { ArrowLeft } from 'lucide-react';

const AddBookPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (data: BookFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await bookService.createBook(data);
      navigate('/');
    } catch (err) {
      setError('Failed to create book. Please try again.');
      console.error('Error creating book:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to books
        </Link>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Add New Book</h1>
        
        {error && (
          <Alert type="error">{error}</Alert>
        )}
        
        <BookForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          buttonText="Add Book"
        />
      </div>
    </div>
  );
};

export default AddBookPage;