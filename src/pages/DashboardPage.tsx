import { useState } from 'react';
import ComposeEmail from '../components/ComposeEmail';
import NavBar from '../components/NavBar';
import SentEmailList from '../components/SentEmailsList';
import { useEmails } from '../hooks/useEmails';

const DashboardPage = () => {
  const { emails, isLoading, error, refetch } = useEmails();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <>
      <NavBar />
      <div className="flex min-h-screen flex-col items-center justify-center p-4 pt-24">
        <div className="flex w-full max-w-6xl flex-col items-center gap-12">
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p>Welcome to your PingBack dashboard!</p>
          </div>
          <ComposeEmail onEmailSent={handleRefresh} />
          <SentEmailList
            emails={emails}
            isLoading={isLoading}
            error={error}
            onRefresh={handleRefresh}
            isRefreshing={isRefreshing}
          />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
