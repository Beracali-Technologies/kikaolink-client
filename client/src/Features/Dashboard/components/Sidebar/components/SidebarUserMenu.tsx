import React, { useState } from 'react'; // <-- Import useState
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../../../lib/stores/authStore';
import { FiLogOut } from 'react-icons/fi';
import ConfirmLogoutModal from '../../../../../components/ui/ConfirmLogoutModal/ConfirmLogoutModal'; // <-- IMPORT THE MODAL

interface SidebarUserMenuProps {
    isOpen: boolean;
}

const SidebarUserMenu: React.FC<SidebarUserMenuProps> = ({ isOpen }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    // --- NEW STATE for controlling the modal ---
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleConfirmLogout = async () => {
        try {
            await logout();
            setIsLogoutModalOpen(false); // Close modal on success
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Could not log out. Please try again.");
            setIsLogoutModalOpen(false); // Also close modal on failure
        }
    };

    return (
        <>
            {/* The Modal Component (it's invisible until isOpen is true) */}
            <ConfirmLogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleConfirmLogout}
            />

            {/* Your existing user menu JSX */}
            <div className="flex-shrink-0 p-2 border-t border-gray-700/50">
                <div className={`flex items-center p-2 rounded-lg ${isOpen ? '' : 'justify-center'}`}>
                    <div title={user?.name} className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">
                        {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
                    </div>

                    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'w-32 ml-3' : 'w-0'}`} aria-hidden={!isOpen}>
                        <p className="text-sm font-semibold text-white truncate">{user?.name || 'User'}</p>
                    </div>

                    {/* This button now opens the modal instead of logging out directly */}
                    <button
                        onClick={() => setIsLogoutModalOpen(true)} // <-- CRITICAL CHANGE
                        title="Logout"
                        className={`p-2 rounded-lg text-gray-400 hover:bg-red-500 hover:text-white transition-all duration-300
                                ${isOpen ? 'opacity-100 ml-auto' : 'opacity-0 w-0 h-0 pointer-events-none'}`}
                        aria-hidden={!isOpen}
                    >
                        <FiLogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default SidebarUserMenu;
