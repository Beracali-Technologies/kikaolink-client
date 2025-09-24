import React from 'react';

interface FeatureProps {
    title: React.ReactNode;
    description: string;
    visualContent: React.ReactNode;
    points?: string[];
    imageOnLeft?: boolean;
}

const AlternatingFeature: React.FC<FeatureProps> = ({ title, description, visualContent, points, imageOnLeft = false }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            {/* --- Visual Content Column --- */}
            <div className={`transition-transform duration-500 ease-in-out hover:scale-105 ${imageOnLeft ? 'md:order-first' : 'md:order-last'}`}>
                {visualContent}
            </div>

            {/* --- Text Content Column --- */}
            <div className="text-center md:text-left">
                <h3 className="text-4xl lg:text-5xl font-bold text-dark-text tracking-tight">{title}</h3>
                <p className="mt-6 text-xl text-light-text">{description}</p>
                {points && (
                    <ul className="mt-8 space-y-4">
                        {points.map((point, index) => (
                            <li key={index} className="flex items-start text-left">
                                <svg className="w-6 h-6 text-green-500 mr-4 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                <span className="text-lg text-light-text">{point}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AlternatingFeature;
