import './contentWrapper.scss';

const ContentWrapper = ({type, className, children, ...props}) => (
  <span className={`content-wrapper ${className || ""}`} {...props}>{children}</span>
);

export default ContentWrapper;