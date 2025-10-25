// Features/Dashboard/components/Header/Header.tsx
import { FiMenu } from 'react-icons/fi';
import Logo from '@/components/ui/Logo/Logo';

const MobileNavBar: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
    return (
        <>
            {/* Left: Menu Button */}
            <button
                onClick={onMenuClick}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
                <FiMenu className="h-6 w-6 text-gray-600"/>
            </button>


            {/* Right: Spacer for alignment */}
            <div className="w-10"></div>
        </>
    );
};

export default MobileNavBar;
