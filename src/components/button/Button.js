import './button.scss';

export const BTN_TYPE = {
  PRIMARY: 'btn-primary',
  SECONDARY: 'btn-secondary',
};

export const Button = ({type, className, children, ...props}) => (
  <button className={`${type ? BTN_TYPE[type] : BTN_TYPE.PRIMARY } ${className || ""} `} {...props}>{children}</button>
);