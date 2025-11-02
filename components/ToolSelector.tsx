
import React from 'react';

interface ToolSelectorProps {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

export const ToolSelector: React.FC<ToolSelectorProps> = ({ label, options, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
        >
            {options.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
);
