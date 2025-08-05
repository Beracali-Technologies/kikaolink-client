import React, { useState, Fragment } from 'react';
import { Tab } from '@headlessui/react';

interface TabFeature {
    id: string;
    icon: JSX.Element;
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
}

interface TabbedFeaturesProps {
    features: TabFeature[];
}


const TabbedFeatures: React.FC<TabbedFeaturesProps> = ({ features }) => {
    return (
        <Tab.Group as="div" className="bg-gradient-to-br from-blue-50 via-white to-sky-50 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* --- Left Side Panel (Tab List) --- */}
                <Tab.List className="lg:col-span-4 space-y-4">
                    {features.map(feature => (
                        <Tab as={Fragment} key={feature.id}>
                            {({ selected }) => (
                                <button
                                    className={`w-full flex items-center text-left p-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-blue/50 ${
                                        selected ? 'bg-primary-blue text-white shadow-lg' : 'bg-white hover:bg-slate-100'
                                    }`}
                                >
                                    <div className={`flex-shrink-0 mr-4 p-2 rounded-lg ${selected ? 'bg-white/20' : 'bg-blue-100'}`}>
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold">{feature.title}</h4>
                                        <p className={`text-sm ${selected ? 'text-blue-200' : 'text-light-text'}`}>{feature.subtitle}</p>
                                    </div>
                                </button>
                            )}
                        </Tab>
                    ))}
                </Tab.List>

                {/* --- Right Side Content (Tab Panels) --- */}
                <Tab.Panels className="lg:col-span-8">
                    {features.map(feature => (
                        <Tab.Panel as="div" className="p-4" key={feature.id}>
                            <h3 className="text-3xl font-bold text-dark-text">{feature.title}</h3>
                            <p className="mt-4 text-lg text-light-text">{feature.description}</p>
                            <div className="mt-8 rounded-xl overflow-hidden shadow-2xl">
                                 <img src={feature.imageUrl} alt={feature.imageAlt} className="w-full h-full object-cover"/>
                            </div>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </div>
        </Tab.Group>
    );
};

export default TabbedFeatures;
