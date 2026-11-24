import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { parseSync } from '@slidev/parser'

const root = new URL('../', import.meta.url)
const output = new URL('.pages-public/', root)
const files = [
  '.github/workflows/deploy.yml', '.gitignore', 'package.json', 'package-lock.json',
  'style.css', 'scripts/prepare-pages.mjs',
  'components/DirectedGraph.vue', 'components/HistoryTimeline.vue',
  'components/LessonGraph.vue', 'components/LessonMatrix.vue', 'components/RelationshipTable.vue',
  'src/data/lesson-graphs.ts', 'src/data/relationships.ts',
  'assets/cover-network.svg', 'assets/creditos-retratos.txt',
  'assets/portraits/images.jpg', 'assets/portraits/euler.jpg', 'assets/portraits/hamilton.jpg',
  'assets/portraits/cayley.jpg', 'assets/portraits/kuratowski.jpg', 'assets/portraits/erdos.jpg',
]

const entry = new URL('slides.md', root)
const original = await readFile(entry, 'utf8')
const sanitized = original.replace(/<!--(?:[\s\S]*?)-->/g, '')
const before = parseSync(original, entry.pathname).slides
const after = parseSync(sanitized, entry.pathname).slides
if (before.length !== after.length || after.some((slide, i) =>
  slide.note?.trim() || slide.content.trim() !== before[i].content.trim()
)) {
  throw new Error('La copia sin notas alteraría las diapositivas. Revisa slides.md.')
}

try {
  await mkdir(output)
} catch (error) {
  if (error.code !== 'EEXIST') throw error
  throw new Error('Ya existe .pages-public/. Mueve esa carpeta antes de generar otra copia.')
}

for (const name of files) {
  const folder = dirname(name).replaceAll('\\', '/')
  await mkdir(new URL(folder + '/', output), { recursive: true })
  await copyFile(new URL(name, root), new URL(name, output))
}
await writeFile(new URL('slides.md', output), sanitized)
console.log(`Copia pública sin notas: .pages-public/ (${after.length} diapositivas).`)
