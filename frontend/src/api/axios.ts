import axios from "axios";

const api = axios.create({
  baseURL: "https://cafeteria-backend-aes1.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const usuario = localStorage.getItem("usuario");

  if (usuario) {
    const data = JSON.parse(usuario);

    config.headers["X-Login-Id"] = data.id_login;
    config.headers["X-Empleado-Id"] = data.id_empleado;
  }

  return config;
});

export default api;