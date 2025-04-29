import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, LogOut, Plus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <BookOpen className="h-6 w-6" />
            <span>Bibliothèque</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <Link 
                  to="/books/add" 
                  className="flex items-center space-x-1 px-3 py-1 bg-blue-700 rounded-md hover:bg-blue-800 transition duration-200"
                >
                  <Plus className="h-4 w-4" />
                  <span>Ajouter Livre</span>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-white hover:text-blue-200 transition duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Se déconnecter</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;