import { useEffect, useState } from "react";
import { getInventory } from "../api/inventoryApi";
import InventoryTable from "../components/InventoryTable";
import ReceiveForm from "../components/ReceiveForm";
import ShipForm from "../components/ShipForm";

function InventoryPage({ token, onLogout }) {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");

  const refreshInventory = () => {
    getInventory()
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    refreshInventory();
  }, []);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase()) ||
    item.sku.toLowerCase().includes(filter.toLowerCase())
  );

  const totalQuantity = filteredItems.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <button onClick={onLogout} style={{ marginBottom: "10px" }}>
        Logout
      </button>
      <h2>Warehouse Inventory (Live)</h2>

      <ReceiveForm onUpdate={refreshInventory} />
      <ShipForm onUpdate={refreshInventory} />

      <input
        type="text"
        placeholder="Search SKU or Name"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />

      <div>
        <strong>Total items:</strong> {filteredItems.length} |
        <strong> Total stock:</strong> {totalQuantity}
      </div>

      <InventoryTable items={filteredItems} />
    </div>
  );
}

export default InventoryPage;
