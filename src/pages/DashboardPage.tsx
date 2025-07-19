import ComposeEmail from '../components/ComposeEmail';
import NavBar from '../components/NavBar';
import SentEmailList from '../components/SentEmailsList';

const DashboardPage = () => {
  return (
    <>
      <NavBar />
      <div className="flex w-full flex-col items-center gap-8 p-4">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p>Welcome to your PingBack dashboard!</p>
        </div>
        <ComposeEmail />
        <SentEmailList />
      </div>
    </>
  );
};

export default DashboardPage;
