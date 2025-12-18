import React from "react";

export default function InventoryTable({ items }) {
  return (
    <table border="1" cellPadding="8" cellSpacing="0">
      <thead>
        <tr>
          <th>ID</th>
          <th>SKU</th>
          <th>Name</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id} style={{ backgroundColor: item.quantity < 5 ? "#fdd" : "white" }}>
            <td>{item.id}</td>
            <td>{item.sku}</td>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
