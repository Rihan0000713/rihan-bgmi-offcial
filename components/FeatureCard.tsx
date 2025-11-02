
import React from 'react';

interface FeatureCardProps {
    title: string;
    description: string;
    onClick: () => void;
    isActive: boolean;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, onClick, isActive }) => (
    <div
        onClick={onClick}
        className={`group relative p-6 rounded-lg cursor-pointer transition-all duration-300 shadow-lg border ${
            isActive
                ? 'bg-cyan-900/50 border-cyan-500 shadow-cyan-500/30'
                : 'bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-cyan-500'
        }`}
    >
        {isActive && (
            <div className="absolute top-3 right-3 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_8px_theme(colors.cyan.400)]"></div>
        )}
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{title}</h3>
        <p className="text-slate-400 mt-1">{description}</p>
    </div>
);
