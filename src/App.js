import "./App.css";
import "bulma/css/bulma.css";
import { Title } from "./components/Title";

function App() {
  return (
    <div className="container">
      <div className="app">
        <Title>Search Movies</Title>
        <br />
        <button className="button is-danger">Danger</button>
      </div>
    </div>
  );
}

export default App;
