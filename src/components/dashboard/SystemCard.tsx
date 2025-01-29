import React from 'react';
import { Card, Text, Metric, ProgressBar, Grid, Flex } from '@tremor/react';
import { BatteryFull, Cpu, HardDrive, Clock } from 'lucide-react';
import { useRoverStore } from '../../store/roverStore';
import { formatNumber } from '../../utils/formatters';

export const SystemCard: React.FC = () => {
    const metrics = useRoverStore((state) => state.metrics);
    const { battery, system } = metrics;

    const formatUptime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}s ${minutes}d`;
    };

    return (
        <Card className="h-full">
            <Text className="mb-2">Sistem Durumu</Text>
            <Grid numItems={2} className="gap-4">
                <Card decoration="top" decorationColor="blue">
                    <Flex alignItems="center" justifyContent="start" className="space-x-2">
                        <BatteryFull className="w-6 h-6 text-blue-500" />
                        <Text>Batarya</Text>
                    </Flex>
                    <Metric className="mt-2">{formatNumber(battery.percentage)}%</Metric>
                    <ProgressBar value={battery.percentage} color="blue" className="mt-2" />
                    <Grid numItems={2} className="gap-2 mt-2">
                        <div>
                            <Text className="text-xs">Voltaj</Text>
                            <Text className="font-medium">{formatNumber(battery.voltage)}V</Text>
                        </div>
                        <div>
                            <Text className="text-xs">Akım</Text>
                            <Text className="font-medium">{formatNumber(battery.current)}A</Text>
                        </div>
                    </Grid>
                </Card>

                <Card decoration="top" decorationColor="green">
                    <Flex alignItems="center" justifyContent="start" className="space-x-2">
                        <Cpu className="w-6 h-6 text-green-500" />
                        <Text>İşlemci</Text>
                    </Flex>
                    <Metric className="mt-2">{system.cpuUsage}%</Metric>
                    <ProgressBar value={system.cpuUsage} color="green" className="mt-2" />
                </Card>

                <Card decoration="top" decorationColor="orange">
                    <Flex alignItems="center" justifyContent="start" className="space-x-2">
                        <HardDrive className="w-6 h-6 text-orange-500" />
                        <Text>Bellek</Text>
                    </Flex>
                    <Metric className="mt-2">{system.memoryUsage}%</Metric>
                    <ProgressBar value={system.memoryUsage} color="orange" className="mt-2" />
                </Card>

                <Card decoration="top" decorationColor="purple">
                    <Flex alignItems="center" justifyContent="start" className="space-x-2">
                        <Clock className="w-6 h-6 text-purple-500" />
                        <Text>Çalışma Süresi</Text>
                    </Flex>
                    <Metric className="mt-2">{formatUptime(system.uptime)}</Metric>
                    <Text className="mt-2 text-gray-500">
                        Son güncelleme: {new Date(system.lastUpdate).toLocaleTimeString()}
                    </Text>
                </Card>
            </Grid>
        </Card>
    );
}; 