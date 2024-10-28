import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import typescript from '@rollup/plugin-typescript'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        typescript({
            declaration: true,
            declarationDir: 'dist',
            compilerOptions: { lib: ['es5', 'es6', 'dom'], target: 'es6' },
            emitDeclarationOnly: true,
            declarationMap: true,
        }),
    ],
    build: {
        lib: {
            entry: './src/index.ts',
            name: 'quickShortcuts',
            // the proper extensions will be added
            fileName: 'quick-shortcuts',
            formats: ['es', 'cjs', 'umd'],
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
