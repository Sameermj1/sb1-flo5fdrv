import React from 'react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  capabilities: string[];
}

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center mb-4">
        <div className="bg-blue-500 bg-opacity-20 p-3 rounded-lg mr-4">
          {feature.icon}
        </div>
        <h3 className="text-xl font-semibold">{feature.title}</h3>
      </div>
      
      <p className="text-gray-300 mb-4">{feature.description}</p>
      
      <ul className="space-y-2">
        {feature.capabilities.map((capability, index) => (
          <li key={index} className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span className="text-sm text-gray-300">{capability}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureCard;