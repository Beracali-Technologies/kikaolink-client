import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import smsImage from '@/assets/images/communications/sms.webp';
import emailImage from '@/assets/images/communications/email.webp';
import { motion } from 'framer-motion';

const CommunicationsOverviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const cards = [
    {
      title: 'Send SMS',
      description: 'Quickly reach your event attendees instantly via SMS.',
      image: smsImage,
      to: `/dashboard/events/${eventId}/communications/sms`,
    },
    {
      title: 'Send Email',
      description: 'Compose and send bulk or custom emails with ease.',
      image: emailImage,
      to: `/dashboard/events/${eventId}/communications/email`,
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Communications Center</h1>
        <p className="text-gray-500 mt-2">
          Stay connected with your attendees through SMS or Email. Choose how you'd like to communicate.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(card.to)}
            className="cursor-pointer bg-white shadow-sm hover:shadow-lg transition-all border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-28 h-28 object-contain mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {card.title}
            </h2>
            <p className="text-gray-500 text-sm">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommunicationsOverviewPage;
