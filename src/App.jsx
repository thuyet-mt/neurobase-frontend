import Neurobase from "./components/Neurobase";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./services/ErrorBoundary";
import NotificationSystem from "./components/NotificationSystem";
import { POSITION_CONFIG } from "./constants/buttons";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <NotificationSystem />
        <Neurobase 
          {...POSITION_CONFIG}
          showMenuButton={true}
          showBackButton={true} 
          showModeButton={true}
        />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;