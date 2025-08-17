
//This file hold all the static information for your contact methods (names, descriptions, links, and which icon to use)

export interface ContactMethod {
  name: string;
  description: string;
  detail: string;
  buttonText: string;
  buttonHref: string;
  // using a string name for the icon, and pass a class for its color
  iconName: 'PhoneIcon' | 'WhatsAppIcon' | 'EmailIcon';
  iconColorClass: string;
  primary: boolean;
}

export const contactMethods: ContactMethod[] = [
  {
    name: 'Call Us',
    description: 'Speak with our sales experts',
    detail: '+255 712 345 678',
    buttonText: 'Call Now (Coming Soon)',
    buttonHref: '#',
    iconName: 'PhoneIcon',
    iconColorClass: 'text-primary-blue',
    primary: false,
  },
  {
    name: 'WhatsApp',
    description: 'Quick Contact via WhatsApp',
    detail: 'Chat on WhatsApp',
    buttonText: 'Chat Now',
    buttonHref: 'https://wa.me/255710852259',
    iconName: 'WhatsAppIcon',
    iconColorClass: 'text-green-500',
    primary: true,
  },
  {
    name: 'Email Us',
    description: 'Send detailed requirements',
    detail: 'hello@KikaoLink.com',
    buttonText: 'Send an Email',
    buttonHref: 'mailto:hello@KikaoLink.com',
    iconName: 'EmailIcon',
    iconColorClass: 'text-slate-500',
    primary: false,
  },
];
