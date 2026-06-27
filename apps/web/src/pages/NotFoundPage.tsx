import { Link, useLocation } from 'react-router-dom';

export default function NotFoundPage() {
  const location = useLocation();
  const missingPath = location.pathname.replace(/^\//, '');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-900 tracking-tighter">404</h1>
      <p className="mt-4 text-lg text-gray-500">
        Page not found: <span className="text-cyan-600">/{missingPath}</span>
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-cyan-500 px-8 py-3 font-bold text-white transition-colors hover:bg-cyan-600"
      >
        Back to Home
      </Link>
    </div>
  );
}
