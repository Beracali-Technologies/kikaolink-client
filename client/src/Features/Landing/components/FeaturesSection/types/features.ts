import { ReactNode } from 'react';

export interface AlternatingFeatureItem {
    title: ReactNode;
    description: string;
    visualContent: ReactNode;
    points?: string[];
    imageOnLeft?: boolean;
}

// Defines feature in the "Tabbed" layout
export interface TabbedFeatureItem {
    id: string;
    icon: JSX.Element;
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
}
