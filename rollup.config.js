import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import replace from 'rollup-plugin-replace';
import pkg from './package.json'
import { plugin as analyze } from 'rollup-plugin-analyzer'

export default {
  external: ['react', 'react-dom', 'prop-types'],
  globals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'prop-types': 'PropTypes'
  },
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    },
    {
      file: pkg.unpkg,
      format: 'umd',
      name: 'react-sandbox-editor'
    }
  ],
  plugins: [
    external(),
    postcss({
      modules: true
    }),
    url(),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    }),
    analyze()
  ]
}
