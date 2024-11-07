import type { Config } from "tailwindcss";
import { PluginAPI } from 'tailwindcss/types/config';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(54deg, rgba(68,152,115,1) 0%, rgba(195,240,148,1) 50%, rgba(6,108,93,1) 100%)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    function (pluginApi: PluginAPI) {
      const { addUtilities } = pluginApi;
      addUtilities({
        ".no-scrollbar": {
          "-ms-overflow-style": "none", 
          "scrollbar-width": "none",
        },
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
      });
    },
  ],
};
export default config;
