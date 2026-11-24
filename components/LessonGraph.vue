<script setup lang="ts">
import { computed, useId } from 'vue'
import { edgeKey, findEdge, isRemoved, lessonGraphs, type GraphName, type LessonGraph } from '../src/data/lesson-graphs'

const props = defineProps<{
  name: GraphName
  highlight?: readonly string[]
  secondary?: readonly string[]
  focus?: readonly string[]
  alternate?: boolean
  added?: boolean
  reduced?: boolean
  route?: readonly string[]
  visit?: boolean
  color?: 'blue' | 'amber'
  faces?: boolean
}>()

const id = useId()
const graph = computed<LessonGraph>(() => lessonGraphs[props.name])
const points = computed(() => (props.alternate && graph.value.alternative) || graph.value.points)
const edges = computed(() => {
  const all = [...graph.value.edges]
  if (props.added && graph.value.addedEdge) all.push(graph.value.addedEdge)
  return props.reduced ? all.filter(edge => !isRemoved(graph.value, edge)) : all
})

const traceInterval = 165
const routeSegments = computed(() => {
  const route = props.route ?? []
  return route.slice(1).flatMap((to, index) => {
    const from = route[index]
    const edge = findEdge(graph.value, from, to)
    return edge && edges.value.includes(edge) ? [{ from, to }] : []
  })
})

function visitDelay(vertex: string) {
  const index = props.route?.indexOf(vertex) ?? -1
  return index <= 0 ? '0ms' : `${(index - 1) * traceInterval + 350}ms`
}

function segment(from: string, to: string) {
  const [ax, ay] = points.value[from]
  const [bx, by] = points.value[to]
  if (from === to) {
    return `M${ax - 16} ${ay - 12}C${ax - 53} ${ay - 56} ${ax + 53} ${ay - 56} ${ax + 16} ${ay - 12}`
  }
  const length = Math.hypot(bx - ax, by - ay)
  const dx = (bx - ax) / length
  const dy = (by - ay) / length
  const start = 21
  const end = graph.value.directed ? 25 : 21
  if (graph.value.directed && findEdge(graph.value, to, from)) {
    const cx = (ax + bx) / 2 - dy * 44
    const cy = (ay + by) / 2 + dx * 44
    const lengthA = Math.hypot(cx - ax, cy - ay)
    const lengthB = Math.hypot(cx - bx, cy - by)
    return `M${ax + (cx - ax) * start / lengthA} ${ay + (cy - ay) * start / lengthA}Q${cx} ${cy} ${bx + (cx - bx) * end / lengthB} ${by + (cy - by) * end / lengthB}`
  }
  return `M${ax + dx * start} ${ay + dy * start}L${bx - dx * end} ${by - dy * end}`
}
</script>

<template>
  <figure class="lesson-diagram">
    <svg :viewBox="graph.vertices.length === 3 ? '0 100 440 100' : '0 0 440 300'" role="img" :aria-labelledby="`${id}-title ${id}-desc`">
      <title :id="`${id}-title`">Grafo {{ graph.directed ? 'dirigido' : 'no dirigido' }}</title>
      <desc :id="`${id}-desc`">
        Vértices {{ graph.vertices.join(', ') }}.
        {{ edges.map(edge => `${edge.from} ${graph.directed ? 'hacia' : 'con'} ${edge.to}${edge.weight === undefined ? '' : ` (${edge.weight} minutos)`}`).join('; ') }}.
        {{ routeSegments.length ? `Recorrido: ${route?.join(', ')}.` : '' }}
      </desc>
      <defs>
        <marker :id="`${id}-arrow`" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 0 12 6 0 12Z" fill="context-stroke" />
        </marker>
      </defs>
      <g v-if="faces && name === 'plane'" aria-hidden="true" class="diagram-faces">
        <polygon points="84,52 350,52 350,242" />
        <polygon points="84,52 350,242 84,242" />
        <text x="279" y="111">F₁</text>
        <text x="150" y="190">F₂</text>
        <text x="408" y="222">F₃</text>
      </g>
      <g :class="color === 'blue' ? 'diagram-blue' : ''">
        <path
          v-for="edge in edges"
          :key="edgeKey(edge)"
          class="lesson-edge"
          :class="{ 'is-highlighted': highlight?.includes(edgeKey(edge)), 'is-secondary': secondary?.includes(edgeKey(edge)) }"
          :data-edge="edgeKey(edge)"
          :d="segment(edge.from, edge.to)"
          :style="graph.alternative ? { d: `path('${segment(edge.from, edge.to)}')` } : undefined"
          :marker-end="graph.directed ? `url(#${id}-arrow)` : undefined"
        />
        <g :key="route?.join('')" aria-hidden="true">
          <path
            v-for="({ from, to }, index) in routeSegments"
            :key="index"
            class="lesson-trace"
            :data-hop="from + to"
            :d="segment(from, to)"
            pathLength="1"
            :style="{ animationDelay: `${index * traceInterval}ms` }"
          />
        </g>
        <g
          v-for="edge in edges.filter(edge => edge.label)"
          :key="edgeKey(edge)"
          class="lesson-weight"
          :class="{ 'is-highlighted': highlight?.includes(edgeKey(edge)), 'is-secondary': secondary?.includes(edgeKey(edge)) }"
          :transform="`translate(${edge.label![0]} ${edge.label![1]})`"
        >
          <rect x="-13" y="-12" width="26" height="24" rx="5" />
          <text text-anchor="middle" dominant-baseline="central">{{ edge.weight }}</text>
        </g>
        <g
          v-for="vertex in graph.vertices"
          :key="vertex"
          class="lesson-node"
          :class="{ 'is-highlighted': focus?.includes(vertex) }"
          :data-vertex="vertex"
          :style="{ transform: `translate(${points[vertex][0]}px, ${points[vertex][1]}px)` }"
        >
          <circle
            r="20"
            :class="{ 'is-visited': visit && route?.includes(vertex) && !focus?.includes(vertex) }"
            :style="visit ? { animationDelay: visitDelay(vertex) } : undefined"
          />
          <text text-anchor="middle" dominant-baseline="central">{{ vertex }}</text>
        </g>
      </g>
    </svg>
  </figure>
</template>
