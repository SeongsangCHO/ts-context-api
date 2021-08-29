import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import WatchedList from "./components/Watched";
import MovieList from "./components/Movie/List";
import { GlobalStyle } from "./styles/GlobalStyle";
import store from "./Store";
import { Provider } from "react-redux";

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
      <Provider store={store}>
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route path="/watched">
          <WatchedList />
        </Route>
      </Provider>
    </Router>
  );
}

export default App;
