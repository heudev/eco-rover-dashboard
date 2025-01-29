import { create } from 'zustand';
import { RoverMetrics, MissionStatus, MotorStatus } from '../types/rover';

interface RoverStore {
    metrics: RoverMetrics;
    updateMetrics: (newMetrics: Partial<RoverMetrics>) => void;
    resetMetrics: () => void;
}

const initialMetrics: RoverMetrics = {
    battery: {
        percentage: 0,
        voltage: 0,
        current: 0,
        temperature: 0,
    },
    motors: {
        frontLeft: {
            speed: 0,
            temperature: 0,
            current: 0,
            position: 0,
            status: MotorStatus.IDLE,
        },
        frontRight: {
            speed: 0,
            temperature: 0,
            current: 0,
            position: 0,
            status: MotorStatus.IDLE,
        },
        rearLeft: {
            speed: 0,
            temperature: 0,
            current: 0,
            position: 0,
            status: MotorStatus.IDLE,
        },
        rearRight: {
            speed: 0,
            temperature: 0,
            current: 0,
            position: 0,
            status: MotorStatus.IDLE,
        },
    },
    sensors: {
        temperature: 0,
        humidity: 0,
        pressure: 0,
        altitude: 0,
        gps: {
            latitude: 0,
            longitude: 0,
            altitude: 0,
        },
        imu: {
            acceleration: { x: 0, y: 0, z: 0 },
            gyroscope: { x: 0, y: 0, z: 0 },
            magnetometer: { x: 0, y: 0, z: 0 },
        },
    },
    system: {
        cpuUsage: 0,
        memoryUsage: 0,
        diskUsage: 0,
        uptime: 0,
        lastUpdate: new Date().toISOString(),
    },
    camera: {
        isActive: false,
        fps: 0,
        resolution: '640x480',
    },
    mission: {
        status: MissionStatus.IDLE,
        currentTask: '',
        progress: 0,
        errors: [],
    },
};

export const useRoverStore = create<RoverStore>((set) => ({
    metrics: initialMetrics,
    updateMetrics: (newMetrics) =>
        set((state) => ({
            metrics: {
                ...state.metrics,
                ...newMetrics,
                system: {
                    ...state.metrics.system,
                    lastUpdate: new Date().toISOString(),
                },
            },
        })),
    resetMetrics: () => set({ metrics: initialMetrics }),
})); 