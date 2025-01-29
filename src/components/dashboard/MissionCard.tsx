import React from 'react';
import { Card, Text, Flex, ProgressBar, Badge, List, ListItem } from '@tremor/react';
import { Target, AlertCircle } from 'lucide-react';
import { useRoverStore } from '../../store/roverStore';
import { MissionStatus } from '../../types/rover';

const MissionStatusBadge: React.FC<{ status: MissionStatus }> = ({ status }) => {
    const statusConfig = {
        [MissionStatus.IDLE]: { color: 'gray' as const, text: 'Beklemede' },
        [MissionStatus.IN_PROGRESS]: { color: 'blue' as const, text: 'Devam Ediyor' },
        [MissionStatus.COMPLETED]: { color: 'emerald' as const, text: 'Tamamlandı' },
        [MissionStatus.FAILED]: { color: 'red' as const, text: 'Başarısız' },
        [MissionStatus.PAUSED]: { color: 'yellow' as const, text: 'Duraklatıldı' },
    };

    const config = statusConfig[status];
    return <Badge color={config.color}>{config.text}</Badge>;
};

export const MissionCard: React.FC = () => {
    const mission = useRoverStore((state) => state.metrics.mission);

    return (
        <Card>
            <Flex alignItems="center" className="space-x-2 mb-4">
                <Target className="w-6 h-6 text-blue-500" />
                <Text>Görev Durumu</Text>
                <div className="ml-auto">
                    <MissionStatusBadge status={mission.status} />
                </div>
            </Flex>

            <div className="space-y-6">
                <div>
                    <Flex justifyContent="between" className="mb-2">
                        <Text>Mevcut Görev</Text>
                        <Text className="font-medium">{mission.currentTask}</Text>
                    </Flex>
                    <ProgressBar value={mission.progress} color="blue" />
                    <Text className="text-sm text-gray-500 mt-1">
                        İlerleme: %{mission.progress}
                    </Text>
                </div>

                {mission.errors.length > 0 && (
                    <div>
                        <Flex alignItems="center" className="space-x-2 mb-2">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                            <Text>Hatalar</Text>
                        </Flex>
                        <List>
                            {mission.errors.map((error, index) => (
                                <ListItem key={index}>
                                    <Text className="text-sm text-red-500">{error}</Text>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                )}
            </div>
        </Card>
    );
}; 