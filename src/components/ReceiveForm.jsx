import { useState } from "react";
import { receiveGoods } from "../api/inventoryApi";

export default function ReceiveForm({ onUpdate }) {
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [qty, setQty] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await receiveGoods({ sku, name, quantity: qty });
    onUpdate(); // refresh table
    setSku(""); setName(""); setQty(0);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Receive Goods</h3>
      <input placeholder="SKU" value={sku} onChange={e => setSku(e.target.value)} required />
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input type="number" placeholder="Quantity" value={qty} onChange={e => setQty(e.target.value)} required />
      <button type="submit">Receive</button>
    </form>
  );
}
