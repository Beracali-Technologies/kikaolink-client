import React from 'react';
import SuccessPage from '@/components/ui/SuccessPage/SuccessPage';

interface EventSuccessPageProps {
    eventId: string | number;
    eventTitle?: string;
    redirectDelay?: number;
}

const EventSuccessPage: React.FC<EventSuccessPageProps> = ({
    eventId,
    eventTitle = 'Your Event',
    redirectDelay = 9000
}) => {
    // Custom event icon in navy blue and red theme
    const eventIcon = (
        <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-900 via-blue-800 to-red-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white animate-pulse">
                <svg
                    className="w-20 h-20 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z" />
                </svg>
            </div>
            {/* Floating celebration elements */}
            <div className="absolute -top-2 -right-2 text-2xl animate-bounce">🎯</div>
            <div className="absolute -bottom-2 -left-2 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>⭐</div>
        </div>
    );

    return (
        <SuccessPage
            title="Event Created Successfully!"
            message={`"${eventTitle}" has been created successfully. You're being redirected to set up your event details and start managing registrations.`}
            redirectUrl={`/dashboard/events/${eventId}/info`}
            redirectDelay={redirectDelay}
            icon={eventIcon}
            showConfetti={true}
        />
    );
};

export default EventSuccessPage;
