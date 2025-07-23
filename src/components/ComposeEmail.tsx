import { useState } from 'react';
import toast from 'react-hot-toast';

const SparklesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-5 w-5"
  >
    <path
      fillRule="evenodd"
      d="M10.868 2.884c.321.64.321 1.415 0 2.055l-1.428 2.856c-.214.428-.65.708-1.12.708s-.906-.28-1.12-.708L5.772 4.939c-.321-.64-.321-1.415 0-2.055a1.5 1.5 0 012.24 0l2.122 2.122 2.122-2.122a1.5 1.5 0 012.24 0zM4.3 9.032l2.856-1.428a1.125 1.125 0 011.415 0l2.856 1.428a1.125 1.125 0 010 1.936l-2.856 1.428a1.125 1.125 0 01-1.415 0L4.3 10.968a1.125 1.125 0 010-1.936zM14.3 9.032l2.856-1.428a1.125 1.125 0 011.415 0l2.856 1.428a1.125 1.125 0 010 1.936l-2.856 1.428a1.125 1.125 0 01-1.415 0L14.3 10.968a1.125 1.125 0 010-1.936z"
      clipRule="evenodd"
    />
  </svg>
);

interface ComposeEmailProps {
  onEmailSent: () => void;
}

const ComposeEmail = ({ onEmailSent }: ComposeEmailProps) => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSubjects = async () => {
    if (!body) {
      toast.error('Please write the email body first.');
      return;
    }

    setIsGenerating(true);
    setSuggestions([]);
    const token = localStorage.getItem('auth-token');

    const generatePromise = fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/api/ai/generate-subject`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ emailBody: body }),
      },
    ).then(async (response) => {
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to generate subjects.');
      }
      return response.json();
    });

    toast.promise(generatePromise, {
      loading: 'Generating AI suggestions...',
      success: (data) => {
        setSuggestions(data.suggestions);
        setIsGenerating(false);
        return 'Suggestions are ready!';
      },
      error: (err) => {
        setIsGenerating(false);
        return `Error: ${err.message}`;
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('auth-token');
    if (!token) {
      toast.error('Authentication error. Please log in again.');
      return;
    }
    const sendPromise = fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/api/email/send`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ recipient, subject, body }),
      },
    ).then(async (response) => {
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to send email.');
      }
      return response.json();
    });

    toast.promise(sendPromise, {
      loading: 'Sending email...',
      success: () => {
        setRecipient('');
        setSubject('');
        setBody('');
        setSuggestions([]);
        onEmailSent();
        return 'Email sent successfully!';
      },
      error: (err) => `Error: ${err.message}`,
    });
  };

  return (
    <div className="w-full max-w-2xl rounded-lg bg-zinc-800 p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-white">Compose Email</h2>
      <form className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="rounded-md bg-zinc-700 p-3 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="flex-grow rounded-md bg-zinc-700 p-3 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="button"
            onClick={handleGenerateSubjects}
            disabled={isGenerating}
            className="flex flex-shrink-0 items-center gap-2 rounded-lg cursor-pointer bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-zinc-600"
          >
            <SparklesIcon />
            {isGenerating ? '...' : 'Generate'}
          </button>
        </div>
        {suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 rounded-md bg-zinc-900 p-3">
            {suggestions.map((s, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSubject(s)}
                className="rounded-full bg-zinc-700 px-3 py-1 text-sm text-zinc-200 transition hover:bg-zinc-600"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <textarea
          placeholder="Write your email here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="min-h-48 rounded-md bg-zinc-700 p-3 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="rounded-lg cursor-pointer bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-zinc-600"
        >
          Send Tracked Email
        </button>
      </form>
    </div>
  );
};

export default ComposeEmail;
