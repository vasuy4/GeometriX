import './App.css';
import BabylonCanvas from './Babylon/BabylonCanvas/BabylonCanvas';
import Header from "./components/Header";
import Shapes from "./components/Shapes/Shapes";

function App() {
  return (
    <div className="App">
      <Header />
      <Shapes />
      <BabylonCanvas />
    </div>
  );
}

export default App;
