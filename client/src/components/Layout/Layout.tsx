import React from 'react';
import Sidebar from './Sidebar/Sidebar';


interface layoutProps: {
    children: React.ReactNode;
}


const Layout: React.FC<layoutProps> = () => {


    return (
        <div className="flex h-screen">
                <Sidebar />

                <div className="bg-gray-100 flex-1 p-6 overflow-y-auto">{children}</div>
        </div>
    )
}

export default Layout;
