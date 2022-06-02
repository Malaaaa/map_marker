import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { getThemeVariables } from 'antd/dist/theme'
import vitePluginImp from 'vite-plugin-imp'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),vitePluginImp({
    libList: [
      {
        libName: "antd",
        style(name) {
          // use less
          return `antd/es/${name}/style/index.js`
        }
      },
    ],
  })],
  css: {
    preprocessorOptions: {
      less: {
        // modifyVars: { 'primary-color': '#13c2c2' },
        modifyVars: getThemeVariables({
          // dark: true,
          // compact: true,
        }),
        // Inline JavaScript
        javascriptEnabled: true,
      }
    }
  },
})
