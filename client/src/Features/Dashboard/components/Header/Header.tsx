import { FiMenu } from 'react-icons/fi';



const Header: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
    return (
        <header className="lg:hidden bg-white shadow-sm flex items-center p-4">
            <button onClick={onMenuClick}>
                <FiMenu className="h-6 w-6 text-gray-600"/>
            </button>
            <div className="font-bold text-lg ml-4">KikaoLink</div>
        </header>
    );
};
export default Header;
