
import React, { useState, useRef, useEffect } from 'react';
import AccountButton from './components/AccountButton';
import AccountDropdown from './components/AccountDropdown';

const AccountMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <AccountButton
                isOpen={isOpen}
                onClick={handleToggle}
            />
            <AccountDropdown
                isOpen={isOpen}
                onClose={handleClose}
            />
        </div>
    );
};

export default AccountMenu;
