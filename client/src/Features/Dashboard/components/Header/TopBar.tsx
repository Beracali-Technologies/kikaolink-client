import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/ui/Logo/Logo';
import AccountMenu from '@/components/ui/AccountMenu/AccountMenu';

const TopBar: React.FC = () => {
    const navigate = useNavigate();

    const handleMyEvents = () => {
        navigate('/dashboard/events');
    };

    return (
        <header className="w-full bg-[#0E2344] border-b border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                {/* Left: KikaoLink Logo */}
                <Logo size="lg" showIcon={false} />

                {/* Right: Navigation Items */}
                <div className="flex items-center space-x-6">
                    {/* My Events Button */}
                    <button
                        onClick={handleMyEvents}
                        className="text-white hover:text-gray-200 font-medium text-sm transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/10"
                    >
                        My Events
                    </button>

                    {/* Account Menu Component */}
                    <AccountMenu />
                </div>
            </div>
        </header>
    );
};

export default TopBar;
