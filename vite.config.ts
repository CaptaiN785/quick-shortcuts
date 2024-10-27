import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: './src/lib/main.ts',
            name: 'quick-shortcuts',
            // the proper extensions will be added
            fileName: 'quick-shortcuts',
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
          },
    },
})
