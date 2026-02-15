import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getOrders, createOrder, updateOrderStatus } from "../api/orderApi";
import { useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";

export default function OrderPage({ token }) {
  const { fetchInventory } = useContext(InventoryContext);
  const [orders, setOrders] = useState([]);
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [customer, setCustomer] = useState("");
  const [status, setStatus] = useState("RECEIVED"); // default for manager
  const [role, setRole] = useState(null);

  // ✅ Decode role from JWT
  useEffect(() => {
    if (token) {
        const decoded = jwtDecode(token);
        setRole(decoded.role);   // MUST be WAREHOUSE_MANAGER or WAREHOUSE_STAFF
    }
  }, [token]);

  // Fetch orders
  const fetchOrders = () => {
    getOrders("RECEIVED")
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Manager: create order
  const handleCreateOrder = (e) => {
    e.preventDefault();

    if (!sku || !customer || quantity <= 0) {
      alert("Please fill all fields correctly.");
      return;
    }

    createOrder(sku, quantity, customer, status)
      .then(() => {
        fetchOrders();
        setSku("");
        setQuantity(1);
        setCustomer("");
        setStatus("RECEIVED"); // reset to default
      })
      .catch(err => {
        const msg = err.response?.data?.message || "Order creation failed";
        alert(msg);
        });
  };

  // Staff: ship order
  const handleUpdateStatus = (order, status) => {
    updateOrderStatus(order.id, status)
      .then(fetchOrders)
      .catch(err => console.error(err));

      // 🔹 Refresh inventory too
    console.log('-----status=' + status);
    if (status === "SHIPPED") {
        fetchInventory();  // make sure you pass fetchInventory from InventoryPage or use context
      }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Order Management</h2>

      {/* ✅ Manager only */}
      {role === "WAREHOUSE_MANAGER" && (
        <form onSubmit={handleCreateOrder} style={{ marginBottom: 20 }}>
          <input
            placeholder="SKU"
            value={sku}
            onChange={e => setSku(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            min={1}
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
          />
          <input
            placeholder="Customer"
            value={customer}
            onChange={e => setCustomer(e.target.value)}
          />
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="PENDING">Pending</option>
            <option value="RECEIVED">Ready for Shipping</option>
          </select>
          <button type="submit">Create Order</button>
        </form>
      )}

       <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.sku}</td>
              <td>{order.quantity}</td>
              <td>{order.customer}</td>
              <td>{order.status}</td>
              <td>
                {/* ✅ Staff only */}
                {role === "WAREHOUSE_STAFF" && order.status === "RECEIVED" && (
                    <button
                    type="button"
                    onClick={() => handleUpdateStatus(order, "SHIPPED")}
                    >
                    Ship Order
                    </button>
                )}
                
                {/* ✅ Manager only */}
                {role === "WAREHOUSE_MANAGER" && order.status === "PENDING" && (
                    <button
                    type="button"
                    onClick={() => handleUpdateStatus(order, "RECEIVED")}
                    >
                    Receive Order
                    </button>
                )}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
