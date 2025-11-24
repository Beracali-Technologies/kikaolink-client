import { Link } from 'react-router-dom';

export default function LegalHeader() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="text-2xl font-black text-red-600">BERACALI</div>
          <div className="text-sm text-blue-600 font-medium">Technologies</div>
        </Link>
        <nav className="hidden md:flex space-x-10 text-sm font-medium">
          <Link to="/privacy-policy" className="text-gray-600 hover:text-gray-900">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="text-gray-600 hover:text-gray-900">
            Terms of Service
          </Link>
        </nav>
      </div>
    </header>
  );
}