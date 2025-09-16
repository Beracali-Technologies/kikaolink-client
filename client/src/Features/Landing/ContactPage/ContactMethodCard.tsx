import React from 'react';
import { ContactMethod } from './ContactData'; // Import the interface for the method prop



//This component is responsible for rendering a  method cards. It will also contain the SVG definitions for the icons it uses, making it a self-contained unit
interface IconProps {
  className?: string; // Allows passing Tailwind classes to the SVG
}

const PhoneIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.219-.99-.584-1.331l-6.375-6.375a1.5 1.5 0 00-2.122 0l-1.12 1.12a.668.668 0 01-.937 0z" />
  </svg>
);

const WhatsAppIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25c-2.486 0-4.5 2.015-4.5 4.5s2.014 4.5 4.5 4.5c2.485 0 4.5-2.015 4.5-4.5s-2.015-4.5-4.5-4.5zm-8.25 3h.008v.008H11.25v-.008zm-2.25 0h.008v.008h-.008v-.008zm-4.5 0h.008v.008H4.5v-.008z" />
  </svg>
);

const EmailIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906c0 .94.552 1.767 1.35 2.164l6.478 3.488m-8.13-1.425L12 18.33l8.632-4.636M12 21.75L2.25 16.5m9.75 5.25v-4.512" />
  </svg>
);

// A map to dynamically select the correct icon component based on its name
const iconcomponents: { [key: string]: React.FC<IconProps> } = {
  PhoneIcon,
  WhatsAppIcon,
  EmailIcon,
};

interface ContactMethodCardProps {
  method: ContactMethod;
}

const ContactMethodCard: React.FC<ContactMethodCardProps> = ({ method }) => {
  // Dynamically get the icon component using its name from the method object
  const IconComponent = iconcomponents[method.iconName];

  return (

    <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg border border-gray-200"> {/* Added card styling here */}
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
        {/* Render the icon component, applying its specific color class */}
        {IconComponent && <IconComponent className={`w-8 h-8 ${method.iconColorClass}`} />}
      </div>
      <h3 className="mt-4 text-lg font-bold">{method.name}</h3>
      <p className="text-light-text text-sm">{method.description}</p>
      <a
        href={method.buttonHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-6 w-full py-2.5 rounded-lg font-semibold text-sm transition-all
          ${method.primary ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'}
        `}
      >
        {method.buttonText}
      </a>
    </div>
  );
};

export default ContactMethodCard;
