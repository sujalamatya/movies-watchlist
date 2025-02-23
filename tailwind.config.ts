import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#6366f1",
        accent: "#f3f4f6",
        "accent-foreground": "#1f2937",
        card: "#ffffff",
        "card-foreground": "#1f2937",
        "muted-foreground": "#6b7280",
      },
    },
  },
  plugins: [],
} satisfies Config;
