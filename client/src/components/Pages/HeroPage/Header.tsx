import React, { useState } from 'react';


const Header: React.FC = () => {

    return (
          <header className="bg-white px-6 py-4 justify-between items-center">
                {/*logo*/}
                <div className="text-2xl font-bold">
                        <span>Kikao</span>
                        <span>connect</span>
                </div>

          </header>
    )
}

export default Header;
