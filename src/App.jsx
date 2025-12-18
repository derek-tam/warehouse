import { useEffect, useState } from "react";
import InventoryPage from "./pages/InventoryPage"; 
import LoginPage from "./pages/LoginPage";

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwtToken") || null);

  const handleLogin = (jwt) => {
    console.log('-----handleLogin: ' + jwt);
    localStorage.setItem("jwtToken", jwt);
    setToken(jwt);
  };

   const handleLogout = () => {
    setToken(null); // reset state to show login page
  };

  return (
    <div>
      {token ? (
        <InventoryPage token={token} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
