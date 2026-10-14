import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, clearAuthError } from "../store/authSlice";
import FormInput from "../components/FormInput";
import "./Auth.css";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const authError = useSelector((state) => state.auth.error);

  // clear any old error when the page opens
  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  // once registered (auto-logged in), go to events
  useEffect(() => {
    if (currentUser) navigate("/events");
  }, [currentUser, navigate]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const newErrors = {};
    if (form.name.trim().length < 2)
      newErrors.name = "Name must be at least 2 characters";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Enter a valid email address";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    dispatch(
      registerUser({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      })
    );
  }

  return (
    <div className="auth-card">
      <h2>Create an account</h2>
      {authError && <p className="auth-error">{authError}</p>}

      <form onSubmit={handleSubmit} noValidate>
        <FormInput label="Name" name="name" value={form.name}
          onChange={handleChange} error={errors.name} />
        <FormInput label="Email" name="email" type="email" value={form.email}
          onChange={handleChange} error={errors.email} />
        <FormInput label="Password" name="password" type="password"
          value={form.password} onChange={handleChange} error={errors.password} />
        <FormInput label="Confirm Password" name="confirmPassword" type="password"
          value={form.confirmPassword} onChange={handleChange}
          error={errors.confirmPassword} />
        <button type="submit" className="btn-primary">Register</button>
      </form>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default Register;