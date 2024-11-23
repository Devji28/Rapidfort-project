import React from "react";

export const Input = ({ className, ...props }) => {
  return <input className={`border px-4 py-2 rounded ${className}`} {...props} />;
};
