import React from 'react';


const UserIcon = () => <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const QrCodeIcon = () => <svg className="w-24 h-24 text-dark-text" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6.5 6.5l-1-1M6 12H4m11.5-6.5l-1-1M12 4a8 8 0 100 16 8 8 0 000-16z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11h.01M12 11h.01M9 11h.01M12 8h.01" /></svg>;
const ArrowIcon = () => <svg className="w-12 h-12 text-slate-300 transform -rotate-90 md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>;

const QrFeatureVisual: React.FC = () => {
    return (
        <div className="bg-slate-100 rounded-2xl p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center">

                {/* 1. Attendee Card */}
                <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center animate-fade-in-up">
                    <UserIcon />
                    <p className="font-bold mt-2">Jane Doe</p>
                    <p className="text-sm text-slate-500">Attendee</p>
                </div>

                {/* 2. Arrow (points down on mobile, right on desktop) */}
                <div className="flex justify-center items-center">
                    <ArrowIcon />
                </div>

                {/* 3. QR Code + Phone */}
                <div className="relative">
                     <QrCodeIcon />
                     {/* The "Phone" scanning it */}
                    <div className="absolute -bottom-4 -right-4 w-16 h-28 bg-white/50 backdrop-blur-sm border-4 border-slate-200 rounded-2xl flex justify-center pt-3">
                         <div className="w-4 h-4 bg-slate-300 rounded-full border-2 border-slate-400"></div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default QrFeatureVisual;
