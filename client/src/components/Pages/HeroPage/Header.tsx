import React, { useState } from 'react';


const Header: React.FC = () => {
    const [navigationItems, setNavigationItems] = useState(false);

    return (
          <header className="bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center">
                  <div className="flex items-center space-x-6">
                          {/*logo*/}
                          <div className="text-2xl font-bold">
                                  <span className="text-orange-400">Kikao</span>
                                  <span className="text-white">connect</span>
                          </div>

                            {/*navigation items*/}
                              <nav className="hidden text-white md:flex space-x-6">
                                      <a href="/features">Features</a>
                                      <a href="/pricing">Pricing</a>
                                      <a href="/hiring">We are hiring</a>
                                      <a href="/resources">Resources</a>
                              </nav>
                  </div>

                <div className="text-white flex space-x-4 items-center">
                        <a href="/login">Login</a>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2" href="/demo">Request Demo</button>
                </div>
          </header>
    )
}

export default Header;
