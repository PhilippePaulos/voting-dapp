import Intro from "./components/Intro";
import Voting from "./components/Voting";
import { EthProvider } from "./contexts/EthContext";
import "./App.css";
import VotingProvider from "./contexts/VotingContext/VotingProvider";

function App() {
  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          {/* <Intro /> */}
          <VotingProvider>
            <Voting />
          </VotingProvider>
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
