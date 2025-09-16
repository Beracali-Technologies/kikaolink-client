import React from "react";

interface Event {
  title: string;
  date: string;
  location: string;
  description: string;
  image?: string;
}

const Template1: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        )}
        <div className="relative z-10 max-w-5xl mx-auto px-8 py-28 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg leading-tight">
            {event.title}
          </h1>
          <p className="text-xl md:text-2xl opacity-95 max-w-3xl mx-auto leading-relaxed">
            {event.description}
          </p>
        </div>
      </section>

      {/* Event Details */}
      <section className="flex-grow">
        <div className="max-w-5xl mx-auto px-8 -mt-20">
          <div className="bg-white shadow-2xl rounded-3xl p-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-10 text-center">
              Event Details
            </h2>
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div>
                <span className="block text-indigo-600 font-semibold text-sm uppercase tracking-wide">
                  Date
                </span>
                <p className="mt-4 text-gray-700 text-lg">{event.date}</p>
              </div>
              <div>
                <span className="block text-indigo-600 font-semibold text-sm uppercase tracking-wide">
                  Location
                </span>
                <p className="mt-4 text-gray-700 text-lg">{event.location}</p>
              </div>
              <div>
                <span className="block text-indigo-600 font-semibold text-sm uppercase tracking-wide">
                  Organized By
                </span>
                <p className="mt-4 text-gray-700 text-lg">Beracali Technologies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-50 py-20 mt-20">
        <div className="max-w-4xl mx-auto text-center px-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to Join the Experience?
          </h3>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Secure your spot today and connect with professionals and innovators
            in an unforgettable event.
          </p>
          <a
            href="#register"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-full font-medium text-lg transition"
          >
            Register Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 mt-16 text-center text-sm">
        © {new Date().getFullYear()} Beracali Technologies. All rights reserved.
      </footer>
    </div>
  );
};

export default Template1;
