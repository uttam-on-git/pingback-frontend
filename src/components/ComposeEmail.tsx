import { useState } from 'react';

const ComposeEmail = () => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('Sending...');

    const token = localStorage.getItem('auth-token');
    if (!token) {
      setStatusMessage('Authentication error. Please log in again.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ recipient, subject, body }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send email.');
      }
      setStatusMessage('Email sent successfully!');
      // clear the form
      setRecipient('');
      setSubject('');
      setBody('');
    } catch (error) {
      if (error instanceof Error) {
        setStatusMessage(error.message);
      } else {
        setStatusMessage('An unknown error occurred.');
      }
    }
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
      {statusMessage && (
        <p className="mt-4 text-center text-zinc-400">{statusMessage}</p>
      )}
    </div>
  );
};

export default ComposeEmail;
