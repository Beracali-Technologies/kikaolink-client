import React from 'react';
import { FiUser, FiChevronDown } from 'react-icons/fi';

interface AccountButtonProps {
    isOpen: boolean;
    onClick: () => void;
}

const AccountButton: React.FC<AccountButtonProps> = ({ isOpen, onClick }) => {

  
    return (
        <button
            onClick={onClick}
            className="flex items-center space-x-2 text-white hover:text-gray-200 font-medium text-sm transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/10 border border-transparent hover:border-white/20"
        >
            <div className="w-8 h-8 bg-gradient-to-r from-[#FF4444] to-[#FF6B6B] rounded-full flex items-center justify-center">
                <FiUser className="text-white text-sm" />
            </div>
            <span>Account</span>
            <FiChevronDown
                className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            />
        </button>
    );
};

export default AccountButton;
