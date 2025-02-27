"use client";

import { useState } from "react";

export default function Home() {
  const gridSize = 4;

  // Function to generate a fresh grid
  const generateGrid = () =>
    Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => false)
    );

  const [grid, setGrid] = useState(generateGrid());
  const [showingSolution, setShowingSolution] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Function to toggle a cell and its row & column
  const toggleCells = (row, col) => {
    setGrid((prevGrid) =>
      prevGrid.map((r, i) =>
        r.map((cell, j) => (i === row || j === col ? !cell : cell))
      )
    );
  };

  // Check if all cells are lit (game won)
  const isGameOver = grid.flat().every((cell) => cell === true);

  // Reset the game
  const resetGame = () => {
    setGrid(generateGrid());
    setShowingSolution(false);
    setCurrentStep(0);
  };

  // Predefined solution steps (best way to win)
  const solutionSteps = [
    [0, 2], [1, 1], [2, 0], [3, 3],
    [1, 3], [2, 2], [3, 1], [0, 0],
    [2, 3], [3, 0], [0, 1], [1, 2],
    [0, 3], [1, 0], [2, 1], [3, 2]
  ];

  // Function to animate the solution steps one by one
  const showSolution = async () => {
    resetGame();
    setShowingSolution(true);

    for (let i = 0; i < solutionSteps.length; i++) {
      setTimeout(() => {
        const [row, col] = solutionSteps[i];
        toggleCells(row, col);
        setCurrentStep(i + 1);
      }, i * 1500); // ⬅️ Slower step transition (1.5 seconds per step)
    }

    setTimeout(() => {
      setShowingSolution(false);
    }, solutionSteps.length * 1500 + 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <h1 className="text-4xl font-extrabold text-white mb-6 drop-shadow-lg">
        Light Up the Faces! 😆
      </h1>

      {isGameOver ? (
        <h2 className="text-3xl text-yellow-300 animate-bounce mb-4">
          🎉 You Made Everyone Happy! 🎉
        </h2>
      ) : (
        <div className="grid grid-cols-4 gap-3 p-4 bg-white rounded-xl shadow-lg relative">
          {grid.map((row, i) =>
            row.map((cell, j) => (
              <button
                key={`${i}-${j}`}
                onClick={() => !showingSolution && toggleCells(i, j)}
                className={`w-20 h-20 text-4xl rounded-full transition-all transform duration-300 ease-in-out relative
                            ${
                              cell
                                ? "bg-yellow-400 text-black scale-110 shadow-xl"
                                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                            }`}
              >
                {cell ? "😆" : "😐"}
                {showingSolution &&
                  currentStep < solutionSteps.length &&
                  solutionSteps[currentStep][0] === i &&
                  solutionSteps[currentStep][1] === j && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 flex items-center justify-center bg-red-600 text-white text-4xl font-bold rounded-full animate-ping">
                        ❌
                      </div>
                    </span>
                  )}
              </button>
            ))
          )}
        </div>
      )}

      {/* Buttons Section */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={resetGame}
          className="px-5 py-2 bg-red-500 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-red-700 transition-all"
        >
          🔄 Reset
        </button>

        <button
          onClick={showSolution}
          className="px-5 py-2 bg-green-500 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-green-700 transition-all"
          disabled={showingSolution}
        >
          🕵️ Show Solution
        </button>
      </div>
    </div>
  );
}
