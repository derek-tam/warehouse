import axios from "axios";

const API_BASE = "http://localhost:8080/api/orders";

// get all orders
export const getOrders = () => axios.get(API_BASE);

// create a new order
export const createOrder = (sku, quantity, customer, status) =>
  axios.post(API_BASE, { sku, quantity, customer, status });

// update status of an order
export const updateOrderStatus = (id, status) =>
  axios.patch(`${API_BASE}/${id}/status`, null, { params: { status } });
