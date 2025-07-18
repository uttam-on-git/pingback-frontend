import { useState, useEffect } from 'react';
import type { TrackedEmail } from '../types';

const SentEmailList = () => {
  const [emails, setEmails] = useState<TrackedEmail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmails = async () => {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        setError('You are not authenticated.');
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/api/email', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch emails.');
        }

        const data: TrackedEmail[] = await response.json();
        setEmails(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmails();
  }, []);

  if (isLoading) {
    return <p className="text-zinc-400">Loading sent emails...</p>;
  }

  if (error) {
    return <p className="text-red-400">Error: {error}</p>;
  }

  return (
    <div className="w-full max-w-4xl rounded-lg bg-zinc-800 p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-white">Sent Emails</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-zinc-300">
          <thead className="border-b border-zinc-600 text-xs uppercase text-zinc-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Recipient
              </th>
              <th scope="col" className="px-6 py-3">
                Subject
              </th>
              <th scope="col" className="px-6 py-3">
                Sent
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Opens
              </th>
            </tr>
          </thead>
          <tbody>
            {emails.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-zinc-500">
                  You haven't sent any emails yet.
                </td>
              </tr>
            ) : (
              emails.map((email) => (
                <tr key={email.id} className="border-b border-zinc-700">
                  <td className="px-6 py-4">{email.recipient}</td>
                  <td className="px-6 py-4">{email.subject}</td>
                  <td className="px-6 py-4">
                    {new Date(email.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center text-lg font-bold">
                    {email._count.opens}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SentEmailList;
