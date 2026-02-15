import { createContext, useState, useEffect } from "react";
import { getInventory } from "../api/inventoryApi";

export const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const [inventory, setInventory] = useState([]);

  const fetchInventory = () => {
    getInventory()
      .then(res => setInventory([...res.data]))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <InventoryContext.Provider value={{ inventory, setInventory, fetchInventory }}>
      {children}
    </InventoryContext.Provider>
  );
}
