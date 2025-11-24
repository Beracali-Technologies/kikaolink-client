import { Link } from 'react-router-dom';

export default function LegalFooter() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-24 py-12">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-600">
        <p>
          © {new Date().getFullYear()} <span className="font-semibold text-gray-800">Beracali Technologies</span>. 
          All rights reserved. • Dar es Salaam, Tanzania
        </p>
        <div className="mt-6 space-x-8">
          <Link to="/privacy-policy" className="hover:text-gray-900">Privacy Policy</Link>
          <span className="text-gray-400">•</span>
          <Link to="/terms-of-service" className="hover:text-gray-900">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}