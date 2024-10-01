import replace from '@rollup/plugin-replace'
import { promises as fs } from 'fs'
import path from 'path'
import typescript from 'rollup-plugin-typescript2'

const DEV_URL = 'http://172.26.134.161:3000'
const PROD_URL = 'http://172.26.134.161:4000'

const NODE_ENV = process.env.NODE_ENV

const finalUrl = NODE_ENV === 'production' ? PROD_URL : DEV_URL

export default [
  {
    input: 'src/runner/openscad-worker.ts',
    output: {
      file: 'dist/openscad-worker.js',
      format: 'es',
      sourcemap: true,
    },
    plugins: [
      typescript({
        rootDir: 'src',
      }),
      replace({
        preventAssignment: true,
        'import.meta.url': JSON.stringify(finalUrl),
      }),
      {
        name: 'preserve-worker-files',
        buildStart: async () => {
          const distDir = path.resolve(__dirname, 'dist')
          const workerFile = path.join(distDir, 'openscad-worker.js')

          // Ensure the dist directory exists
          try {
            await fs.mkdir(distDir, { recursive: true })
          } catch (err) {
            console.error('Error creating dist directory:', err)
          }

          // Check if the worker file exists and log accordingly
          try {
            await fs.access(workerFile)
            console.log('Worker file exists, skipping copy.')
          } catch (err) {
            console.log('Worker file not found, creating new one.')
          }
        },
      },
    ],
    onwarn(warning, warn) {
      if (warning.code === 'CIRCULAR_DEPENDENCY') return
      warn(warning)
    },
  },
]
