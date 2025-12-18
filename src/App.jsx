import { useState } from "react";
import InventoryPage from "./pages/InventoryPage";
import AuthContainer from "./components/AuthContainer";

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      {token ? (
        <InventoryPage token={token} onLogout={() => setToken(null)} />
      ) : (
        <AuthContainer onLogin={setToken} />
      )}
    </>
  );
}

export default App;
