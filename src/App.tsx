import { data } from './testData.json'
import VariableConnectionsDiagram from './components/VariableConnectionsDiagram';
import { findVariableConnections } from './utils/connectionUtils'; // Import the findVariableConnections function

function App() {
  // Error handling in case data structure changes unexpectedly
  if (!data || !data.variables || !data.feedExports || !data.additionalSources || !data.campaignSettings) {
    return <div>Error: Invalid data structure</div>;
  }

  return (
    <VariableConnectionsDiagram connections={findVariableConnections(data)} />
  );
}

export default App;
