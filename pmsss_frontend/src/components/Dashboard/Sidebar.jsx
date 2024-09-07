import { Link } from 'react-router-dom';
import { Home, Person, Description, Settings } from '@mui/icons-material';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-full md:w-64 p-5 flex flex-col">
      <div className="mb-6 flex flex-row items-center gap-4">
        <img src="/logo.svg" alt="PMSSS Logo" width={50} height={50} />
        <h1 className="text-xl font-bold text-white">PMSSS</h1>
      </div>
      <h2 className="text-xl font-semibold mb-6">Navigation</h2>
      <ul className="space-y-4">
        <li className="flex items-center gap-2 hover:text-blue-400">
          <Home />
          <Link to="/dashboard/student/">Dashboard</Link>
        </li>
        <li className="flex items-center gap-2 hover:text-blue-400">
          <Person />
          <Link to="/dashboard/student/profile">Profile</Link>
        </li>
        <li className="flex items-center gap-2 hover:text-blue-400">
          <Description />
          <Link to="/dashboard/student/documents">Documents</Link>
        </li>
        <li className="flex items-center gap-2 hover:text-blue-400">
          <Settings />
          <Link to="/dashboard/student/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
