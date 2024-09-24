import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [
        '/Users/dhanithyab2002/Documents/DFCC/fire-log/complience-bot', // Add your project directory here
        '/Users/dhanithyab2002/Documents/DFCC/fire-log/complience-bot/src/assets' // Add the directory containing your assets here
      ]
    }
  }
});
