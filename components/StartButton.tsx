
import React from 'react';
import { PlayIcon, ArrowPathIcon } from './Icons';

interface StartButtonProps {
    isStarting: boolean;
    status: string;
    onClick: () => void;
}

export const StartButton: React.FC<StartButtonProps> = ({ isStarting, status, onClick }) => (
    <div className="flex flex-col items-center w-full max-w-sm">
        <button
            onClick={onClick}
            disabled={isStarting}
            className={`
                relative w-full text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300
                flex items-center justify-center text-xl
                ${isStarting 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105'}
            `}
        >
            {isStarting ? (
                <>
                    <ArrowPathIcon className="animate-spin mr-3" />
                    Processing...
                </>
            ) : (
                <>
                    <PlayIcon className="mr-3" />
                    Start
                </>
            )}
        </button>
        {isStarting && status && (
            <p className="mt-4 text-center text-cyan-300 h-6">{status}</p>
        )}
    </div>
);
