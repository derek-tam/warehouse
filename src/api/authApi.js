import axios from "axios";

const AUTH_BASE = "http://localhost:8080/api/auth";

export const login = (username, password) =>
  axios.post(`${AUTH_BASE}/login`, { username, password });

export const signup = (username, password, role) =>
  axios.post(`${AUTH_BASE}/signup`, { username, password, role });

export const forgotPassword = (username) =>
  axios.post(`${AUTH_BASE}/forgot-password`, { username });
