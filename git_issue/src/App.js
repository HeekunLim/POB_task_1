import { RouterProvider } from "react-router-dom";
import Router from "./router";
import React from "react";
import myStore from "./store";

function App() {
  const [gitIssue, setGitIssue] = React.useState([]);
  const [page, setPage] = React.useState(1);

  return (
    <div className="App">
      <myStore.Provider value={{ gitIssue, setGitIssue, page, setPage }}>
        <RouterProvider router={Router} />
      </myStore.Provider>
    </div>
  );
}

export default App;
