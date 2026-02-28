"use client";
import { ReactNode } from "react";

interface ButtonProps {
  variant: "primary" | "outlined";
  className?: string;
  onClick: () => void;
  size: "lg" | "sm";
  children: ReactNode;
}

export const Button = ({ variant, className, onClick, size, children }: ButtonProps) => {
  return (
    <button
      className={`${className} ${variant === "primary" ? "bg-blue-400" : "bg-gray-500"}      ${size === "lg" ? "px-6 py-3" : "px-4 py-2"}`}
      onClick={() => onClick}
    >
      {children}
    </button>
  );
};
