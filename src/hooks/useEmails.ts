import { useState, useEffect, useCallback } from 'react';
import type { TrackedEmail } from '../types';

export const useEmails = () => {
  const [emails, setEmails] = useState<TrackedEmail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmails = useCallback(async () => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      setError('You are not authenticated.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/email`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch emails.');
      }

      const data: TrackedEmail[] = await response.json();
      setEmails(data);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  return { emails, isLoading, error, refetch: fetchEmails };
};
