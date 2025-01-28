function Button({ type, handelButton, style, name, children, ...props }) {
  const buttonProps = handelButton
    ? { onClick: handelButton, ...props }
    : props;

  const buttonStyle = `${style} ${
    props.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
  }`;

  return (
    <button type={type} className={buttonStyle} {...buttonProps}>
      {children ? children : name}
    </button>
  );
}

export default Button;
