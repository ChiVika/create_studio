import "./Button.scss";
function Button({ children, className}) {

  return (
    <>
      <button className={className}>{children}</button>
    </>
  )
}

export default Button