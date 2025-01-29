import React from 'react';
import { Card, Text, Grid, Flex, Badge } from '@tremor/react';
import { RotateCw } from 'lucide-react';
import { useRoverStore } from '../../store/roverStore';
import { MotorStatus } from '../../types/rover';
import { formatNumber } from '../../utils/formatters';

const MotorStatusBadge: React.FC<{ status: MotorStatus }> = ({ status }) => {
    const statusConfig = {
        [MotorStatus.RUNNING]: { color: 'emerald' as const, text: 'Çalışıyor' },
        [MotorStatus.STOPPED]: { color: 'gray' as const, text: 'Durdu' },
        [MotorStatus.ERROR]: { color: 'red' as const, text: 'Hata' },
        [MotorStatus.IDLE]: { color: 'blue' as const, text: 'Boşta' },
    };

    const config = statusConfig[status];
    return <Badge color={config.color}>{config.text}</Badge>;
};

const MotorCard: React.FC<{
    name: string;
    speed: number;
    temperature: number;
    current: number;
    status: MotorStatus;
}> = ({ name, speed, temperature, current, status }) => (
    <Card decoration="top" decorationColor="indigo">
        <Flex alignItems="center" justifyContent="start" className="space-x-2">
            <RotateCw className="w-6 h-6 text-indigo-500" />
            <Text>{name}</Text>
        </Flex>
        <div className="mt-4 space-y-2">
            <Flex justifyContent="between">
                <Text className="text-sm">Hız</Text>
                <Text className="text-sm font-medium">{formatNumber(speed)} RPM</Text>
            </Flex>
            <Flex justifyContent="between">
                <Text className="text-sm">Sıcaklık</Text>
                <Text className="text-sm font-medium">{formatNumber(temperature)}°C</Text>
            </Flex>
            <Flex justifyContent="between">
                <Text className="text-sm">Akım</Text>
                <Text className="text-sm font-medium">{formatNumber(current)}A</Text>
            </Flex>
            <Flex justifyContent="between" className="mt-2">
                <Text className="text-sm">Durum</Text>
                <MotorStatusBadge status={status} />
            </Flex>
        </div>
    </Card>
);

export const MotorsCard: React.FC = () => {
    const motors = useRoverStore((state) => state.metrics.motors);

    return (
        <Card>
            <Text className="mb-4">Motor Durumları</Text>
            <Grid numItems={2} numItemsSm={2} numItemsLg={4} className="gap-4">
                <MotorCard name="Ön Sol" {...motors.frontLeft} />
                <MotorCard name="Ön Sağ" {...motors.frontRight} />
                <MotorCard name="Arka Sol" {...motors.rearLeft} />
                <MotorCard name="Arka Sağ" {...motors.rearRight} />
            </Grid>
        </Card>
    );
}; 