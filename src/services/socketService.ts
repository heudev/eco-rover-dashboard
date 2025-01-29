import { io, Socket } from 'socket.io-client';
import { useRoverStore } from '../store/roverStore';
import { RoverMetrics } from '../types/rover';

class SocketService {
    private static instance: SocketService;
    private socket: Socket | null = null;
    private readonly serverUrl: string;

    private constructor() {
        // Electron uygulaması için localhost'ta çalışan backend sunucusuna bağlan
        this.serverUrl = 'http://localhost:3000';
    }

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    public connect(): void {
        if (this.socket) return;

        this.socket = io(this.serverUrl);

        this.socket.on('connect', () => {
            console.log('Socket.IO bağlantısı başarılı');
        });

        this.socket.on('disconnect', () => {
            console.log('Socket.IO bağlantısı kesildi');
        });

        this.socket.on('roverMetrics', (metrics: Partial<RoverMetrics>) => {
            useRoverStore.getState().updateMetrics(metrics);
        });

        this.socket.on('error', (error: Error) => {
            console.error('Socket.IO hatası:', error);
        });
    }

    public disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    public isConnected(): boolean {
        return this.socket?.connected ?? false;
    }

    // Rover'a komut göndermek için metod
    public sendCommand(command: string, payload?: any): void {
        if (this.socket?.connected) {
            this.socket.emit('roverCommand', { command, payload });
        } else {
            console.error('Socket bağlantısı yok - komut gönderilemedi');
        }
    }
}

export const socketService = SocketService.getInstance(); 