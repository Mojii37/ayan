module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        browsers: ['>0.2%', 'not dead', 'not op_mini all']
      },
      useBuiltIns: 'usage',
      corejs: 3,
      debug: false
    }],
    ['@babel/preset-react', {
      runtime: 'automatic',
      importSource: '@emotion/react'
    }]
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', {
      regenerator: true,
      corejs: 3,
      helpers: true,
      useESModules: true
    }],
    ['@emotion/babel-plugin', {
      sourceMap: true,
      autoLabel: 'dev-only',
      labelFormat: '[local]'
    }]
  ]
};