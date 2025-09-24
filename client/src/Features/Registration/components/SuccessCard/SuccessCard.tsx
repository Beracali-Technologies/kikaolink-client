import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const RegistrationSuccess: React.FC = () => {
  const { eventSlug } = useParams<{ eventSlug: string }>();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto p-6 text-center">
        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for registering for the event. You will receive a confirmation email shortly.
        </p>
        <div className="space-y-3">
          <Link
            to={`/event/${eventSlug}`}
            className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Back to Event
          </Link>
          <Link
            to="/"
            className="block w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
