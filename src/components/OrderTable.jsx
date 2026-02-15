export default function OrderTable({ orders, onUpdateStatus }) {
  return (
    <table border={1} style={{ marginTop: "10px" }}>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>SKU</th>
          <th>Quantity</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((o) => (
          <tr key={o.id}>
            <td>{o.id}</td>
            <td>{o.customer}</td>
            <td>{o.sku}</td>
            <td>{o.quantity}</td>
            <td>{o.status}</td>
            <td>
              {o.status !== "SHIPPED" && (
                <button onClick={() => onUpdateStatus(o.id, "SHIPPED")}>Mark Shipped</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
