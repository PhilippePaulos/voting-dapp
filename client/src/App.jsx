import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from '@mui/material/';
import "./App.css";
import Voting from "./components/Voting";
import Navbar from "./components/Navbar/index"
import { theme } from './components/theme/theme.js';
import { EthProvider } from "./contexts/EthContext";
import VotingProvider from "./contexts/VotingContext/VotingProvider";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <EthProvider>
        <VotingProvider>
          <Navbar />
          <Voting/>
        </VotingProvider>
      </EthProvider>
    </ThemeProvider>
  );
}

export default App;
