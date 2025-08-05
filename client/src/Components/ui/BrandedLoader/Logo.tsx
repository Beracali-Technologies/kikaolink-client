import React from 'react';

const Logo: React.FC = () => {
    return (
        // The main container for the entire logo 
        <div className="flex flex-col items-center">

            {/* "Beracali" - This is now structured to handle the special 'i' */}
            <div className="text-6xl font-black text-dark-text tracking-tighter">
                <span>Beracal</span>
                <span className="relative inline-block">
                    {/* We render the 'i' without its dot by coloring it transparently */}
                    <span className="text-transparent">i</span>
                    {/* The stem of the 'i' is recreated here, so we only see the dotless part */}
                    <span className="absolute left-0 bottom-0">ı</span>

                    {/* --- THE RED DOT --- */}
                    {/* Positioned absolutely, relative to the 'i' span, ensuring perfect alignment */}
                    <div
                        className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full"
                        style={{ top: '0.125em' }}
                    ></div>
                </span>
            </div>

            {/* "Technologies" - smaller, red, pulled up */}
            <div className="-mt-3 text-2xl font-bold text-red-500 tracking-normal">
                Technologies
            </div>

        </div>
    );
};

export default Logo;
