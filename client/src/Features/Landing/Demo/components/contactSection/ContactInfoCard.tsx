import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

export const ContactInfoCard: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="bg-light-bg rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <h3 className="text-xl font-semibold text-dark-text mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
};