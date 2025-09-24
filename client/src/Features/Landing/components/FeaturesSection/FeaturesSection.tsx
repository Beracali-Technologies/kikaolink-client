import React from 'react';

import AlternatingFeature from './AlternatingFeature/AlternatingFeature';
import TabbedFeatures from './TabbedFeatures/TabbedFeatures';
import { alternatingFeaturesData, tabbedFeaturesData } from './types/featuresData';

const FeaturesSection: React.FC = () => {
    return (
        <section id="features" className="bg-white py-24 sm:py-32">
            <div className="container mx-auto px-6 space-y-24 md:space-y-40">

                    {/* --- Section Header --- */}
                    <div className="text-center max-w-4xl mx-auto">
                          <p className="font-semibold text-primary-blue uppercase tracking-widest">The All-In-One Platform</p>
                          <h2 className="text-4xl sm:text-6xl font-bold text-dark-text mt-4 tracking-tight">
                              Flawless Events Start Here.
                          </h2>
                          <p className="mt-6 text-xl text-light-text">
                              From the first click to the final handshake, KikaoLink provides the professional tools you need to create truly memorable events.
                          </p>
                    </div>


                    {/* --- Renders the Alternating Features --- */}
                    {alternatingFeaturesData.map((feature, index) => (
                          <AlternatingFeature
                              key={index}
                              title={feature.title}
                              description={feature.description}
                              points={feature.points}
                              visualContent={feature.visualContent}
                              imageOnLeft={feature.imageOnLeft}
                          />
                    ))}

                {/* --- Renders the Tabbed Features --- */}
                <TabbedFeatures features={tabbedFeaturesData} />
            </div>
        </section>
    );
};

export default FeaturesSection;
