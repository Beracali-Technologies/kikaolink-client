import React from 'react';

interface FeatureProps {
    title: React.ReactNode; // Can now accept JSX for rich titles
    description: string;
    visualContent: React.ReactNode; // The main change: accepts any component
    points?: string[];
    imageOnLeft?: boolean;
}

const AlternatingFeature: React.FC<FeatureProps> = ({ title, description, visualContent, points, imageOnLeft = false }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* --- Visual Content Column (Image or Custom Component) --- */}
            <div className={` ${imageOnLeft ? 'md:order-first' : 'md:order-last'}`}>
                {visualContent}
            </div>

            {/* --- Text Content Column --- */}
            <div className="text-center md:text-left">
                <h3 className="text-3xl lg:text-4xl font-bold text-dark-text">{title}</h3>
                <p className="mt-5 text-lg text-light-text">{description}</p>
                {points && (
                    <ul className="mt-6 space-y-3">
                        {points.map((point, index) => (
                            <li key={index} className="flex items-start text-left">
                                <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span className="text-light-text">{point}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AlternatingFeature;
