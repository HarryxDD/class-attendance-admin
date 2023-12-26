import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import classNames from "classnames";

function Button({
  to,
  href,
  primary = false,
  outline = false,
  small = false,
  large = false,
  text = false,
  disabled = false,
  rounded = false,
  leftIcon,
  rightIcon,
  children,
  className,
  onClick,
  ...passProps
}) {
  let Comp = "button";
  const props = {
    onClick,
    ...passProps,
  };
  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }
  const classes = classNames(
    "px-4 py-2 font-semibold rounded-md shadow-sm text-white transition-colors duration-300 ease-in-out cursor-pointer",
    {
      "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2":
        primary,
      "bg-white border-2 border-black text-black shadow-lg hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2":
        outline,
      "bg-white hover:bg-blue-100 text-blue-900 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2":
        text,
      "bg-blue-300 text-white opacity-50 cursor-not-allowed": disabled,
      "text-sm": small,
      "text-lg": large,
      "rounded-full": rounded,
      [className]: className,
    }
  );
  if (disabled) {
    delete props.onClick;
  }

  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </Comp>
  );
}

export default Button;
