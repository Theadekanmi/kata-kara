"use client";
import { useState, useEffect } from "react";

interface SimpleMathCaptchaProps {
  onVerify: (value: string | null) => void;
}

export function SimpleMathCaptcha({ onVerify }: SimpleMathCaptchaProps) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    generateNewProblem();
  }, []);

  useEffect(() => {
    const userAnswer = parseInt(answer);
    const correctAnswer = num1 + num2;
    const correct = userAnswer === correctAnswer;
    
    setIsCorrect(correct);
    onVerify(correct ? "verified" : null);
  }, [answer, num1, num2, onVerify]);

  const generateNewProblem = () => {
    setNum1(Math.floor(Math.random() * 10));
    setNum2(Math.floor(Math.random() * 10));
    setAnswer("");
    setIsCorrect(false);
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Security Verification
      </label>
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-mono bg-white border border-gray-300 px-4 py-2 rounded">
          {num1} + {num2} = ?
        </div>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className={`w-20 px-3 py-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
            answer && isCorrect ? 'border-green-500 bg-green-50' : 
            answer && !isCorrect ? 'border-red-500 bg-red-50' : 
            'border-gray-300'
          }`}
          placeholder="Answer"
          required
        />
        <button
          type="button"
          onClick={generateNewProblem}
          className="text-sm text-gray-500 hover:text-gray-700"
          title="Generate new problem"
        >
          🔄
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Please solve the simple math problem above
        {answer && isCorrect && (
          <span className="text-green-600 ml-2">✓ Correct!</span>
        )}
        {answer && !isCorrect && answer !== "" && (
          <span className="text-red-600 ml-2">✗ Try again</span>
        )}
      </p>
    </div>
  );
}

