import { useState } from 'react';
import toast from 'react-hot-toast';

interface ComposeEmailProps {
  onEmailSent: () => void;
}

const ComposeEmail = ({ onEmailSent }: ComposeEmailProps) => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

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
        onEmailSent();
        return 'Email sent successfully!';
      },
      error: (err) => `Error: ${err.message}`,
    });
  };

  return (
    <div className="w-full max-w-2xl rounded-lg bg-zinc-800 p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-white">Compose Email</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="rounded-md bg-zinc-700 p-2 text-white"
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="rounded-md bg-zinc-700 p-2 text-white"
          required
        />
        <textarea
          placeholder="Write your email here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="min-h-48 rounded-md bg-zinc-700 p-2 text-white"
          required
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ComposeEmail;
