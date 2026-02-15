import InventoryTable from "../components/InventoryTable";
import InventoryForm from "../components/InventoryForm";
import { useContext, useEffect } from "react";
import { InventoryContext } from "../context/InventoryContext";

export default function InventoryPage({ token }) {
  const { inventory, fetchInventory } = useContext(InventoryContext);

  useEffect(() => {
    fetchInventory(token); // initial fetch
  }, [fetchInventory, token]);

  return (
    <div>
      <h2>Inventory</h2>
      {/* InventoryForm triggers context fetchInventory on update */}
      <InventoryForm onUpdate={fetchInventory} token={token} />
      {/* Table directly reads from context */}
      <InventoryTable items={inventory} />
    </div>
  );
}
