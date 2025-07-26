import Neurobase from "./components/Neurobase";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  // Tùy chỉnh vị trí các component
  const customPositions = {
    // MenuButton: góc trên bên phải
    menuPosition: { top: '64px', right: '64px' },
    
    // BackButton: góc trên bên trái  
    backPosition: { top: '64px', left: '64px' },
    
    // ModeButton: góc dưới bên phải
    modePosition: { bottom: '64px', right: '64px' }
  };

  // Tùy chỉnh hiển thị các component
  const showComponents = {
    showMenuButton: true,
    showBackButton: true, 
    showModeButton: true
  };

  return (
    <ThemeProvider>
      <Neurobase 
        {...customPositions}
        {...showComponents}
      />
    </ThemeProvider>
  );
}

export default App;