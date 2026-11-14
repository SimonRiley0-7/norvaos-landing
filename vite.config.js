import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'
import { spawn } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Auto-start backend server alongside Vite in development
function backendServerPlugin() {
  let backendProc = null
  return {
    name: 'backend-server-plugin',
    configureServer() {
      if (!backendProc) {
        backendProc = spawn('node', ['server/index.js'], {
          stdio: 'inherit',
          cwd: __dirname,
          env: process.env,
        })
        const killBackend = () => {
          if (backendProc) {
            try {
              backendProc.kill()
            } catch (_) {}
            backendProc = null
          }
        }
        process.on('exit', killBackend)
        process.on('SIGINT', killBackend)
        process.on('SIGTERM', killBackend)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    backendServerPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
