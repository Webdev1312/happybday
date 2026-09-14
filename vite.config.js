import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
// GitHub Pages serves the project from /<repo-name>/, Netlify serves from /.
// Set VITE_BASE_PATH in your deployment env (or edit the fallback below)
// to match your GitHub repo name when deploying to GitHub Pages.
var base = process.env.VITE_BASE_PATH || '/';
export default defineConfig({
    base: '/happybday/', // 👈 Replace 'base,' with this entire line
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.svg', 'icons/*.png', 'assets/**/*'],
            manifest: {
                name: 'Birthday Experience',
                short_name: 'Birthday',
                description: 'A premium interactive birthday love story.',
                theme_color: '#0b0614',
                background_color: '#0b0614',
                display: 'standalone',
                orientation: 'portrait',
                start_url: base,
                scope: base,
                icons: [
                    { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
                    { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
                    {
                        src: 'icons/icon-maskable-512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                ],
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,webp,mp3,json}'],
                maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
                runtimeCaching: [
                    {
                        urlPattern: /\/assets\/audio\/.*\.mp3$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'audio-cache',
                            expiration: { maxEntries: 20 },
                        },
                    },
                    {
                        urlPattern: /\/assets\/images\/.*\.(png|jpe?g|webp)$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'image-cache',
                            expiration: { maxEntries: 60 },
                        },
                    },
                ],
            },
        }),
    ],
    server: {
        host: true,
        port: 5173,
    },
    build: {
        target: 'es2020',
        sourcemap: false,
    },
});
