import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs'
import { join } from 'node:path'

const src = join(process.cwd(), 'frontend', 'dist')
const dest = join(process.cwd(), 'docs')

if (!existsSync(src)) {
  throw new Error('Frontend build output not found. Run npm run build --prefix frontend first.')
}

if (existsSync(dest)) {
  rmSync(dest, { recursive: true, force: true })
}

mkdirSync(dest, { recursive: true })

function copyRecursive(srcPath, destPath) {
  const stats = statSync(srcPath)
  if (stats.isDirectory()) {
    mkdirSync(destPath, { recursive: true })
    for (const entry of readdirSync(srcPath)) {
      copyRecursive(join(srcPath, entry), join(destPath, entry))
    }
  } else {
    copyFileSync(srcPath, destPath)
  }
}

copyRecursive(src, dest)
console.log('Copied frontend dist to docs/ for GitHub Pages.')
