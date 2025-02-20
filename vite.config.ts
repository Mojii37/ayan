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
  const isProduction = mode === 'production';
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react({
        babel: {
          plugins: [
            [
              '@babel/plugin-transform-runtime',
              {
                regenerator: true,
                corejs: 3
              }
            ],
            [
              '@emotion/babel-plugin',
              {
                sourceMap: isDevelopment,
                autoLabel: isDevelopment ? 'dev-only' : 'never'
              }
            ]
          ]
        }
      }),
      mdx({
        providerImportSource: '@mdx-js/react'
      }),
      eslintPlugin({
        cache: isDevelopment,
        fix: isDevelopment,
        include: ['src/**/*.{ts,tsx,js,jsx}'],
        exclude: ['node_modules/**', 'dist/**']
      }),
      checker({
        typescript: {
          tsconfigPath: './tsconfig.json',
          root: '.',
          buildMode: isProduction
        },
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
          dev: {
            logLevel: isDevelopment ? ['error', 'warning'] : []
          }
        },
        enableBuild: true,
        overlay: {
          initialIsOpen: false,
          position: 'br'
        },
        terminal: true
      }),
      ...(isProduction
        ? [
            visualizer({
              filename: 'stats.html',
              open: true,
              gzipSize: true,
              brotliSize: true,
              template: 'treemap',
              sourcemap: isDevelopment
            })
          ]
        : [])
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
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.mdx']
    },

    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.ts'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/',
          'src/setupTests.ts',
          '**/*.d.ts',
          '**/*.test.{ts,tsx}',
          '**/__mocks__/**'
        ]
      },
      css: true,
      include: ['src/**/*.{test,spec}.{ts,tsx}']
    },

    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      ...Object.keys(env).reduce((acc, key) => {
        acc[`import.meta.env.${key}`] = JSON.stringify(env[key]);
        return acc;
      }, {} as Record<string, string>)
    },

    build: {
      target: 'es2015',
      sourcemap: isDevelopment,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            mui: ['@mui/material', '@mui/icons-material'],
            redux: ['@reduxjs/toolkit', 'react-redux']
          }
        }
      },
      chunkSizeWarningLimit: 1000
    },

    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@mui/material',
        '@reduxjs/toolkit'
      ]
    },

    server: {
      port: 3000,
      open: true,
      cors: true,
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8080',
          changeOrigin: true,
          secure: false
        }
      }
    }
  };
});