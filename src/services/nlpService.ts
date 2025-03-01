/**
 * Natural Language Processing Service
 * 
 * Handles text processing, intent recognition, and language understanding
 * using Hugging Face API integration.
 */

import { apiConfig, isApiConfigured } from '../config/apiConfig';

interface NlpResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export const processText = async (text: string): Promise<NlpResponse> => {
  if (!isApiConfigured('huggingFace')) {
    return {
      success: false,
      error: 'Hugging Face API is not configured. Please add your API key in settings.'
    };
  }

  try {
    const response = await fetch(apiConfig.huggingFace.endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiConfig.huggingFace.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: text })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || `API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('NLP processing error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

export const detectIntent = (text: string): string => {
  // Simple intent detection based on keywords
  // In a real implementation, this would use the NLP API
  const text_lower = text.toLowerCase();
  
  if (text_lower.includes('weather')) return 'get_weather';
  if (text_lower.includes('calendar') || text_lower.includes('schedule') || text_lower.includes('appointment')) return 'calendar_query';
  if (text_lower.includes('remind') || text_lower.includes('reminder')) return 'set_reminder';
  if (text_lower.includes('light') || text_lower.includes('temperature')) return 'smart_home_control';
  if (text_lower.includes('email') || text_lower.includes('message')) return 'communication';
  if (text_lower.includes('search') || text_lower.includes('find')) return 'web_search';
  
  return 'general_query';
};