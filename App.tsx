import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { FeatureCard } from './components/FeatureCard';
import { ToolSelector } from './components/ToolSelector';
import { Notification } from './components/Notification';
import { StartButton } from './components/StartButton';
import { EMULATORS, RESOLUTIONS } from './constants';
import { SettingsIcon, SparklesIcon, CpuChipIcon } from './components/Icons';

const App: React.FC = () => {
    const [selectedEmulator, setSelectedEmulator] = useState<string>(EMULATORS[0]);
    const [selectedResolution, setSelectedResolution] = useState<string>(RESOLUTIONS[0]);
    const [is120FpsEnabled, setIs120FpsEnabled] = useState<boolean>(false);
    const [is4kEnabled, setIs4kEnabled] = useState<boolean>(false);
    const [notification, setNotification] = useState<string | null>(null);
    const [isStarting, setIsStarting] = useState<boolean>(false);
    const [startStatus, setStartStatus] = useState<string>('');

    const showNotification = (message: string) => {
        setNotification(message);
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    const toggle120Fps = useCallback(() => {
        const newState = !is120FpsEnabled;
        setIs120FpsEnabled(newState);
        showNotification(`120 FPS ${newState ? 'Enabled' : 'Disabled'}`);
    }, [is120FpsEnabled]);

    const toggle4k = useCallback(() => {
        const newState = !is4kEnabled;
        setIs4kEnabled(newState);
        showNotification(`4K Resolution ${newState ? 'Enabled' : 'Disabled'}`);
    }, [is4kEnabled]);

    const handleStartBypass = useCallback(() => {
        setIsStarting(true);
        setStartStatus('Initializing bypass protocols...');

        const steps = [
            { status: 'Injecting anti-detection hooks...', delay: 2000 },
            { status: `Configuring for ${selectedEmulator}...`, delay: 1500 },
            { status: `Setting resolution to ${selectedResolution}...`, delay: 1000 },
            ...(is120FpsEnabled ? [{ status: 'Enabling 120 FPS mode...', delay: 1000 }] : []),
            ...(is4kEnabled ? [{ status: 'Activating 4K resolution textures...', delay: 1000 }] : []),
            { status: 'Masking as mobile device...', delay: 2000 },
            { status: 'Launching BGMI... Please wait.', delay: 2500 },
            { status: 'Bypass successful! Game is starting.', delay: 1500 },
        ];

        let promise = Promise.resolve();
        steps.forEach(step => {
            promise = promise.then(() => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        setStartStatus(step.status);
                        resolve();
                    }, step.delay);
                });
            });
        });

        promise.then(() => {
             // After all steps, reset the state
            setTimeout(() => {
                setIsStarting(false);
                setStartStatus('');
                showNotification('Game launched successfully!');
            }, 2000);
        });
    }, [selectedEmulator, selectedResolution, is120FpsEnabled, is4kEnabled]);


    return (
        <div className="min-h-screen bg-slate-900 text-gray-200 font-sans p-4 flex flex-col items-center">
            <div className="w-full max-w-4xl mx-auto">
                <Header />

                <main className="relative mt-8">
                    <div className="bg-slate-800/50 rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-700">
                        <section id="performance">
                            <h2 className="text-2xl font-bold text-cyan-400 mb-2 flex items-center">
                                <SparklesIcon />
                                High-Performance Settings
                            </h2>
                            <p className="text-slate-400 mb-6">Toggle high-performance features for the best experience.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FeatureCard 
                                    title="120 FPS" 
                                    description="Experience ultra-smooth gameplay." 
                                    onClick={toggle120Fps} 
                                    isActive={is120FpsEnabled}
                                />
                                <FeatureCard 
                                    title="4K Resolution" 
                                    description="Play in stunning ultra-HD clarity." 
                                    onClick={toggle4k} 
                                    isActive={is4kEnabled}
                                />
                            </div>
                        </section>

                        <div className="border-t border-slate-700 my-8"></div>

                        <section id="tools">
                            <h2 className="text-2xl font-bold text-cyan-400 mb-2 flex items-center">
                                <SettingsIcon />
                                Emulator Tools
                            </h2>
                            <p className="text-slate-400 mb-6">Select your emulator and desired resolution before starting.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ToolSelector
                                    label="Select Emulator"
                                    options={EMULATORS}
                                    value={selectedEmulator}
                                    onChange={setSelectedEmulator}
                                />
                                <ToolSelector
                                    label="Custom Resolution"
                                    options={RESOLUTIONS}
                                    value={selectedResolution}
                                    onChange={setSelectedResolution}
                                />
                            </div>
                        </section>

                        <div className="border-t border-slate-700 my-8"></div>

                        <section id="start" className="flex flex-col items-center justify-center">
                             <h2 className="text-2xl font-bold text-cyan-400 mb-2 flex items-center">
                                <CpuChipIcon />
                                Launch Sequence
                            </h2>
                             <p className="text-slate-400 mb-6 text-center max-w-md">Once your settings are configured, click Start to initiate the bypass and launch the game.</p>
                            <StartButton
                                isStarting={isStarting}
                                onClick={handleStartBypass}
                                status={startStatus}
                            />
                        </section>
                    </div>
                </main>
            </div>

            <Notification message={notification} />
        </div>
    );
};

export default App;