/**
 * AI Services utility for centralized API communication
 */

/**
 * CV Analysis Request
 * Hits the CV analysis endpoint to get insights on a resume/CV.
 * 
 * @param {string} message - The content or message to analyze
 * @returns {Promise<Object>} - The analysis results from the AI
 */
export const analyzeCV = async (message) => {
  const payload = {
    message: message
  };

  try {
    const response = await fetch('https://app.totalchaos.online/ai/cvanalysis', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`CV Analysis failed with status: ${response.status}`);
    }

    const result = await response.json();
    console.log('CV Analysis Result:', result);
    return result;
  } catch (error) {
    console.error('Error during CV Analysis:', error);
    throw error;
  }
};

/**
 * Interview AI Request
 * Hits the AI interview endpoint for chat-based interactions.
 * 
 * @param {string} message - The user message to send to the AI
 * @returns {Promise<Object>} - The AI reply
 */
export const askInterview = async (message) => {
  const payload = {
    message: message
  };

  try {
    const response = await fetch('https://app.totalchaos.online/ai/interview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Interview API failed with status: ${response.status}`);
    }

    const result = await response.json();
    console.log('AI Reply:', result.reply);
    return result;
  } catch (error) {
    console.error('Error during AI Interview request:', error);
    throw error;
  }
};
