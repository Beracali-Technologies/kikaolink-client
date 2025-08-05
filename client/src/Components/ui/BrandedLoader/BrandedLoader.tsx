import React from 'react';
import Logo from './Logo';
import Spinner from './Spinner';

const BrandedLoader: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 to-sky-100">
            <div className="flex flex-col items-center gap-6">
                <Logo />
                <Spinner />
            </div>
        </div>
    );
};

export default BrandedLoader;
