import React from 'react';

interface Phase {
  title: string;
  duration: string;
  description: string;
  tasks: string[];
  deliverables: string[];
}

interface ImplementationPhaseProps {
  phase: Phase;
  phaseNumber: number;
}

const ImplementationPhase: React.FC<ImplementationPhaseProps> = ({ phase, phaseNumber }) => {
  return (
    <div className="relative pl-10">
      <div className="absolute left-0 top-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center z-10">
        <span className="font-bold">{phaseNumber}</span>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
          <h3 className="text-xl font-semibold">{phase.title}</h3>
          <span className="text-sm text-gray-400 bg-gray-700 px-3 py-1 rounded-full mt-2 md:mt-0">
            {phase.duration}
          </span>
        </div>
        
        <p className="text-gray-300 mb-4">{phase.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-blue-400 mb-2">Key Tasks</h4>
            <ul className="space-y-1">
              {phase.tasks.map((task, index) => (
                <li key={index} className="text-sm text-gray-300 flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-blue-400 mb-2">Deliverables</h4>
            <ul className="space-y-1">
              {phase.deliverables.map((deliverable, index) => (
                <li key={index} className="text-sm text-gray-300 flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImplementationPhase;