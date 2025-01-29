import React from 'react';
import { Card, Text, Grid, Flex, BarList } from '@tremor/react';
import { Compass, Navigation } from 'lucide-react';
import { useRoverStore } from '../../store/roverStore';
import { Vector3D } from '../../types/rover';
import { formatNumber } from '../../utils/formatters';

const Vector3DDisplay: React.FC<{
    label: string;
    data: Vector3D;
    unit: string;
}> = ({ label, data, unit }) => {
    const items = [
        { name: 'X', value: Math.abs(data.x), color: data.x >= 0 ? 'emerald' : 'red' },
        { name: 'Y', value: Math.abs(data.y), color: data.y >= 0 ? 'emerald' : 'red' },
        { name: 'Z', value: Math.abs(data.z), color: data.z >= 0 ? 'emerald' : 'red' },
    ];

    return (
        <Card>
            <Text className="mb-2">{label}</Text>
            <BarList
                data={items}
                valueFormatter={(value: number) => `${formatNumber(value)}${unit}`}
                className="mt-2"
            />
        </Card>
    );
};

const GPSDisplay: React.FC<{
    latitude: number;
    longitude: number;
    altitude: number;
}> = ({ latitude, longitude, altitude }) => (
    <Card>
        <Flex alignItems="center" className="space-x-2 mb-4">
            <Navigation className="w-5 h-5 text-blue-500" />
            <Text>GPS Konumu</Text>
        </Flex>
        <div className="space-y-2">
            <Flex justifyContent="between">
                <Text className="text-sm">Enlem</Text>
                <Text className="font-medium">{formatNumber(latitude, 6)}°</Text>
            </Flex>
            <Flex justifyContent="between">
                <Text className="text-sm">Boylam</Text>
                <Text className="font-medium">{formatNumber(longitude, 6)}°</Text>
            </Flex>
            <Flex justifyContent="between">
                <Text className="text-sm">Yükseklik</Text>
                <Text className="font-medium">{formatNumber(altitude, 1)}m</Text>
            </Flex>
        </div>
    </Card>
);

export const NavigationCard: React.FC = () => {
    const { imu, gps } = useRoverStore((state) => state.metrics.sensors);

    return (
        <Card>
            <Flex alignItems="center" className="space-x-2 mb-4">
                <Compass className="w-6 h-6 text-indigo-500" />
                <Text>Navigasyon Verileri</Text>
            </Flex>
            <Grid numItems={1} numItemsLg={4} className="gap-4">
                <Vector3DDisplay
                    label="İvmeölçer"
                    data={imu.acceleration}
                    unit="m/s²"
                />
                <Vector3DDisplay
                    label="Jiroskop"
                    data={imu.gyroscope}
                    unit="°/s"
                />
                <Vector3DDisplay
                    label="Manyetometre"
                    data={imu.magnetometer}
                    unit="µT"
                />
                <GPSDisplay {...gps} />
            </Grid>
        </Card>
    );
}; 