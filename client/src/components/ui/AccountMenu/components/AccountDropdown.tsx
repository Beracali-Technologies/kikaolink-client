// Features/Dashboard/components/Header/components/AccountDropdown.tsx
import React from 'react';
import DropdownItem from './DropdownItem';
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi';

interface AccountDropdownProps {
    isOpen: boolean;
    onClose: () => void;
}

const AccountDropdown: React.FC<AccountDropdownProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-[1000]">
            {/* User Info Section */}
            <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">Welcome back!</p>
                <p className="text-xs text-gray-500 mt-1">user@example.com</p>
            </div>

            {/* Menu Items */}
            <div className="py-1">
                <DropdownItem
                    icon={FiUser}
                    label="Profile"
                    onClick={onClose}
                    path="/dashboard/profile"
                />
                <DropdownItem
                    icon={FiSettings}
                    label="Settings"
                    onClick={onClose}
                    path="/dashboard/settings"
                />
            </div>

            {/* Logout Section */}
            <div className="border-t border-gray-100 pt-1">
                <DropdownItem
                    icon={FiLogOut}
                    label="Logout"
                    onClick={onClose}
                    isLogout={true}
                />
            </div>
        </div>
    );
};

export default AccountDropdown;
