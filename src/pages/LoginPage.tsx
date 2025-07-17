const LoginPage = () => {
  const handleClick = () => {
    window.location.href = 'http://localhost:3000/api/auth/google';
  };
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg bg-zinc-800 p-10 shadow-xl">
      <h1 className="text-4xl font-bold text-white">PingBack</h1>
      <p className="text-zinc-400">Discover you opens your email.</p>
      <button
        onClick={handleClick}
        className="mt-4 rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-700"
      >
        Sign In with Google
      </button>
    </div>
  );
};

export default LoginPage;
