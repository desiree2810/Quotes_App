
// to remove this error -------> Property 'env' does not exist on type 'ImportMeta'.ts 
/// <reference types="vite/client" />           
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})