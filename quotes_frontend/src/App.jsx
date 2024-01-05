import { useState } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import Navbar from "./components/Header/Navbar/Navbar";
import AllRoutes from "./routes/AllRoutes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);      //to get different navbar for logged in user

  return (
    <>
      <Router>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <AllRoutes  isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}  />
      </Router>
    </>
  );
}

export default App;
