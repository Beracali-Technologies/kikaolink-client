import React from 'react';
import { IconType } from 'react-icons';
import { useNavigate } from 'react-router-dom';

interface DropdownItemProps {
    icon: IconType;
    label: string;
    onClick: () => void;
    path?: string;
    isLogout?: boolean;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
    icon: Icon,
    label,
    onClick,
    path,
    isLogout = false
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (path) {
            navigate(path);
        }
        onClick();
    };

    const baseClasses = "w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200";
    const normalClasses = "text-gray-700 hover:bg-gray-50 hover:text-gray-900";
    const logoutClasses = "text-red-600 hover:bg-red-50 hover:text-red-700";

    return (
        <button
            onClick={handleClick}
            className={`${baseClasses} ${isLogout ? logoutClasses : normalClasses}`}
        >
            <Icon className={`${isLogout ? 'text-red-500' : 'text-gray-400'} text-base`} />
            <span>{label}</span>
        </button>
    );
};

export default DropdownItem;
