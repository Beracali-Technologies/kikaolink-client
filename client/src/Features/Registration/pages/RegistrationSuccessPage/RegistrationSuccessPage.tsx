import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Confetti from '../../../../components/ui/Confetti/Confetti';
import { BouncingTick } from '@/components/ui/BouncingTick';
import QrCodeDisplay from '../../components/QrCode/QrCodeDisplay';

const RegistrationSuccessPage: React.FC = () => {
  const { eventSlug } = useParams<{ eventSlug: string }>();
  const location = useLocation();

  const state = location.state as { attendee: any };
  const attendee = state?.attendee;

  if (!attendee) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center border">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Registration Data Missing</h1>
          <p className="text-gray-600 mb-6">We couldn't find your registration details.</p>
          <Link
            to={`/events/${eventSlug}`}
            className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
          >
            Back to Event
          </Link>
        </div>
      </div>
    );
  }



  const qrPollUrl = `/api/qr-poll/${attendee.id}`;
  const attendeeId = attendee.id;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Confetti />

      <div className="max-w-4xl w-full mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
          {/* Header Section - Clean and simple */}
          <div className="bg-white p-8 text-center border-b">
            <div className="flex justify-center mb-4">
              <BouncingTick
                size="xl"
                color="text-green-500"
                glowColor="text-green-400"
                className="mb-2"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Registration Successful!
            </h1>
            <p className="text-gray-600 text-lg">
              You're officially registered for the event
            </p>
          </div>

          {/* Main Content */}
          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-start">

              {/* Left Column - Welcome and QR Code */}
              <div className="space-y-6">
                {/* Welcome Message */}
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                    Welcome aboard, {attendee.first_name}!
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Thank you for registering. Your spot has been confirmed and we're excited to have you join us.
                  </p>
                </div>

                {/* QR Code Section */}
                {attendee.qr_code_url && (
                  <div className="bg-gray-50 rounded-xl p-6 border">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Your Digital Pass
                      </h3>
                      <p className="text-gray-600 text-sm">
                        This QR code is your ticket to the event
                      </p>
                    </div>
                    <QrCodeDisplay
                      qrCodeUrl={attendee.qr_code_url}
                      registrationCode={attendee.attendee_uuid}
                      qrPollUrl={qrPollUrl}
                      attendeeId={attendeeId}
                    />
                  </div>
                )}
              </div>

              {/* Right Column - Instructions */}
              <div className="space-y-6">
                {/* Next Steps */}
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-start mb-4">
                      <div className="bg-blue-100 p-2 rounded-lg mr-4">
                        <span className="text-xl">📧</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-900 mb-1">
                          Check Your Email
                        </h3>
                        <p className="text-blue-800 text-sm">
                          We've sent a confirmation email to <strong>{attendee.email}</strong> with all the important details.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-lg mr-4">
                        <span className="text-xl">📱</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-900 mb-1">
                          On Event Day
                        </h3>
                        <p className="text-blue-800 text-sm">
                          Bring your QR code (digital or printed) for quick check-in.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Tips */}
                  <div className="bg-gray-50 rounded-xl p-4 border">
                    <h3 className="font-semibold text-gray-900 mb-3 text-center">
                      Quick Tips
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-1">
                          <span className="text-sm">💾</span>
                        </div>
                        <p className="text-xs text-gray-600">Save this page</p>
                      </div>
                      <div className="text-center p-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-1">
                          <span className="text-sm">📧</span>
                        </div>
                        <p className="text-xs text-gray-600">Check spam</p>
                      </div>
                      <div className="text-center p-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-1">
                          <span className="text-sm">⏰</span>
                        </div>
                        <p className="text-xs text-gray-600">Arrive early</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="text-center">
                  <Link
                    to={`/events/${eventSlug}`}
                    className="inline-flex items-center justify-center bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold w-full"
                  >
                    <span>Back to Event Page</span>
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>

                  <p className="text-gray-500 text-xs mt-3">
                    Need help? Contact support@kikaolink.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccessPage;
