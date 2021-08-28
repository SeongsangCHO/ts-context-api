import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import WatchedList from "./components/Watched";
import MovieList from "./components/Movie/List";
import MovieStore from "./store/Movie";
import { GlobalStyle } from "./styles/GlobalStyle";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <div className="App">
        <ul>
          <li>
            <Link to="/">main</Link>
          </li>
          <li>
            <Link to="/watched">watched</Link>
          </li>
        </ul>
      </div>
      <MovieStore>
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route path="/watched">
          <WatchedList />
        </Route>
      </MovieStore>
    </Router>
  );
}

export default App;
