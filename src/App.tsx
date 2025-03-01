import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Settings, Info, Home, Calendar, Mail, Search, Clock, Cloud, Shield, Zap, Server, Database, Layers } from 'lucide-react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import VoiceVisualizer from './components/VoiceVisualizer';
import FeatureCard from './components/FeatureCard';
import ImplementationPhase from './components/ImplementationPhase';
import { features, implementationPhases, technologies } from './data/assistantData';
import { processText, detectIntent } from './services/nlpService';
import { apiConfig, isApiConfigured } from './config/apiConfig';

function App() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [apiStatus, setApiStatus] = useState<'unconfigured' | 'configured' | 'error'>('unconfigured');
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    // Check API configuration status on load
    if (isApiConfigured('huggingFace')) {
      setApiStatus('configured');
    } else {
      setApiStatus('unconfigured');
    }
  }, []);
  
  const toggleListening = async () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      setResponse('');
      // Simulate voice recognition
      setTimeout(() => {
        const userQuery = "What can you do for me, Jarvis?";
        setTranscript(userQuery);
        handleUserQuery(userQuery);
      }, 2000);
    } else {
      setTranscript('');
    }
  };
  
  const handleUserQuery = async (query: string) => {
    setIsProcessing(true);
    
    if (apiStatus === 'unconfigured') {
      simulateResponse();
      setIsProcessing(false);
      return;
    }
    
    try {
      // Detect intent from the query
      const intent = detectIntent(query);
      
      // For demo purposes, we'll use the NLP service only if it's configured
      if (isApiConfigured('huggingFace')) {
        const nlpResponse = await processText(query);
        
        if (nlpResponse.success) {
          // In a real implementation, we would use the NLP response
          // For now, we'll still use the simulated response
          simulateResponse();
        } else {
          setResponse(`I'm having trouble connecting to my language processing service. ${nlpResponse.error}`);
          setApiStatus('error');
        }
      } else {
        simulateResponse();
      }
    } catch (error) {
      console.error('Error processing query:', error);
      setResponse("I'm sorry, I encountered an error processing your request. Please check your API configuration.");
      setApiStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const simulateResponse = () => {
    const responses = [
      "I can manage your calendar, control smart home devices, provide real-time information, and much more. How may I assist you today?",
      "I'm monitoring weather conditions, traffic patterns, and your upcoming appointments. Would you like a summary?",
      "I've detected a meeting in 30 minutes. Would you like me to prepare the relevant documents and start the coffee machine?",
      "Based on your schedule today, I recommend leaving in 15 minutes to arrive at your appointment on time. Traffic is heavier than usual."
    ];
    
    let i = 0;
    const responseText = responses[Math.floor(Math.random() * responses.length)];
    const responseInterval = setInterval(() => {
      if (i <= responseText.length) {
        setResponse(responseText.substring(0, i));
        i++;
      } else {
        clearInterval(responseInterval);
      }
    }, 30);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="relative w-64 h-64 mb-8">
            <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute inset-4 bg-blue-400 rounded-full opacity-20 animate-pulse animation-delay-300"></div>
            <div className="absolute inset-8 bg-blue-300 rounded-full opacity-20 animate-pulse animation-delay-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <VoiceVisualizer isActive={isListening} />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-center">J.A.R.V.I.S.</h1>
          <p className="text-xl text-center text-gray-300 mb-8">Just A Rather Very Intelligent System</p>
          
          <div className="w-full max-w-2xl bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Voice Interface</h2>
              <button 
                onClick={toggleListening}
                className={`p-3 rounded-full ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} transition-colors`}
                disabled={isProcessing}
              >
                {isListening ? <MicOff size={24} /> : <Mic size={24} />}
              </button>
            </div>
            
            {apiStatus === 'unconfigured' && (
              <div className="mb-4 p-3 bg-yellow-900 bg-opacity-50 rounded-lg">
                <p className="text-yellow-300 flex items-center">
                  <Settings size={16} className="mr-2" />
                  API keys not configured. Some features may be limited. Click the settings icon to add your API keys.
                </p>
              </div>
            )}
            
            {apiStatus === 'error' && (
              <div className="mb-4 p-3 bg-red-900 bg-opacity-50 rounded-lg">
                <p className="text-red-300 flex items-center">
                  <Info size={16} className="mr-2" />
                  Error connecting to API services. Please check your API keys in settings.
                </p>
              </div>
            )}
            
            {transcript && (
              <div className="mb-4 p-3 bg-gray-700 rounded-lg">
                <p className="text-gray-300">You: {transcript}</p>
              </div>
            )}
            
            {isProcessing && (
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full mr-2"></div>
                <p className="text-gray-400">Processing...</p>
              </div>
            )}
            
            {response && (
              <div className="p-3 bg-blue-900 rounded-lg">
                <p>J.A.R.V.I.S.: {response}</p>
              </div>
            )}
            
            {!isListening && !transcript && !isProcessing && (
              <div className="text-center py-8 text-gray-400">
                <p>Click the microphone to activate J.A.R.V.I.S.</p>
                <p className="text-sm mt-2">Say "Hey Jarvis" followed by your command</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mb-12">
          <div className="flex border-b border-gray-700 mb-6">
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'features' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab('features')}
            >
              Features
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'implementation' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab('implementation')}
            >
              Implementation
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'tech' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab('tech')}
            >
              Technologies
            </button>
          </div>
          
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">J.A.R.V.I.S. Voice Assistant System</h2>
              
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">System Architecture</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Mic className="text-blue-400 mr-2" size={20} />
                      <h4 className="font-medium">Input Layer</h4>
                    </div>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Wake word detection</li>
                      <li>• Speech-to-text conversion</li>
                      <li>• Natural language understanding</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Layers className="text-blue-400 mr-2" size={20} />
                      <h4 className="font-medium">Processing Layer</h4>
                    </div>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Intent recognition</li>
                      <li>• Context management</li>
                      <li>• Decision making</li>
                      <li>• API integration</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Zap className="text-blue-400 mr-2" size={20} />
                      <h4 className="font-medium">Output Layer</h4>
                    </div>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Response generation</li>
                      <li>• Text-to-speech synthesis</li>
                      <li>• Action execution</li>
                      <li>• UI feedback</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Core Components</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Server className="text-blue-400 mr-2" size={20} />
                      <h4 className="font-medium">Local Processing Unit</h4>
                    </div>
                    <p className="text-sm text-gray-300">Handles privacy-sensitive operations, wake word detection, and basic commands without internet connectivity.</p>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Cloud className="text-blue-400 mr-2" size={20} />
                      <h4 className="font-medium">Cloud Services</h4>
                    </div>
                    <p className="text-sm text-gray-300">Manages complex NLP tasks, machine learning models, and integration with external services.</p>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Database className="text-blue-400 mr-2" size={20} />
                      <h4 className="font-medium">Knowledge Base</h4>
                    </div>
                    <p className="text-sm text-gray-300">Stores user preferences, conversation history, and learned patterns for personalized interactions.</p>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Shield className="text-blue-400 mr-2" size={20} />
                      <h4 className="font-medium">Security Layer</h4>
                    </div>
                    <p className="text-sm text-gray-300">Ensures data encryption, secure API communications, and user authentication for sensitive operations.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'features' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} />
              ))}
            </div>
          )}
          
          {activeTab === 'implementation' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-4">Implementation Roadmap</h2>
              
              <div className="relative">
                <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-700"></div>
                <div className="space-y-12">
                  {implementationPhases.map((phase, index) => (
                    <ImplementationPhase key={index} phase={phase} phaseNumber={index + 1} />
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'tech' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Recommended Technologies</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(technologies).map(([category, techs]) => (
                  <div key={category} className="bg-gray-800 rounded-lg p-6 shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">{category}</h3>
                    <ul className="space-y-3">
                      {techs.map((tech, index) => (
                        <li key={index} className="flex items-start">
                          <div className="bg-blue-500 rounded-full p-1 mr-3 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          </div>
                          <div>
                            <span className="font-medium">{tech.name}</span>
                            <p className="text-sm text-gray-300">{tech.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;