import React from 'react';
import { Grid } from '@tremor/react';
import { SystemCard } from './SystemCard';
import { MotorsCard } from './MotorsCard';
import { SensorsCard } from './SensorsCard';
import { NavigationCard } from './NavigationCard';
import { MissionCard } from './MissionCard';

export const Dashboard: React.FC = () => {
    return (
        <div className="space-y-6">
            <Grid numItems={1} numItemsLg={2} className="gap-6">
                <SystemCard />
                <MissionCard />
            </Grid>
            <MotorsCard />
            <NavigationCard />
            <SensorsCard />
        </div>
    );
}; 