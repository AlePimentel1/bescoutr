import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          50: "#EFFDF3",
          100: "#CEF8DB",
          200: "#B7F4C9",
          300: "#96EFB1",
          400: "#81ECA1",
          500: "#62E78A",
          600: "#59D27E",
          700: "#46A462",
          800: "#367F4C",
          900: "#29613A",
          DEFAULT: "#62E78A",
          foreground: "#1A1A1A",
        },
        secondary: {
          50: "#E6EFFA",
          100: "#B1CCF0",
          200: "#8BB4E9",
          300: "#5692DF",
          400: "#357DD9",
          500: "#005DCF",
          600: "#0354BC",
          700: "#024193",
          800: "#023372",
          900: "#012757",
          DEFAULT: "#005DCC",
          foreground: "#FFFFFF",
        },
        tertiary: {
          50: "#E8E9F1",
          100: "#B7BCD3",
          200: "#949BBE",
          300: "#646EA1",
          400: "#45518E",
          500: "#172672",
          600: "#152368",
          700: "#101B51",
          800: "#0D153F",
          900: "#0A1030",
          DEFAULT: "#172672",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // blue: {
        //   50: "#E6EFFA",
        //   100: "#B1CCF0",
        //   200: "#8BB4E9",
        //   300: "#5692DF",
        //   400: "#357DD9",
        //   500: "#005DCF",
        //   600: "#0354BC",
        //   700: "#024193",
        //   800: "#023372",
        //   900: "#012757",
        //   DEFAULT: "#005DCC",
        // },
        // 'caribbean-green': {
        //   50: "#EFFDF3",
        //   100: "#CEF8DB",
        //   200: "#B7F4C9",
        //   300: "#96EFB1",
        //   400: "#81ECA1",
        //   500: "#62E78A",
        //   600: "#59D27E",
        //   700: "#46A462",
        //   800: "#367F4C",
        //   900: "#29613A",
        //   DEFAULT: "#62E78A",
        // },
        'night-sky': {
          50: "#F3F5F7",
          100: "#B3B8BF",
          200: "#8E95A1",
          300: "#5A6576",
          400: "#3A475B",
          500: "#091932",
          600: "#08172E",
          700: "#061224",
          800: "#050E1C",
          900: "#040B15",
          DEFAULT: "#091932",
        },
        'intense-green': {
          50: "#E6E8EB",
          100: "#B1C1C2",
          200: "#8BA3A4",
          300: "#567A7B",
          400: "#356061",
          500: "#02383A",
          600: "#033335",
          700: "#022829",
          800: "#021F20",
          900: "#011818",
          DEFAULT: "#02383A",
        },
        cian: {
          50: "#E9F6FE",
          100: "#BAE4FD",
          200: "#98D7FC",
          300: "#6AC5FB",
          400: "#4DB9FA",
          500: "#20A8F9",
          600: "#1D99E3",
          700: "#1777B1",
          800: "#125C89",
          900: "#0D4769",
          DEFAULT: "#20A8F9",
        },
        neutral: {
          50: "#FFFFFF",
          100: "#E6E6E6",
          200: "#CCCCCC",
          300: "#B3B3B3",
          400: "#999999",
          500: "#808080",
          600: "#666666",
          700: "#4D4D4D",
          800: "#333333",
          900: "#1A1A1A",
          DEFAULT: "#808080",
        },
        success: {
          50: "#E8F7ED",
          100: "#B9E7C6",
          200: "#97DCAA",
          300: "#68CC84",
          400: "#4AC26C",
          500: "#1DB347",
          600: "#1AA341",
          700: "#157F32",
          800: "#106227",
          900: "#0C4B1E",
          DEFAULT: "#1DB347",
        },
        warning: {
          50: "#FDFBE8",
          100: "#F9F2B9",
          200: "#F6EC97",
          300: "#F2E468",
          400: "#EFDE4A",
          500: "#EBD61D",
          600: "#D6C31A",
          700: "#A79815",
          800: "#817610",
          900: "#635A0C",
          DEFAULT: "#EBD61D",
        },
        error: {
          50: "#FBEDED",
          100: "#F3C6C6",
          200: "#EDAAAA",
          300: "#E58483",
          400: "#E06C6B",
          500: "#D84746",
          600: "#C54140",
          700: "#993232",
          800: "#772727",
          900: "#5B1E1D",
          DEFAULT: "#D84746",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config