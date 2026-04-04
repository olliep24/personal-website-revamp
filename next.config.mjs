import createMDX from '@next/mdx'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow .mdx extensions for files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  turbopack: {
    resolveAlias: {
      env: './env-shim.js',
    },
  },
  webpack: (config) => {
    config.experiments = { ...config.experiments, asyncWebAssembly: true }
    config.resolve.alias['env'] = path.resolve(__dirname, './env-shim.js')
    return config
  },
  // Enable SharedArrayBuffer for better wasm performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
        ],
      },
    ];
  },
}
 
const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: ['remark-frontmatter'],
    rehypePlugins: ['rehype-slug'],
  },
})
 
// Combine MDX and Next.js config
export default withMDX(nextConfig)