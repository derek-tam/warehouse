import { useState } from "react";
import InventoryPage from "./pages/InventoryPage";
import OrderPage from "./pages/OrderPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { InventoryProvider } from "./context/InventoryContext";

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwtToken"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [page, setPage] = useState("login"); // login | signup | forgot

  const handleLogin = (jwt, userRole) => {
    localStorage.setItem("jwtToken", jwt);
    localStorage.setItem("role", userRole);
    setToken(jwt);
    setRole(userRole);
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    setPage("login");
  };

  if (!token) {
    if (page === "signup") return <SignupPage onSwitch={setPage} />;
    if (page === "forgot") return <ForgotPasswordPage onSwitch={setPage} />;

    return <LoginPage onLogin={handleLogin} onSwitch={setPage} />;
  }

  return (
  <InventoryProvider>
    <div>
      <button onClick={handleLogout}>Logout</button>

      {role === "WAREHOUSE_STAFF" && (
        <>
          <InventoryPage token={token} />
          <OrderPage token={token} readOnly={true} />
        </>
      )}
      {role === "WAREHOUSE_MANAGER" && (
        <>
          <InventoryPage token={token} />
          <OrderPage token={token} readOnly={false} />
        </>
      )}
    </div>
  </InventoryProvider>
  );
}

export default App;
