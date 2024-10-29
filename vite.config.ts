import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import typescript from '@rollup/plugin-typescript'

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'QuickShortcuts',
            fileName: (format) => `quick-shortcuts.${format}.js`,
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
        // @ts-expect-error
        plugins: [
            typescript({
                tsconfig: './tsconfig.json',
                declaration: true,
                declarationDir: 'dist/types',
                rootDir: 'src',
            }),
        ],
    },
})
