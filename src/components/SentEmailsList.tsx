import { Link } from 'react-router-dom';
import type { TrackedEmail } from '../types';

interface SentEmailsListProps {
  emails: TrackedEmail[];
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
  isRefreshing: boolean;
}

const RefreshIcon = ({ isRefreshing }: { isRefreshing: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`}
  >
    <path
      fillRule="evenodd"
      d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-4.518a.75.75 0 00-.75.75v4.518l1.903-1.903a5.997 5.997 0 00-9.992 2.635a.75.75 0 01-1.49-.175a7.5 7.5 0 01.992-5.498zM19.245 13.941a7.5 7.5 0 01-12.548 3.364l-1.903-1.903h4.518a.75.75 0 00.75-.75v-4.518l-1.903 1.903a5.997 5.997 0 009.992-2.635a.75.75 0 011.49.175a7.5 7.5 0 01-.992 5.498z"
      clipRule="evenodd"
    />
  </svg>
);

const SentEmailList = ({
  emails,
  isLoading,
  error,
  onRefresh,
  isRefreshing,
}: SentEmailsListProps) => {
  if (isLoading) {
    return <p className="text-zinc-400">Loading sent emails...</p>;
  }

  if (error) {
    return <p className="text-red-400">Error: {error}</p>;
  }

  return (
    <div className="w-full max-w-4xl rounded-lg bg-neutral-950 p-8 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Sent Emails</h2>
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center cursor-pointer gap-2 rounded-lg bg-zinc-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshIcon isRefreshing={isRefreshing} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
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
                <Link
                  to={`/email/${email.id}`}
                  key={email.id}
                  className="contents"
                >
                  <tr className="border-b border-zinc-700 transition hover:bg-zinc-700">
                    <td className="px-6 py-4">{email.recipient}</td>
                    <td className="px-6 py-4 font-medium">{email.subject}</td>
                    <td className="px-6 py-4">
                      {new Date(email.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center text-lg font-bold">
                      {email._count.opens}
                    </td>
                  </tr>
                </Link>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SentEmailList;
