
import React from 'react';

interface NotificationProps {
    message: string | null;
}

export const Notification: React.FC<NotificationProps> = ({ message }) => {
    if (!message) return null;

    return (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg animate-fade-in-out">
            {message}
        </div>
    );
};

// Add this to your index.html <style> tag or a CSS file if you prefer
/*
@keyframes fade-in-out {
  0% { opacity: 0; transform: translateY(20px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(20px); }
}
.animate-fade-in-out {
  animation: fade-in-out 3s ease-in-out forwards;
}
*/

// For simplicity with Tailwind CDN, let's inject it.
const style = document.createElement('style');
style.textContent = `
@keyframes fade-in-out {
  0% { opacity: 0; transform: translateY(20px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(20px); }
}
.animate-fade-in-out {
  animation: fade-in-out 3s ease-in-out forwards;
}
`;
document.head.appendChild(style);
