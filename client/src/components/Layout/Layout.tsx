import React from 'react';
import Sidebar from './Sidebar/Sidebar';


interface LayoutProps {
    children: React.ReactNode;
}


const Layout: React.FC<LayoutProps> = ({ children }) => {


    return (
        <div className="flex">

        {/*Side Bar*/}
            <Sidebar />


                  <div className="flex flex-col flex-1">
                          {/*Header*/}
                          <div className="flex justify-center m-0 py-2 bg-[#1F2937] text-white w-full">
                                <div className="flex justify-center items-center">Top navigation bar</div>
                          </div>

                          {/*children*/}
                          <div className="bg-[#FEFEFE] flex-1 p-6 overflow-y-auto">{children}</div>
                  </div>
        </div>
    )
}

export default Layout;
