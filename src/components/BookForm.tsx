import { useForm } from 'react-hook-form';
import { BookFormData } from '../types';
import Button from './Button';

interface BookFormProps {
  initialData?: BookFormData;
  onSubmit: (data: BookFormData) => void;
  isLoading: boolean;
  buttonText: string;
}

const BookForm = ({ initialData, onSubmit, isLoading, buttonText }: BookFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<BookFormData>({
    defaultValues: initialData || {
      title: '',
      author: '',
      description: '',
      category: '',
      coverImage: ''
    }
  });
  
  // Categories for the select dropdown
  const categories = [
    'Fiction',
    'Non-Fiction',
    'Science Fiction',
    'Fantasy',
    'Mystery',
    'Thriller',
    'Romance',
    'Biography',
    'History',
    'Self-Help',
    'Business',
    'Technology',
    'Science',
    'Poetry',
    'Other'
  ];
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          id="title"
          type="text"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
          {...register('title', { required: 'Title is required' })}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
          Author *
        </label>
        <input
          id="author"
          type="text"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.author ? 'border-red-500' : 'border-gray-300'}`}
          {...register('author', { required: 'Author is required' })}
        />
        {errors.author && (
          <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category *
        </label>
        <select
          id="category"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
          {...register('category', { required: 'Category is required' })}
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description *
        </label>
        <textarea
          id="description"
          rows={4}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
          {...register('description', {
            required: 'Description is required',
            minLength: {
              value: 10,
              message: 'Description must be at least 10 characters'
            }
          })}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
          Cover Image URL (optional)
        </label>
        <input
          id="coverImage"
          type="text"
          placeholder="https://example.com/book-cover.jpg"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register('coverImage')}
        />
        <p className="mt-1 text-xs text-gray-500">Leave empty to use a default cover image</p>
      </div>
      
      <Button 
        type="submit" 
        variant="primary" 
        isLoading={isLoading} 
        className="mt-8"
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default BookForm;