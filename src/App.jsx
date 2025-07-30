import Neurobase from "./components/Neurobase";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import ErrorBoundary from "./services/ErrorBoundary";
import NotificationSystem from "./components/NotificationSystem";
import { POSITION_CONFIG } from "./constants/buttons";

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider>
          <NotificationSystem />
          <Neurobase 
            {...POSITION_CONFIG}
            showMenuButton={true}
            showBackButton={true} 
            showModeButton={true}
          />
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;