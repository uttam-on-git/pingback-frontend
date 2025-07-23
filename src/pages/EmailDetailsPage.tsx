import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { TrackedEmailWithDetails } from '../types';
import Navbar from '../components/NavBar';

const EmailDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [email, setEmail] = useState<TrackedEmailWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmailDetails = async () => {
      const token = localStorage.getItem('auth-token');
      if (!token || !id) {
        setError('Authentication error or missing email ID.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/api/email/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Failed to fetch email details.');
        }

        const data: TrackedEmailWithDetails = await response.json();
        setEmail(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmailDetails();
  }, [id]);

  if (isLoading) {
    return <p className="text-white">Loading details...</p>;
  }

  if (error) {
    return <p className="text-red-400">Error: {error}</p>;
  }

  if (!email) {
    return <p className="text-white">Email not found.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="flex w-full max-w-4xl flex-col gap-8 p-4 pt-24">
        <div className="rounded-lg bg-zinc-800 p-6 shadow-lg">
          <Link
            to="/dashboard"
            className="mb-4 inline-block text-blue-400 hover:underline"
          >
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white">{email.subject}</h1>
          <p className="text-zinc-400">To: {email.recipient}</p>
          <p className="text-sm text-zinc-500">
            Sent on: {new Date(email.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="rounded-lg bg-zinc-800 p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-white">
            Open Events ({email.opens.length})
          </h2>
          <ul className="space-y-4">
            {email.opens.length > 0 ? (
              email.opens.map((open) => (
                <li key={open.id} className="rounded-md bg-zinc-700 p-4">
                  <p className="font-semibold text-white">
                    Opened on: {new Date(open.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-zinc-400">
                    IP Address: {open.ipAddress || 'Not available'}
                  </p>
                </li>
              ))
            ) : (
              <p className="text-zinc-500">
                This email has not been opened yet.
              </p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default EmailDetailsPage;
