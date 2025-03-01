import React, { useState } from 'react';
import { Settings, Info, Github } from 'lucide-react';
import ApiKeySettings from './ApiKeySettings';

const Header: React.FC = () => {
  const [showApiSettings, setShowApiSettings] = useState(false);
  
  return (
    <header className="bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <span className="font-bold text-xl">J</span>
            </div>
            <span className="font-semibold text-xl">J.A.R.V.I.S.</span>
          </div>
          
          <nav>
            <ul className="flex space-x-4">
              <li>
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Info size={20} />
                </button>
              </li>
              <li>
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Github size={20} />
                </button>
              </li>
              <li>
                <button 
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  onClick={() => setShowApiSettings(true)}
                >
                  <Settings size={20} />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      
      {showApiSettings && (
        <ApiKeySettings onClose={() => setShowApiSettings(false)} />
      )}
    </header>
  );
};

export default Header;