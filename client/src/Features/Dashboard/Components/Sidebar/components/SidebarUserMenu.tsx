import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../../../lib/stores/authStore';
import { FiLogOut } from 'react-icons/fi';

interface SidebarUserMenuProps {
    isOpen: boolean;
}

const SidebarUserMenu: React.FC<SidebarUserMenuProps> = ({ isOpen }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Could not log out. Please try again.");
        }
    };

    return (
        <div className="flex-shrink-0 p-2 border-t border-gray-700/50">
            <div className={`flex items-center p-2 rounded-lg ${isOpen ? '' : 'justify-center'}`}>
                <div title={user?.name} className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">
                    {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
                </div>

                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'w-32 ml-3' : 'w-0'}`} aria-hidden={!isOpen}>
                    <p className="text-sm font-semibold text-white truncate">{user?.name || 'User'}</p>
                </div>

                <button
                    onClick={handleLogout}
                    title="Logout"
                    className={`p-2 rounded-lg text-gray-400 hover:bg-red-500 hover:text-white transition-all duration-300
                               ${isOpen ? 'opacity-100 ml-auto' : 'opacity-0 w-0 h-0 pointer-events-none'}`}
                    aria-hidden={!isOpen}
                >
                    <FiLogOut className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default SidebarUserMenu;
