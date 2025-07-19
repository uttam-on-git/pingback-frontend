import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem('auth-token');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 flex w-full items-center justify-between bg-zinc-800 p-4 shadow-lg">
      <h1 className="text-xl font-bold text-white">PingBack</h1>
      <button
        onClick={handleClick}
        className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
      >
        Logout
      </button>
    </nav>
  );
};

export default NavBar;
