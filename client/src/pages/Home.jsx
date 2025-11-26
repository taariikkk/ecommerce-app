import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Dobrodošli u E-Shop!</h1>

        {isAuthenticated ? (
          <div>
            <p className="text-xl mb-4">
              Ćao, <strong>{user.firstName} {user.lastName}</strong>!
              {isAdmin && <span className="text-red-600"> (Admin)</span>}
            </p>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded"
            >
              Odjavi se
            </button>
          </div>
        ) : (
          <div>
            <p>Niste prijavljeni.</p>
            <Link to="/login" className="text-blue-600 underline mr-4">Prijavi se</Link>
            <Link to="/register" className="text-blue-600 underline">Registruj se</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;