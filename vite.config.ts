import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import eslintPlugin from 'vite-plugin-eslint';
import { visualizer } from 'rollup-plugin-visualizer';
import checker from 'vite-plugin-checker';
import path from 'path';
import type { ConfigEnv, UserConfig } from 'vite';

export default defineConfig((configEnv: ConfigEnv): UserConfig => {
  const { mode } = configEnv;
  const isDevelopment = mode === 'development';
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react({
        babel: {
          plugins: [
            ['@emotion/babel-plugin', {
              sourceMap: isDevelopment,
              autoLabel: isDevelopment ? 'dev-only' : 'never'
            }]
          ]
        }
      }),
      mdx(),
      eslintPlugin({
        cache: isDevelopment,
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['node_modules/**', 'dist/**']
      }),
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,tsx}"'
        },
        overlay: false
      }),
      visualizer({
        filename: 'stats.html',
        gzipSize: true,
        template: 'treemap'
      })
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@store': path.resolve(__dirname, './src/store'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@services': path.resolve(__dirname, './src/services'),
        '@types': path.resolve(__dirname, './src/types')
      }
    },

    build: {
      sourcemap: isDevelopment,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            mui: ['@mui/material'],
            redux: ['@reduxjs/toolkit', 'react-redux']
          }
        }
      }
    },

    server: {
      port: 3000,
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8080',
          changeOrigin: true
        }
      }
    }
  };
});