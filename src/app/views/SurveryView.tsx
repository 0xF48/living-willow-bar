'use client';

import { useState } from 'react';
import { useSurvey } from '../hooks/useSurvey';
import { NavButton } from '../components/NavButton';
import { Nav } from '@/data/enums';
import { DRINKS } from '@/data/drinks';
import cn from 'classnames';

export function SurveyView() {
  const {
    currentQuestion,
    conversation,
    recommendedDrink,
    isLoading,
    error,
    conversationComplete,
    sessionStarted,
    startSurvey,
    submitResponse,
    resetSurvey,
  } = useSurvey();

  const [userInput, setUserInput] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleStartSurvey = () => {
    startSurvey();
  };

  const handleSubmitResponse = async (response: string, isMultipleChoice = false) => {
    if (!response.trim()) return;
    
    await submitResponse(response, isMultipleChoice);
    setUserInput('');
    setShowInput(false);
  };

  const handleInputToggle = () => {
    setShowInput(!showInput);
    if (showInput) {
      setUserInput('');
    }
  };

  const handleInputSubmit = () => {
    if (userInput.trim()) {
      handleSubmitResponse(userInput.trim());
    }
  };

  // Common response options for quick selection
  const quickResponses = {
    energy: ['Very energized', 'Moderately energized', 'Low energy', 'Exhausted'],
    stress: ['Very calm', 'Somewhat stressed', 'Quite stressed', 'Very stressed'],
    physical: ['Feeling great', 'Some discomfort', 'Quite uncomfortable', 'In pain'],
    general: ['Yes', 'No', 'Sometimes', 'Not sure']
  };

  if (!sessionStarted) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <div className="w-24">
            <NavButton nav={Nav.SURVEY} />
          </div>
          <div className="text-center">
            <NavButton nav={Nav.MENU} />
          </div>
          <div className="w-24"></div>
        </div>

        {/* Welcome Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-4">Welcome to Living Willow</h1>
            <p className="text-gray-600 mb-6">
              Let our AI wellness guide help you find the perfect elixir for your current needs.
              This takes about 3-5 minutes.
            </p>
          </div>

          <button
            onClick={handleStartSurvey}
            className="bg-green-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Start Wellness Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="w-24">
          <button onClick={resetSurvey}>
            <NavButton nav={Nav.SURVEY} />
          </button>
        </div>
        <div className="text-center">
          <NavButton nav={Nav.MENU} />
        </div>
        <div className="w-24"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Question Area */}
        <div className="flex-1 p-6">
          {/* Conversation History */}
          {conversation.length > 0 && (
            <div className="mb-6 space-y-4">
              {conversation.slice(-2).map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-sm text-gray-600 font-medium">
                    Q: {item.question}
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg text-sm">
                    A: {item.answer}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Current Question */}
          <div className="mb-8">
            <div className="text-center mb-4">
              <div className="text-sm text-gray-500 mb-2">
                RESPONSE/WELCOME MESSAGE
              </div>
              <div className="text-sm text-gray-400">...</div>
            </div>

            <div className="text-center mb-6">
              <div className="text-sm text-gray-500 mb-2">QUESTION</div>
              <div className="text-lg font-medium px-4">
                {isLoading ? 'Thinking...' : currentQuestion}
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            {/* Quick Response Options */}
            {!conversationComplete && !isLoading && (
              <div className="space-y-3">
                {/* Try to show relevant quick responses based on question content */}
                {currentQuestion.toLowerCase().includes('stress') || currentQuestion.toLowerCase().includes('anxious') ? (
                  quickResponses.stress.map((response, index) => (
                    <button
                      key={index}
                      onClick={() => handleSubmitResponse(response, true)}
                      className="w-full bg-gray-200 p-3 rounded-lg text-left hover:bg-gray-300 transition-colors"
                      disabled={isLoading}
                    >
                      A: {response}
                    </button>
                  ))
                ) : currentQuestion.toLowerCase().includes('energy') || currentQuestion.toLowerCase().includes('tired') ? (
                  quickResponses.energy.map((response, index) => (
                    <button
                      key={index}
                      onClick={() => handleSubmitResponse(response, true)}
                      className="w-full bg-gray-200 p-3 rounded-lg text-left hover:bg-gray-300 transition-colors"
                      disabled={isLoading}
                    >
                      A: {response}
                    </button>
                  ))
                ) : currentQuestion.toLowerCase().includes('pain') || currentQuestion.toLowerCase().includes('discomfort') ? (
                  quickResponses.physical.map((response, index) => (
                    <button
                      key={index}
                      onClick={() => handleSubmitResponse(response, true)}
                      className="w-full bg-gray-200 p-3 rounded-lg text-left hover:bg-gray-300 transition-colors"
                      disabled={isLoading}
                    >
                      A: {response}
                    </button>
                  ))
                ) : (
                  quickResponses.general.map((response, index) => (
                    <button
                      key={index}
                      onClick={() => handleSubmitResponse(response, true)}
                      className="w-full bg-gray-200 p-3 rounded-lg text-left hover:bg-gray-300 transition-colors"
                      disabled={isLoading}
                    >
                      A: {response}
                    </button>
                  ))
                )}
              </div>
            )}

            {/* Recommendation Display */}
            {conversationComplete && recommendedDrink && (
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <h3 className="text-lg font-bold mb-2">Your Recommended Elixir</h3>
                <div className="text-2xl mb-2">{DRINKS[recommendedDrink].emoji}</div>
                <div className="font-semibold mb-2">{DRINKS[recommendedDrink].name}</div>
                <div className="text-sm text-gray-600 mb-4">{DRINKS[recommendedDrink].flavorProfile}</div>
                <button 
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  onClick={() => {/* Navigate to drink details */}}
                >
                  View Details
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t p-4">
          {showInput ? (
            <div className="space-y-3">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Share how you're feeling in your own words..."
                className="w-full p-3 border rounded-lg resize-none h-20"
                disabled={isLoading}
              />
              <div className="flex justify-between">
                <button
                  onClick={handleInputToggle}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleInputSubmit}
                  disabled={!userInput.trim() || isLoading}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300"
                >
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between">
              <button
                onClick={handleInputToggle}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors flex-1 mr-4"
                disabled={isLoading || conversationComplete}
              >
                TYPE A RESPONSE / CLEAR ANSWER
              </button>
              {!conversationComplete && (
                <button
                  className={cn(
                    "px-6 py-2 rounded-lg font-semibold transition-colors",
                    isLoading 
                      ? "bg-gray-300 text-gray-500" 
                      : "bg-gray-300 text-black hover:bg-gray-400"
                  )}
                  disabled={isLoading}
                >
                  NEXT
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}