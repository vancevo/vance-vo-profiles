import { useQuery } from '@tanstack/react-query';

export default function App() {
  const { data, isLoading } = useQuery({
    queryKey: ['health'],
    queryFn: () => fetch('http://localhost:5000/api/health').then(res => res.json())
  });

  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-white p-8 font-sans">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-[var(--color-primary)]">Admin Dashboard</h1>
        <p className="text-gray-400 mt-2">Manage your precision portfolio data.</p>
      </header>

      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[var(--color-surface-container)] p-6 rounded-xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-white">API Status</h2>
            {isLoading ? (
              <div className="animate-pulse bg-gray-700 h-6 w-24 rounded"></div>
            ) : (
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${data?.success ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-gray-300">{data?.success ? 'Connected' : 'Disconnected'}</span>
              </div>
            )}
          </div>
          
          <div className="bg-[var(--color-surface-container)] p-6 rounded-xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-white">Projects</h2>
            <p className="text-gray-400">Total: 4 active projects</p>
            <button className="mt-4 bg-[var(--color-primary)] text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">Manage</button>
          </div>

          <div className="bg-[var(--color-surface-container)] p-6 rounded-xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-white">Experience</h2>
            <p className="text-gray-400">Total: 3 roles</p>
            <button className="mt-4 bg-[var(--color-primary)] text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">Manage</button>
          </div>
        </div>
      </main>
    </div>
  );
}
