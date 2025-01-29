import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { EventParticular, SiteContent, RegistrationForm, ChevronLeft } from '../../../assets/Icons/Icons';

const Sidebar: React.FC = () => {

    const menuItems = [
        {name: 'Event particulars', path: '/eventlist', icon: <EventParticular className="font-bold" /> },
        {name: 'Registration form', path: '/registrationForm', icon: <RegistrationForm className="font-bold" />},
        {name: 'Site content', path: '/siteContent', icon: <SiteContent className="font-bold" />},
    ];

      const [isCollapsed, setIsCollapsed] = useState(false);

      useEffect(() => {
          console.log("isCollapsed value is updated", isCollapsed);
      },[isCollapsed]);

    return (
        <div className={`h-screen bg-gray-800 text-white flex flex-col transition-all duration-300 ${isCollapsed ? `w-16` : `w-56`}`}>
                <div className="p-4 flex justify-between gap-4">
                      <span className={`py-3 font-bold text-xl transition-opacity duration-300 ${isCollapsed ? `opacity-0 w-0` : `opacity-100 w-auto`}`}>
                            KikaoConnect
                      </span>

                      <button onClick={() => setIsCollapsed(!isCollapsed)} className="font-bold text-white focus:outline-none">
                              <ChevronLeft className={`font-bold transform transition-transform duration-300 ${isCollapsed ? `rotate-180` : `rotate-0`}`} />
                      </button>
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
                                      <span className={`${isCollapsed ? `opacity-0 w-0` : `opacity-100 w-auto`}`}>
                                          {item.name}
                                      </span>
                            </NavLink>
                    ))}
                </nav>
        </div>
    )
}

export default Sidebar;
