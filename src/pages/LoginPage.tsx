const GoogleIcon = () => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25C22.56 11.42 22.49 10.62 22.35 9.84H12V14.48H18.18C17.92 15.77 17.24 16.9 16.18 17.62V20.25H19.92C21.62 18.67 22.56 16.2 22.56 12.25Z"
      fill="#4285F4"
    />
    <path
      d="M12 23C15.24 23 17.95 21.92 19.92 20.25L16.18 17.62C15.11 18.33 13.69 18.75 12 18.75C9.13 18.75 6.69 16.88 5.84 14.38H1.98V17.04C3.78 20.53 7.59 23 12 23Z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.38C5.62 13.76 5.5 13.13 5.5 12.5C5.5 11.87 5.62 11.24 5.84 10.62V7.96H1.98C1.22 9.38 0.75 10.89 0.75 12.5C0.75 14.11 1.22 15.62 1.98 17.04L5.84 14.38Z"
      fill="#FBBC05"
    />
    <path
      d="M12 6.25C13.83 6.25 15.35 6.92 16.53 7.99L20.02 4.5C17.95 2.63 15.24 1.5 12 1.5C7.59 1.5 3.78 3.97 1.98 7.96L5.84 10.62C6.69 8.12 9.13 6.25 12 6.25Z"
      fill="#EA4335"
    />
  </svg>
);

const LoginPage = () => {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_API_URL}/api/auth/google`;
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="relative flex w-full max-w-4xl flex-col items-center justify-center rounded-lg bg-zinc-800/80 p-8 text-center shadow-2xl backdrop-blur-sm md:flex-row md:text-left">
        <div className="flex-1 pr-0 md:pr-12">
          <h1 className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text pb-2 text-5xl font-extrabold text-transparent">
            PingBack
          </h1>
          <p className="mt-4 text-lg text-zinc-300">
            The simplest way to know if your emails are being read. Send with
            confidence, get insights instantly.
          </p>
          <ul className="mt-6 list-inside list-disc space-y-2 text-zinc-400">
            <li>Real-time open notifications</li>
            <li>Simple, clean dashboard</li>
            <li>Secure and private</li>
          </ul>
        </div>

        <div className="mt-10 w-full flex-shrink-0 border-t border-zinc-700 pt-10 md:mt-0 md:w-auto md:border-t-0 md:border-l md:pt-0 md:pl-12">
          <p className="font-semibold text-white">Get Started Now</p>
          <p className="mb-4 text-sm text-zinc-400">It's free, forever.</p>
          <button
            onClick={handleLogin}
            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-white px-6 py-3 font-semibold text-zinc-800 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-400/40"
          >
            <GoogleIcon />
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
