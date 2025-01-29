import React from 'react';
import { socketService } from '../../services/socketService';
import { useRoverStore } from '../../store/roverStore';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isConnected, setIsConnected] = React.useState(false);
    const metrics = useRoverStore((state) => state.metrics);

    React.useEffect(() => {
        socketService.connect();
        const checkConnection = setInterval(() => {
            setIsConnected(socketService.isConnected());
        }, 1000);

        return () => {
            clearInterval(checkConnection);
            socketService.disconnect();
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        ERC Rover Dashboard
                    </h1>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <div
                                className={`w-3 h-3 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'
                                    }`}
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                {isConnected ? 'Bağlı' : 'Bağlantı Yok'}
                            </span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                            Son Güncelleme: {new Date(metrics.system.lastUpdate).toLocaleTimeString()}
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-4 sm:px-0">{children}</div>
            </main>

            <footer className="bg-white dark:bg-gray-800 shadow mt-auto">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                        ERC Rover Dashboard &copy; {new Date().getFullYear()}
                    </div>
                </div>
            </footer>
        </div>
    );
}; 