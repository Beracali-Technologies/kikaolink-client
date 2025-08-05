import React from 'react';

const Logo: React.FC = () => {
    return (
        // A container to hold the logo and apply relative positioning for the red dot.
        // `inline-block` ensures the container only takes up the width of its content.
        <div className="relative inline-block">

            {/* --- The Red Dot --- */}
            {/* Absolutely positioned relative to the parent container. */}
            {/* The top/right values are fine-tuned to place the dot perfectly over the 'i'. */}
            {/* You may need to slightly adjust these if you change the font family. */}
            <div className="absolute -top-1.5 right-[2.1rem] w-4 h-4 bg-red-500 rounded-full"></div>

            {/* --- "Beracali" (Large, Black, Bold) --- */}
            <div className="text-6xl font-black text-dark-text tracking-tighter">
                Beracali
            </div>

            {/* --- "Technologies" (Small, Red, Pulled Up) --- */}
            {/* The negative margin-top pulls this text up for a tight, professional lockup. */}
            <div className="-mt-3 text-2xl font-bold text-red-500 tracking-normal">
                Technologies
            </div>

        </div>
    );
};

export default Logo;
