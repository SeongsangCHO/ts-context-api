import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import BookmarkList from "./components/Bookmark";
import MovieList from "./components/Movie/List";
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
            <Link to="/bookmark">bookmark</Link>
          </li>
        </ul>
      </div>
      <Route path="/" exact>
        <MovieList />
      </Route>
      <Route path="/bookmark">
        <BookmarkList />
      </Route>
    </Router>
  );
}

export default App;
