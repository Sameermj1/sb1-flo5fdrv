/**
 * API Configuration
 * 
 * This file contains configuration for external API services used by J.A.R.V.I.S.
 */

export interface ApiConfig {
  huggingFace: {
    apiKey: string;
    enabled: boolean;
    endpoint: string;
  };
  openWeather: {
    apiKey: string;
    enabled: boolean;
  };
  // Add other API configurations as needed
}

// Default configuration with empty API keys
const defaultConfig: ApiConfig = {
  huggingFace: {
    apiKey: '',
    enabled: false,
    endpoint: 'https://api-inference.huggingface.co/models/gpt2'
  },
  openWeather: {
    apiKey: '',
    enabled: false
  }
};

// Load configuration from localStorage if available
const loadConfig = (): ApiConfig => {
  try {
    const savedConfig = localStorage.getItem('jarvis_api_config');
    if (savedConfig) {
      return { ...defaultConfig, ...JSON.parse(savedConfig) };
    }
  } catch (error) {
    console.error('Error loading API configuration:', error);
  }
  return defaultConfig;
};

// Save configuration to localStorage
export const saveConfig = (config: ApiConfig): void => {
  try {
    localStorage.setItem('jarvis_api_config', JSON.stringify(config));
  } catch (error) {
    console.error('Error saving API configuration:', error);
  }
};

// Current configuration
export const apiConfig = loadConfig();

// Update a specific API configuration
export const updateApiConfig = (
  service: keyof ApiConfig, 
  key: string, 
  value: any
): ApiConfig => {
  const updatedConfig = { 
    ...apiConfig,
    [service]: {
      ...apiConfig[service],
      [key]: value
    }
  };
  
  saveConfig(updatedConfig);
  return updatedConfig;
};

// Check if an API is properly configured
export const isApiConfigured = (service: keyof ApiConfig): boolean => {
  return apiConfig[service].apiKey !== '' && apiConfig[service].enabled;
};