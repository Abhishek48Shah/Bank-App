function Input({ id, type, style,label, ...props }) {
  return (
    <div className="flex gap-2 flex-col">
      <label htmlFor={id} className="text-gray-200">
        {label}
      </label>
      <input type={type} {...props} className={style} id={id} autoComplete="off" />
    </div>
  );
}

export default Input;
