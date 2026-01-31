module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0f0f1a',
          900: '#1a1a2e',
          800: '#2a2a4a',
        },
        'accent-blue': '#4a9ede',
        'accent-amber': '#e8a849',
        'accent-pink': '#e84393',
        'accent-green': '#00b894',
        'accent-purple': '#a29bfe',
      },
      fontFamily: {
        display: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
};
