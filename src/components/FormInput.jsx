function FormInput({ label, name, type = "text", value, onChange, error }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={error ? "input-error" : ""}
      />
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}
export default FormInput;