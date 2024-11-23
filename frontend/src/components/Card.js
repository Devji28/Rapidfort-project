import React from "react";

export const Card = ({ children, className, ...props }) => {
  return (
    <div className={`bg-white shadow-md rounded p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};
