import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "./authService";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login({ email, password });
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.mensaje || "Error al iniciar sesión");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Sistema Web Cafetería</h1>
        <p className="text-muted">Iniciar sesión</p>

        {error && <div className="alert-error">{error}</div>}

        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Ingresar</button>

        <p className="text-muted">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;