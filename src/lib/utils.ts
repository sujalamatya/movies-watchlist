import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | object | false)[]): string {
  return twMerge(clsx(inputs));
}
