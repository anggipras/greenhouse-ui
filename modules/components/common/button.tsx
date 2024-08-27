import clsx from "clsx";
import React from "react";

export type ButtonProps = {
  variant?: "PRIMARY" | "SECONDARY";
  size?: "small" | "medium" | "large";
  width?: "w-fit" | "w-full";
  typebtn?: "button" | "event";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  variant = "PRIMARY",
  size = "medium",
  width = "w-fit",
  typebtn = "button",
  ...props
}: ButtonProps) => {
  const variantClassname = clsx({
    "btn-primary": variant === "PRIMARY",
    "btn-secondary": variant === "SECONDARY",
  });

  const sizeClassname = clsx({
    "btn-large": size === "large",
    "btn-medium": size === "medium",
    "btn-small": size === "small",
  });

  const spacingClassname = clsx({
    "btn-spacing-large": size === "large",
    "btn-spacing-medium": size === "medium",
    "btn-spacing-small": size === "small",
  });
  return (
    <button
      {...props}
      className={clsx(
        "btn transition-colors",
        variantClassname,
        spacingClassname,
        sizeClassname,
        width,
        {
          "cursor-not-allowed": props.disabled,
        }
      )}
    >
      {children}
    </button>
  );
};

export default Button;
