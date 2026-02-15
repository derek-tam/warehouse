import { useState } from "react";
import { receiveGoods, shipGoods } from "../api/inventoryApi";

export default function InventoryForm({ onUpdate, token }) {
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleReceive = async () => {
    await receiveGoods({ sku, name, quantity }, token);
    onUpdate();
  };

  return (
    <div>
      <input placeholder="SKU" value={sku} onChange={(e) => setSku(e.target.value)} required/>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required/>
      <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required/>
      <button onClick={handleReceive}>Receive</button>
    </div>
  );
}
