import { useState } from "react";
import { shipGoods } from "../api/inventoryApi";

export default function ShipForm({ onUpdate }) {
  const [sku, setSku] = useState("");
  const [qty, setQty] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await shipGoods({ sku, quantity: qty });
      onUpdate(); // refresh table
      setSku(""); setQty(0);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Ship Goods</h3>
      <input placeholder="SKU" value={sku} onChange={e => setSku(e.target.value)} required />
      <input type="number" placeholder="Quantity" value={qty} onChange={e => setQty(e.target.value)} required />
      <button type="submit">Ship</button>
    </form>
  );
}
