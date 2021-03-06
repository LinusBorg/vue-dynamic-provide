import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

/**
 * ***
 * WARNING
 * ***
 * This config doesn't work yet...
 */
const pkg = require('./package.json')

const version = pkg.version

const babelConfig = {
  // runtimeHelpers: true,
  babelrc: false,
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: false,
        modules: false,
        targets: '> 1%, last 2 versions, not ie <= 8',
      },
    ],
  ],
  exclude: 'node_modules/**',
  // plugins: ['@babel/plugin-external-helpers'],
}

const banner = `
/*
  * vue-reactive-provide
  * Version: ${version}
  * Licence: MIT
  * (c) Thorsten Lünborg
*/
`
const nodeResolveOptions = {
  module: true,
  jsnext: true,
  extensions: ['.js', '.vue'],
}

const input = {
  input: './lib/index.js',
  external: ['vue'],

  plugins: [babel(babelConfig), nodeResolve(nodeResolveOptions), commonjs()],
}

const output = {
  banner,
  name: 'VueReactiveProvide',
  globals: {
    vue: 'Vue',
  },
  sourcemap: true,
}

const builds = [
  {
    format: 'umd',
    file: './dist/vue-reactive-provide.umd.js',
    globals: {
      vue: 'Vue',
    },
  },
  {
    format: 'cjs',
    file: './dist/vue-reactive-provide.common.js',
  },
  {
    format: 'esm',
    file: './dist/vue-reactive-provide.esm.js',
  },
]

const configs = builds.map(build => {
  return {
    ...input,
    output: {
      ...output,
      ...build,
    },
  }
})

export default configs
