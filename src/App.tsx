import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import BookmarkList from "./components/Bookmark";
import MovieList from "./components/Movie/List/";

function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/">main</Link>
          </li>
          <li>
            <Link to="/bookmark">bookmark</Link>
          </li>
        </ul>
        <MovieList />
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
