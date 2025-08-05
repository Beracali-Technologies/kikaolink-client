import React from 'react';
import qrCode from '../../../../../assets/images/qrCode.jpg';


const UserIcon = () => <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const ArrowIcon = () => <svg className="w-12 h-12 text-slate-300 transform -rotate-90 md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>;
const CheckIcon = () => <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>;

const QrFeatureVisual: React.FC = () => {
    return (
        // Added perspective for a subtle 3D hover effect
        <div style={{ perspective: '1000px' }}>
            <div className="bg-gradient-to-br from-slate-50 to-slate-200 rounded-2xl p-6 lg:p-8 transform transition-transform duration-500 hover:[transform:rotateX(5deg)_rotateY(-5deg)]">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center text-center">

                    {/* 1. Attendee Card */}
                    <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-4 flex flex-col items-center">
                        <UserIcon />
                        <p className="font-bold text-lg mt-2 text-dark-text">Jane Doe</p>
                        <p className="text-sm text-slate-500">Attendee</p>
                    </div>

                    {/* 2. Arrow */}
                    <div className="flex justify-center items-center"><ArrowIcon /></div>

                    {/* 3. QR Code with Animated "Scan Successful" Overlay */}
                    <div className="md:col-span-2 relative group flex justify-center items-center w-40 h-40 mx-auto bg-white rounded-xl shadow-lg p-2">
                        {/* A simple div-based QR code for style
                         <div className="grid grid-cols-3 gap-1 w-full h-full">
                            <div className="bg-black"></div><div className="bg-black"></div><div className="bg-black"></div>
                            <div className="bg-black"></div><div></div><div className="bg-black"></div>
                            <div className="bg-black"></div><div className="bg-black"></div><div className="bg-black"></div>
                         </div> */}

                         <img src={qrCode} />
                         {/* Scan Successful Overlay */}
                        <div className="absolute inset-0 bg-green-500 rounded-xl flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-90">
                            <CheckIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QrFeatureVisual;
