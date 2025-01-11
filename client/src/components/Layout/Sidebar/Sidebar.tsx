import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {

    const menuItems = [
        {name: 'My Events', path: '/eventlist'},
        {name: 'Registration Form', path: '/registrationForm'},
        {name: 'siteContent', path: '/siteContent'},
    ];


    return (
        <div className="h-screen bg-gray-800 text-white flex flex-col">
                <div className="font-bold text-xl">
                    KikaoConnect
                </div>

                <nav className="flex-1">
                    {menuItems.map((item) => (
                            <NavLink
                                  key={item.name}
                                  to={item.path}
                                  className={({ isActive }) =>
                                                `block py-2 px-4 text-sm font-medium ${
                                                    isActive ?
                                                      "bg-gray-700 text-orange-400" :
                                                      "hover:bg-gray-700 hover:text-orange-300"
                                                }`}
                              >
                                    {item.name}
                            </NavLink>
                    ))}
                </nav>
        </div>
    )
}

export default Sidebar;
