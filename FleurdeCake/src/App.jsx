import React from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import Routing from './routes/routing'

function App() {

  return (
    <Router>
      <Routing />
    </Router>
  );
}

export default App;