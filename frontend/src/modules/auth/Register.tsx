import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "./authService";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre_empleado: "",
    ci: "",
    email: "",
    password: "",
    id_turno: 1,
    id_estado_civil: 1,
    id_nacionalidad: 1,
    id_estado: 1,
    id_tipo_contacto: 1,
    id_salario: 1,
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name.startsWith("id_") ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await register(form);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.mensaje || "Error al registrar usuario");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Registro</h1>
        <p className="text-muted">Crear nuevo usuario</p>

        {error && <div className="alert-error">{error}</div>}

        <label>Nombre empleado</label>
        <input name="nombre_empleado" value={form.nombre_empleado} onChange={handleChange} />

        <label>CI</label>
        <input name="ci" value={form.ci} onChange={handleChange} />

        <label>Email</label>
        <input name="email" value={form.email} onChange={handleChange} />

        <label>Contraseña</label>
        <input name="password" type="password" value={form.password} onChange={handleChange} />

        <button type="submit">Registrarse</button>

        <p className="text-muted">
          ¿Ya tienes cuenta? <Link to="/">Iniciar sesión</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;