import React, { useState } from 'react';
import { Key, Save, X, Check } from 'lucide-react';
import { apiConfig, updateApiConfig } from '../config/apiConfig';

interface ApiKeySettingsProps {
  onClose: () => void;
}

const ApiKeySettings: React.FC<ApiKeySettingsProps> = ({ onClose }) => {
  const [huggingFaceKey, setHuggingFaceKey] = useState(apiConfig.huggingFace.apiKey);
  const [huggingFaceEnabled, setHuggingFaceEnabled] = useState(apiConfig.huggingFace.enabled);
  const [openWeatherKey, setOpenWeatherKey] = useState(apiConfig.openWeather.apiKey);
  const [openWeatherEnabled, setOpenWeatherEnabled] = useState(apiConfig.openWeather.enabled);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  
  const handleSave = () => {
    try {
      setSaveStatus('saving');
      
      // Update Hugging Face config
      updateApiConfig('huggingFace', 'apiKey', huggingFaceKey);
      updateApiConfig('huggingFace', 'enabled', huggingFaceEnabled);
      
      // Update OpenWeather config
      updateApiConfig('openWeather', 'apiKey', openWeatherKey);
      updateApiConfig('openWeather', 'enabled', openWeatherEnabled);
      
      setSaveStatus('success');
      setTimeout(() => {
        setSaveStatus('idle');
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Error saving API settings:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">API Configuration</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Hugging Face API */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Key size={18} className="text-blue-400 mr-2" />
                <h3 className="font-medium">Hugging Face API</h3>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={huggingFaceEnabled}
                  onChange={() => setHuggingFaceEnabled(!huggingFaceEnabled)}
                />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">API Key</label>
              <input
                type="password"
                value={huggingFaceKey}
                onChange={(e) => setHuggingFaceKey(e.target.value)}
                placeholder="Enter Hugging Face API key"
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500">
                Used for natural language processing and intent recognition.
                <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-blue-400 ml-1 hover:underline">
                  Get API key
                </a>
              </p>
            </div>
          </div>
          
          {/* OpenWeather API */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Key size={18} className="text-blue-400 mr-2" />
                <h3 className="font-medium">OpenWeather API</h3>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={openWeatherEnabled}
                  onChange={() => setOpenWeatherEnabled(!openWeatherEnabled)}
                />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">API Key</label>
              <input
                type="password"
                value={openWeatherKey}
                onChange={(e) => setOpenWeatherKey(e.target.value)}
                placeholder="Enter OpenWeather API key"
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500">
                Used for weather forecasts and conditions.
                <a href="https://home.openweathermap.org/api_keys" target="_blank" rel="noopener noreferrer" className="text-blue-400 ml-1 hover:underline">
                  Get API key
                </a>
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
          >
            {saveStatus === 'idle' && (
              <>
                <Save size={18} className="mr-2" />
                Save Configuration
              </>
            )}
            {saveStatus === 'saving' && (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Saving...
              </>
            )}
            {saveStatus === 'success' && (
              <>
                <Check size={18} className="mr-2" />
                Saved Successfully
              </>
            )}
            {saveStatus === 'error' && (
              <>
                <X size={18} className="mr-2" />
                Error Saving
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeySettings;