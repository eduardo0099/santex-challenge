import './input.scss';

const Input = ({className, children, ...props}) => (
  <input className={`custom-input ${className || ""}`} {...props}>{children}</input>
);

export default Input;
