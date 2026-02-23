import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "heavy-glitch": {
          "0%, 90%, 100%": { 
            transform: "translate(0,0)", 
            filter: "invert(0) contrast(100%)" 
          },
          "91%": { 
            transform: "translate(8px, -3px)", 
            filter: "invert(0.2) contrast(120%)" 
          },
          "93%": { 
            transform: "translate(-10px, 5px)", 
            filter: "invert(0.5) sepia(1) hue-rotate(270deg)" 
          },
          "95%": { 
            transform: "translate(15px, -8px)", 
            filter: "invert(0) contrast(150%) brightness(1.2)" 
          },
          "97%": { 
            transform: "translate(-5px, 2px)", 
            filter: "invert(0.3) contrast(110%)" 
          },
        },
      },
      animation: {
        "glitch-loop": "heavy-glitch 5s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;