"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "icon";
type ButtonSize = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-blue-500 hover:bg-blue-600 text-white",
  secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700",
  ghost: "bg-white hover:bg-gray-100 text-gray-800 shadow-md",
  icon: "text-white/80 hover:text-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "py-1 px-2 text-xs",
  md: "py-2 px-4 text-sm font-medium",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "rounded-lg transition-colors";
  const widthStyles = fullWidth ? "flex-1" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
