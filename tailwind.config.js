// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Next.js app router
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  safelist: [
    "transition-smooth",
    "transition-smooth-slow",
    "btn-glow",
    "card-hover",
    "input-base",
    "btn-base",
    "btn-primary",
    "btn-secondary",
    "btn-outline",
    "card-base",
    "card-interactive",
  ],
}
