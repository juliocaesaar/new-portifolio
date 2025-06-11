import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function SectionHeading({ children, className, ...props }: SectionHeadingProps) {
  return (
    <h2 
      className={cn(
        "text-3xl font-bold mb-8 text-gray-900 dark:text-white flex items-center", 
        className
      )} 
      {...props}
    >
      <span className="w-8 h-1 bg-primary dark:bg-green-500 rounded mr-4"></span>
      {children}
    </h2>
  );
}
