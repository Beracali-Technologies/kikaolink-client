import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Confetti from '../../../../components/ui/Confetti/Confetti';
import BouncingTick from '@/components/ui/BouncingTick';
import QrCodeDisplay from '../../components/QrCode/QrCodeDisplay';

const RegistrationSuccessPage: React.FC = () => {
  const { eventSlug } = useParams<{ eventSlug: string }>();
  const location = useLocation();

  // Expect attendee object directly
  const state = location.state as { attendee: any };
  const attendee = state?.attendee;



  if (!attendee) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">No registration data found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center relative overflow-hidden">
      <Confetti />

      <div className="max-w-md mx-auto p-6 text-center relative z-10">
        <BouncingTick
          size="xl"
          color="text-green-500"
          glowColor="text-green-400"
          glowSize="lg"
          className="mb-6"
        />

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Registration Successful!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you {attendee.first_name} {attendee.last_name} for registering for the event. You will receive a confirmation email shortly.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {attendee.qr_code_url && (
            <QrCodeDisplay
              qrCodeUrl={attendee.qr_code_url}
              registrationCode={attendee.attendee_uuid}
            />
          )}

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">
                Registration Details
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Name:</span> {attendee.first_name} {attendee.last_name}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {attendee.email}
                </p>
                <p>
                  <span className="font-medium">Status:</span> <span className="text-green-600 font-medium">{attendee.status}</span>
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-900 mb-2">
                What's Next?
              </h3>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Check your email for confirmation</li>
                <li>Save or print your QR code</li>
                <li>Present QR code at event entrance</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Link
            to={`/events/${eventSlug}`}
            className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 transform hover:scale-105"
          >
            Back to Event
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccessPage;
