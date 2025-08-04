import Neurobase from "./components/Neurobase";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import ErrorBoundary from "./services/ErrorBoundary";
import NotificationSystem from "./components/NotificationSystem";
import Cursor3D from "./components/Cursor3D";
import Cursor3DController from "./components/Cursor3DController";
import { POSITION_CONFIG } from "./constants/buttons";

function App() {
  // Check if we're on test page
  const isTestPage = window.location.pathname === '/test';
  
  if (isTestPage) {
    return (
      <ErrorBoundary>
        <LanguageProvider>
          <ThemeProvider>
            <Cursor3D />
            <Cursor3DController />
            <LogoTestPage />
          </ThemeProvider>
        </LanguageProvider>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider>
          <Cursor3D />
          <Cursor3DController />
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