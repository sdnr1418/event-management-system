import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, clearAuthError } from "../store/authSlice";
import FormInput from "../components/FormInput";
import "./Auth.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const authError = useSelector((state) => state.auth.error);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) navigate("/events");
  }, [currentUser, navigate]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    dispatch(
      loginUser({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      })
    );
  }

  return (
    <div className="auth-card">
      <h2>Log in</h2>
      {authError && <p className="auth-error">{authError}</p>}

      <form onSubmit={handleSubmit} noValidate>
        <FormInput label="Email" name="email" type="email" value={form.email}
          onChange={handleChange} error={errors.email} />
        <FormInput label="Password" name="password" type="password"
          value={form.password} onChange={handleChange} error={errors.password} />
        <button type="submit" className="btn-primary">Log in</button>
      </form>

      <p className="auth-switch">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;