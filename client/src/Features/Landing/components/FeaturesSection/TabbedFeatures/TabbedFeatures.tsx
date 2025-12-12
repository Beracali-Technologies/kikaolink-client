import React, { Fragment } from 'react';
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
        <Tab.Group as="div" className="bg-gradient-to-br from-slate-50 to-sky-100 rounded-3xl p-4 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <Tab.List className="lg:col-span-4 flex lg:flex-col overflow-x-auto lg:overflow-x-visible -mx-4 px-4 gap-4">
                    {features.map((feature: TabFeature) => (
                        <Tab as={Fragment} key={feature.id}>
                            {({ selected }) => (
                                <button
                                    className={`w-full flex-shrink-0 lg:w-full flex items-center text-left p-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-blue/50 ${
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

                
            </div>
        </Tab.Group>
    );
};

export default TabbedFeatures;
