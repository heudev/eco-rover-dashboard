import React from 'react';
import { Card, Text, Grid, Flex, AreaChart } from '@tremor/react';
import { Thermometer, Droplets, Gauge, Mountain } from 'lucide-react';
import { useRoverStore } from '../../store/roverStore';
import { formatNumber } from '../../utils/formatters';

const SensorValue: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: number;
    unit: string;
    bgColor: string;
}> = ({ icon, label, value, unit, bgColor }) => (
    <Flex alignItems="center" justifyContent="between" className={`space-x-2 p-3 rounded-lg ${bgColor} transition-all duration-200 hover:opacity-90`}>
        <Flex alignItems="center" className="space-x-2">
            {icon}
            <Text className="text-white font-medium">{label}</Text>
        </Flex>
        <Text className="font-bold text-white">
            {formatNumber(value)}
            {unit}
        </Text>
    </Flex>
);

export const SensorsCard: React.FC = () => {
    const sensors = useRoverStore((state) => state.metrics.sensors);
    const [sensorHistory, setSensorHistory] = React.useState<
        Array<{
            time: string;
            temperature: number;
            humidity: number;
            pressure: number;
        }>
    >([]);

    // Sensör verilerinin geçmişini tutma
    React.useEffect(() => {
        setSensorHistory((prev) => {
            const newData = {
                time: new Date().toLocaleTimeString(),
                temperature: sensors.temperature,
                humidity: sensors.humidity,
                pressure: sensors.pressure,
            };

            const updatedHistory = [...prev, newData];
            if (updatedHistory.length > 20) {
                updatedHistory.shift();
            }
            return updatedHistory;
        });
    }, [sensors]);

    return (
        <Card className="shadow-lg">
            <Text className="mb-4 text-lg font-semibold">Sensör Verileri</Text>
            <Grid numItems={1} numItemsLg={2} className="gap-6">
                <div className="space-y-4">
                    <SensorValue
                        icon={<Thermometer className="w-5 h-5 text-white" />}
                        label="Sıcaklık"
                        value={sensors.temperature}
                        unit="°C"
                        bgColor="bg-gradient-to-r from-orange-500 to-red-600"
                    />
                    <SensorValue
                        icon={<Droplets className="w-5 h-5 text-white" />}
                        label="Nem"
                        value={sensors.humidity}
                        unit="%"
                        bgColor="bg-gradient-to-r from-blue-400 to-blue-600"
                    />
                    <SensorValue
                        icon={<Gauge className="w-5 h-5 text-white" />}
                        label="Basınç"
                        value={sensors.pressure}
                        unit="hPa"
                        bgColor="bg-gradient-to-r from-emerald-400 to-emerald-600"
                    />
                    <SensorValue
                        icon={<Mountain className="w-5 h-5 text-white" />}
                        label="Yükseklik"
                        value={sensors.altitude}
                        unit="m"
                        bgColor="bg-gradient-to-r from-violet-500 to-purple-600"
                    />
                </div>

                <Card className="shadow-md">
                    <Text className="mb-2 font-medium">Sensör Grafiği</Text>
                    <AreaChart
                        className="h-48 mt-4 text-gray-600 font-medium bg-gray-100"
                        data={sensorHistory}
                        index="time"
                        categories={['temperature', 'humidity', 'pressure']}
                        colors={['orange', 'blue', 'emerald']}
                        valueFormatter={(value) => formatNumber(value)}
                        showLegend={true}
                        showGridLines={false}
                        curveType="natural"
                        yAxisWidth={90}
                    />
                </Card>
            </Grid>
        </Card>
    );
}; 