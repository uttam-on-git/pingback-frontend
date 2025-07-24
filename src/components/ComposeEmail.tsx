import { useState } from 'react';
import toast from 'react-hot-toast';

const SparklesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    className="lucide lucide-wand-sparkles-icon lucide-wand-sparkles"
  >
    <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72" />
    <path d="m14 7 3 3" />
    <path d="M5 6v4" />
    <path d="M19 14v4" />
    <path d="M10 2v2" />
    <path d="M7 8H3" />
    <path d="M21 16h-4" />
    <path d="M11 3H9" />
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
        const errorData = await response.json();
        if (errorData.issues && Array.isArray(errorData.issues)) {
          const errorMessages = errorData.issues.map(
            (issue: { message: string }) => issue.message,
          );
          throw new Error(errorMessages.join(', '));
        }
        throw new Error(errorData.message || 'An unknown error occurred.');
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
    <div className="w-full max-w-2xl rounded-lg bg-neutral-950 p-7 shadow-lg">
      <h2 className="mb-6 text-2xl flex justify-center font-bold text-neutral-100">
        Compose Email
      </h2>
      <form className="flex flex-col gap-6">
        <input
          type="email"
          placeholder="Recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="rounded-lg bg-neutral-950 border border-neutral-300 p-3 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-neutral-300"
          required
        />
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="flex-grow rounded-lg border border-neutral-300 bg-neutral-950 p-3 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-neutral-300"
            required
          />
          <button
            type="button"
            onClick={handleGenerateSubjects}
            disabled={isGenerating}
            className="flex flex-shrink-0 items-center  gap-3 rounded-lg cursor-pointer bg-emerald-600 px-4 py-3 font-semibold text-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-400/40 disabled:bg-zinc-600"
          >
            <SparklesIcon />
            <span className="hidden sm:inline">
              {isGenerating ? '...' : 'Generate'}
            </span>
          </button>
        </div>
        {suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 rounded-lg bg-zinc-900 p-3">
            {suggestions.map((s, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSubject(s)}
                className="rounded-lg bg-neutral-950 px-3 py-1 text-sm text-zinc-200 transition hover:bg-zinc-600"
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
          className="min-h-48 rounded-lg bg-neutral-950 border border-neutral-300 p-3 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-neutral-300"
          required
        />
        <div className="flex justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="rounded-lg cursor-pointer bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-zinc-600"
          >
            Send Tracked Email
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComposeEmail;
