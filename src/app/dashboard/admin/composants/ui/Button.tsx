"use client";
import React from "react";
import clsx from "clsx";

export default function Button({ children, className = "", ...props }: any) {
  return (
    <button
      {...props}
      className={clsx("px-3 py-1.5 inline-flex items-center gap-2 rounded-full text-sm font-medium shadow-sm", className)}
    >
      {children}
    </button>
  );
}
