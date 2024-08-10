// import postcss from 'rollup-plugin-postcss';
const { withNx } = require('@nx/rollup/with-nx');
const url = require('@rollup/plugin-url');
const svg = require('@svgr/rollup');

module.exports = withNx(
  {
    main: './src/index.ts',
    outputPath: '../dist/flexbox-based-ui-composer',
    tsConfig: './tsconfig.lib.json',
    compiler: 'babel',
    external: ['react', 'react-dom', 'react/jsx-runtime'],
    format: ['esm'],
    assets: [{ input: '.', output: '.', glob: 'README.md' }],
  },
  {
    // Provide additional rollup configuration here. See: https://rollupjs.org/configuration-options
    plugins: [
      svg({
        svgo: false,
        titleProp: true,
        ref: true,
      }),
      url({
        limit: 10_000, // 10kB
      }),
      // postcss({
      //   // Extract CSS to a separate file
      //   extract: false, // Set to true if you want a separate CSS file
  
      //   // Enable source maps for debugging
      //   sourceMap: true,
  
      //   // Minify CSS for production
      //   minimize: true,
  
      //   // Include any additional PostCSS plugins if needed
      //   plugins: [],
      // }),
    ],
  }
);
