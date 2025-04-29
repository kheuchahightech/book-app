import api from './api';
import { Book, BookFormData } from '../types';

// === Mode Mock === //
const USE_MOCK = true;
const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A novel about the decadence and excess of the Jazz Age, as told through the story of Jay Gatsby and his pursuit of the American Dream.',
    category: 'Fiction',
    coverImage: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    userId: '1'
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'A novel about racial injustice and the loss of innocence, set in the American South during the Great Depression.',
    category: 'Fiction',
    coverImage: 'https://images.pexels.com/photos/3747279/pexels-photo-3747279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    createdAt: '2023-01-02T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z',
    userId: '1'
  },
  {
    id: '3',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    description: 'A fantasy novel about the adventures of hobbit Bilbo Baggins, who is convinced by the wizard Gandalf to accompany thirteen dwarves on a quest to reclaim their mountain home from the dragon Smaug.',
    category: 'Fantasy',
    coverImage: 'https://images.pexels.com/photos/3646105/pexels-photo-3646105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    createdAt: '2023-01-03T00:00:00.000Z',
    updatedAt: '2023-01-03T00:00:00.000Z',
    userId: '1'
  },
  {
    id: '4',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    description: 'A book that explores the history and impact of Homo sapiens from the Stone Age to the twenty-first century.',
    category: 'Non-Fiction',
    coverImage: 'https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    createdAt: '2023-01-04T00:00:00.000Z',
    updatedAt: '2023-01-04T00:00:00.000Z',
    userId: '1'
  }
];
let books = [...mockBooks];

// === Service Methods === //
export const bookService = {
  getBooks: async (): Promise<Book[]> => {
    if (USE_MOCK) {
      await delay(500);
      return books;
    } else {
      const response = await api.get<Book[]>('/books');
      return response.data;
    }
  },

  getBookById: async (id: string): Promise<Book> => {
    if (USE_MOCK) {
      await delay(300);
      const book = books.find((b) => b.id === id);
      if (!book) throw new Error('Book not found');
      return book;
    } else {
      const response = await api.get<Book>(`/books/${id}`);
      return response.data;
    }
  },

  createBook: async (bookData: BookFormData): Promise<Book> => {
    if (USE_MOCK) {
      await delay(500);
      const newBook: Book = {
        id: String(books.length + 1),
        ...bookData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: '1',
      };
      books.push(newBook);
      return newBook;
    } else {
      const response = await api.post<Book>('/books', bookData);
      return response.data;
    }
  },

  updateBook: async (id: string, bookData: BookFormData): Promise<Book> => {
    if (USE_MOCK) {
      await delay(500);
      const index = books.findIndex((b) => b.id === id);
      if (index === -1) throw new Error('Book not found');
      const updatedBook: Book = {
        ...books[index],
        ...bookData,
        updatedAt: new Date().toISOString(),
      };
      books[index] = updatedBook;
      return updatedBook;
    } else {
      const response = await api.put<Book>(`/books/${id}`, bookData);
      return response.data;
    }
  },

  deleteBook: async (id: string): Promise<void> => {
    if (USE_MOCK) {
      await delay(500);
      books = books.filter((b) => b.id !== id);
    } else {
      await api.delete(`/books/${id}`);
    }
  },
};

// === Helper === //
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}