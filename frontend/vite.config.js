import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    
    // tailwindcss()
  ]
  // server
  // root:"src",
  // server:{port:5173, 
  //   hmr:{overlay:true} // this is stop error pop up message
  // }
})
