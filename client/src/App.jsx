import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from '@mui/material/';
import "./App.css";
import Voting from "./components/Voting";
import Navbar from "./components/Voting/Navbar";
import { theme } from './components/Voting/theme';
import { EthProvider } from "./contexts/EthContext";
import VotingProvider from "./contexts/VotingContext/VotingProvider";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <EthProvider>
        <Navbar />
        <VotingProvider>
          <Voting/>
        </VotingProvider>
      </EthProvider>
    </ThemeProvider>
  );
}

export default App;
