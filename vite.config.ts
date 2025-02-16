import { defineConfig, loadEnv, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import eslintPlugin from 'vite-plugin-eslint';
import { visualizer } from 'rollup-plugin-visualizer';
import checker from 'vite-plugin-checker';
import path from 'path';

// تعریف type های مورد نیاز
interface RouterFutureFlags {
  v7_startTransition: boolean;
  v7_relativeSplatPath: boolean;
}

interface BuildOptions extends UserConfig {
  statsOptions?: {
    enabled: boolean;
    openAnalyzer?: boolean;
  };
}

// تنظیمات visualizer
const configureVisualizer = (mode: string) => {
  return visualizer({
    filename: 'stats.html',
    open: true,
    gzipSize: true,
    brotliSize: true,
    template: 'treemap', // یا 'sunburst', 'network'
    sourcemap: mode === 'development',
  });
};

// تنظیمات checker
const configureTypeChecker = () => {
  return checker({
    typescript: {
      tsconfigPath: './tsconfig.json',
      root: '.',
      buildMode: false,
    },
    eslint: {
      lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      dev: {
        logLevel: ['error', 'warning'],
      },
    },
    enableBuild: true,
    overlay: {
      initialIsOpen: false,
      position: 'br',
    },
    terminal: true,
  });
};

export default defineConfig(({ command, mode }): BuildOptions => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react({
        babel: {
          plugins: [
            ['@babel/plugin-transform-runtime', {
              regenerator: true,
              corejs: 3,
            }],
            ['@emotion/babel-plugin', {
              sourceMap: true,
              autoLabel: 'dev-only',
            }],
          ],
        },
      }),
      mdx({
        providerImportSource: '@mdx-js/react',
      }),
      eslintPlugin({
        cache: mode === 'development',
        fix: true,
        include: ['src/**/*.{ts,tsx,js,jsx}'],
        exclude: ['node_modules/**', 'dist/**'],
      }),
      configureTypeChecker(),
      mode === 'production' && configureVisualizer(mode),
    ].filter(Boolean),

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@utils': path.resolve(__dirname, './src/utils'),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },

    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.VITE_ROUTER_FUTURE_FLAGS': JSON.stringify({
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }),
    },

    build: {
      target: 'es2015',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
          },
        },
        plugins: [
          mode === 'production' && configureVisualizer(mode),
        ].filter(Boolean),
      },
    },

    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
    },

    server: {
      port: 3000,
      open: true,
      cors: true,
    },
  };
});
