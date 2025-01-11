import React from 'react';
import { NavLink } from 'react-router-dom';
import { EventParticular, SiteContent, RegistrationForm } from '../../../assets/Icons/Icons';

const Sidebar: React.FC = () => {

    const menuItems = [
        {name: 'Event particulars', path: '/eventlist', icon: <EventParticular className="font-bold" /> },
        {name: 'Registration form', path: '/registrationForm', icon: <RegistrationForm className="font-bold" />},
        {name: 'Site content', path: '/siteContent', icon: <SiteContent className="font-bold" />},
    ];


    return (
        <div className="h-screen bg-gray-800 text-white flex flex-col">
              <div className="p-4 font-bold text-xl">
                    KikaoConnect
                </div>

                <nav className="flex-grow">
                    {menuItems.map((item) => (
                            <NavLink
                                  key={item.name}
                                  to={item.path}
                                  className={({ isActive }) =>
                                                `block py-2 px-4 text-sm font-medium flex flex-row gap-4 ${
                                                    isActive ?
                                                      "bg-gray-700 text-orange-400" :
                                                      "hover:bg-gray-700 hover:text-orange-300"
                                                }`}
                              >
                                      <span>{item.icon}</span>
                                      {item.name}
                            </NavLink>
                    ))}
                </nav>
        </div>
    )
}

export default Sidebar;
