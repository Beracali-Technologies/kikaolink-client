import React from 'react';
import { Link } from 'react-router-dom';
import noEventImage from '../../../../assets/Icons/noEvent.webp';


interface NoEventImageProps {
    className?: string;
    alt?: string;
}

const NoEventImage: React.FC<NoEventImageProps> = ({ className, alt ="No Event found"  }) => {
  return (
        <img src={noEventImage} width="400" height="400" alt={alt} className={className} />
  )
}

/*const EmptyCalendarIcon: React.FC = () => (
    <svg className="w-28 h-28 text-slate-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
); */

const PlusIcon = () => <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;

const NoEventState: React.FC = () => {
    return (
        <div className="text-center py-20 px-6 bg-white rounded-lg shadow-sm border border-dashed">
              <div className="flex justify-center mb-6">
                    <NoEventImage className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-96 xl:h-96" />
              </div>
              <h2 className="text-2xl font-bold text-dark-text">Your Event List is Empty</h2>
              <p className="mt-2 text-base text-light-text">
                    Let's get started by creating your first event.
              </p>
              <div className="mt-8">
                    <Link
                        to="/dashboard/events/create"
                        className="inline-flex items-center gap-2 bg-primary-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-blue-hover transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:-translate-y-0.5"
                    >
                        <PlusIcon />
                        <span>Create Your First Event</span>
                    </Link>
              </div>
        </div>
    );
};

export default NoEventState;
