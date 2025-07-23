import { useAuth } from '../hooks/useAuth';

const Logo = () => (
  <div className="flex items-center gap-2">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="2" fill="url(#logo-gradient)" />
      <path
        d="M12 2C6.477 2 2 6.477 2 12"
        stroke="url(#logo-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M22 12c0 5.523-4.477 10-10 10"
        stroke="url(#logo-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="logo-gradient"
          x1="2"
          y1="12"
          x2="22"
          y2="12"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#60A5FA" />
          <stop offset="1" stopColor="#34D399" />
        </linearGradient>
      </defs>
    </svg>
    <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-xl font-bold text-transparent">
      PingBack
    </span>
  </div>
);

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 flex w-full items-center justify-between border-b border-zinc-700 bg-zinc-900/50 p-4 shadow-lg backdrop-blur-md">
      <Logo />
      <div className="flex items-center gap-4">
        {user && (
          <span className="hidden text-sm text-zinc-400 sm:block">
            {user.email}
          </span>
        )}
        <button
          onClick={logout}
          className="rounded-lg cursor-pointer bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
