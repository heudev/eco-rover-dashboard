import React from 'react';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './components/dashboard/Dashboard';
import { simulationService } from './services/simulationService';

function App() {
  React.useEffect(() => {
    // Simülasyonu başlat
    simulationService.startSimulation();

    return () => {
      // Component unmount olduğunda simülasyonu durdur
      simulationService.stopSimulation();
    };
  }, []);

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
}

export default App;
