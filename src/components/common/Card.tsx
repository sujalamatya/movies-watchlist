import React from "react";
import { cn } from "@/lib/utils";

// Define the Card component with default className
const Card = ({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-md p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Define the CardHeader component
const CardHeader = ({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("mb-4 text-lg font-semibold", className)} {...props}>
      {children}
    </div>
  );
};

// Define the CardContent component
const CardContent = ({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </div>
  );
};

// Define the CardFooter component
const CardFooter = ({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("mt-4 flex justify-end", className)} {...props}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardContent, CardFooter };
