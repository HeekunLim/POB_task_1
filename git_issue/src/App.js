import { RouterProvider } from "react-router-dom";
import Router from './router';
import React from "react";
import myStore from "./store"

function App() {
  const [gitIssue, setGitIssue] = React.useState([]);
  
  return (
    <div className="App">
      <myStore.Provider value={{gitIssue, setGitIssue}}>
        <RouterProvider router={Router}/>
      </myStore.Provider>
    </div>
  );
}

export default App;
