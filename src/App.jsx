import Neurobase from "./components/Neurobase";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Neurobase />
    </ThemeProvider>
  );
}

export default App;