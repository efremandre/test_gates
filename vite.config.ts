import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'
// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: '/test_gates/',
	build: {
		sourcemap: false,
	},
	resolve: {
		alias: {
			'@': path.resolve(import.meta.dirname, './src'),
		},
	},
})