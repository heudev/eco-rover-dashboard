import { useRoverStore } from '../store/roverStore';
import { MotorStatus, MissionStatus, RoverMetrics } from '../types/rover';

class SimulationService {
    private static instance: SimulationService;
    private interval: NodeJS.Timer | null = null;
    private missionPhases = [
        'Başlangıç Kontrolleri',
        'Navigasyon Kalibrasyonu',
        'Hedef Bölgeye İlerleme',
        'Örnek Toplama',
        'Analiz',
        'Üsse Dönüş'
    ];
    private currentPhase = 0;
    private missionProgress = 0;

    private constructor() { }

    public static getInstance(): SimulationService {
        if (!SimulationService.instance) {
            SimulationService.instance = new SimulationService();
        }
        return SimulationService.instance;
    }

    private generateRandomValue(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    private generateMotorMetrics() {
        return {
            speed: this.generateRandomValue(0, 100),
            temperature: this.generateRandomValue(30, 70),
            current: this.generateRandomValue(0, 15),
            position: this.generateRandomValue(0, 360),
            status: Math.random() > 0.9 ? MotorStatus.ERROR : MotorStatus.RUNNING,
        };
    }

    private updateMissionStatus() {
        this.missionProgress += 0.5;
        if (this.missionProgress >= 100) {
            this.missionProgress = 0;
            this.currentPhase = (this.currentPhase + 1) % this.missionPhases.length;
        }
    }

    private generateDummyData(): Partial<RoverMetrics> {
        this.updateMissionStatus();

        return {
            battery: {
                percentage: this.generateRandomValue(60, 100),
                voltage: this.generateRandomValue(11, 12.6),
                current: this.generateRandomValue(0, 20),
                temperature: this.generateRandomValue(20, 40),
            },
            motors: {
                frontLeft: this.generateMotorMetrics(),
                frontRight: this.generateMotorMetrics(),
                rearLeft: this.generateMotorMetrics(),
                rearRight: this.generateMotorMetrics(),
            },
            sensors: {
                temperature: this.generateRandomValue(15, 35),
                humidity: this.generateRandomValue(30, 70),
                pressure: this.generateRandomValue(980, 1020),
                altitude: this.generateRandomValue(0, 100),
                gps: {
                    latitude: this.generateRandomValue(41.0, 41.1),
                    longitude: this.generateRandomValue(28.9, 29.0),
                    altitude: this.generateRandomValue(50, 150),
                },
                imu: {
                    acceleration: {
                        x: this.generateRandomValue(-2, 2),
                        y: this.generateRandomValue(-2, 2),
                        z: this.generateRandomValue(-2, 2),
                    },
                    gyroscope: {
                        x: this.generateRandomValue(-180, 180),
                        y: this.generateRandomValue(-180, 180),
                        z: this.generateRandomValue(-180, 180),
                    },
                    magnetometer: {
                        x: this.generateRandomValue(-50, 50),
                        y: this.generateRandomValue(-50, 50),
                        z: this.generateRandomValue(-50, 50),
                    },
                },
            },
            system: {
                cpuUsage: this.generateRandomValue(20, 80),
                memoryUsage: this.generateRandomValue(30, 70),
                diskUsage: this.generateRandomValue(40, 60),
                uptime: Math.floor(Date.now() / 1000),
                lastUpdate: new Date().toISOString(),
            },
            camera: {
                isActive: Math.random() > 0.1,
                fps: Math.floor(this.generateRandomValue(24, 30)),
                resolution: '1280x720',
            },
            mission: {
                status: MissionStatus.IN_PROGRESS,
                currentTask: this.missionPhases[this.currentPhase],
                progress: this.missionProgress,
                errors: Math.random() > 0.9 ? ['Yüksek motor sıcaklığı tespit edildi'] : [],
            },
        };
    }

    public startSimulation(updateInterval: number = 1000): void {
        if (this.interval) return;

        this.interval = setInterval(() => {
            const dummyData = this.generateDummyData();
            useRoverStore.getState().updateMetrics(dummyData);
        }, updateInterval);
    }

    public stopSimulation(): void {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

export const simulationService = SimulationService.getInstance(); 