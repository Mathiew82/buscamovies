import 'bulma/css/bulma.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import PopularContainer from './pages/Popular/container/PopularContainer';
import Favorites from './pages/Favorites/Favorites';

function App() {
  return (
    <div className="container">
      <div className="app">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pelicula/:id" element={<MovieDetail />} />
            <Route path="/populares" element={<PopularContainer />} />
            <Route path="/favoritos" element={<Favorites />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
