export interface RoverMetrics {
    // Temel metrikler
    battery: {
        percentage: number;
        voltage: number;
        current: number;
        temperature: number;
    };

    // Motor durumları
    motors: {
        frontLeft: MotorMetrics;
        frontRight: MotorMetrics;
        rearLeft: MotorMetrics;
        rearRight: MotorMetrics;
    };

    // Sensör verileri
    sensors: {
        temperature: number;
        humidity: number;
        pressure: number;
        altitude: number;
        gps: {
            latitude: number;
            longitude: number;
            altitude: number;
        };
        imu: {
            acceleration: Vector3D;
            gyroscope: Vector3D;
            magnetometer: Vector3D;
        };
    };

    // Sistem durumu
    system: {
        cpuUsage: number;
        memoryUsage: number;
        diskUsage: number;
        uptime: number;
        lastUpdate: string;
    };

    // Kamera durumu
    camera: {
        isActive: boolean;
        fps: number;
        resolution: string;
    };

    // Görev durumu
    mission: {
        status: MissionStatus;
        currentTask: string;
        progress: number;
        errors: string[];
    };
}

export interface MotorMetrics {
    speed: number;
    temperature: number;
    current: number;
    position: number;
    status: MotorStatus;
}

export interface Vector3D {
    x: number;
    y: number;
    z: number;
}

export enum MotorStatus {
    RUNNING = 'RUNNING',
    STOPPED = 'STOPPED',
    ERROR = 'ERROR',
    IDLE = 'IDLE'
}

export enum MissionStatus {
    IDLE = 'IDLE',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    PAUSED = 'PAUSED'
} 