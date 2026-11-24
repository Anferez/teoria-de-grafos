<script setup lang="ts">
import { useId } from 'vue'
import { people, relationships, type Person } from '../src/data/relationships'

type Point = { x: number; y: number }

const positions: Record<Person, Point> = {
  Rodrigo: { x: 171, y: 49 },
  Cho: { x: 599, y: 49 },
  Arturo: { x: 673, y: 176 },
  Nicolas: { x: 385, y: 264 },
  Samuel: { x: 97, y: 176 },
}
const nodeRadius = { x: 69, y: 25 }
const graphId = useId()

function nearNode(node: Point, toward: Point) {
  const dx = toward.x - node.x
  const dy = toward.y - node.y
  // Intersección con la elipse, dejando espacio entre la flecha y el nodo.
  const scale = Math.hypot(dx / (nodeRadius.x + 5), dy / (nodeRadius.y + 5))
  return { x: node.x + dx / scale, y: node.y + dy / scale }
}

const edges = relationships.map(([from, to]) => ({
  from,
  to,
  start: nearNode(positions[from], positions[to]),
  end: nearNode(positions[to], positions[from]),
  example: from === 'Rodrigo' && to === 'Cho',
}))
</script>

<template>
  <figure class="graph-panel">
    <svg viewBox="0 0 770 310" role="img" :aria-labelledby="`${graphId}-title ${graphId}-description`">
      <title :id="`${graphId}-title`">Grafo dirigido de la red social</title>
      <desc :id="`${graphId}-description`">{{ relationships.map(([from, to]) => `${from} sigue a ${to}.`).join(' ') }}</desc>
      <defs>
        <marker :id="`${graphId}-arrow`" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 0 10 5 0 10Z" fill="context-stroke" />
        </marker>
      </defs>
      <line
        v-for="{ from, to, start, end, example } in edges"
        :key="`${from}-${to}`"
        class="graph-edge"
        :class="{ 'graph-example': example }"
        :data-from="from"
        :data-to="to"
        :x1="start.x" :y1="start.y" :x2="end.x" :y2="end.y"
        :marker-end="`url(#${graphId}-arrow)`"
      />
      <g v-for="person in people" :key="person" class="graph-node">
        <ellipse :cx="positions[person].x" :cy="positions[person].y" :rx="nodeRadius.x" :ry="nodeRadius.y" />
        <text :x="positions[person].x" :y="positions[person].y" text-anchor="middle" dominant-baseline="central">{{ person }}</text>
      </g>
    </svg>
    <figcaption><span aria-hidden="true">→</span> Rodrigo sigue a Cho</figcaption>
  </figure>
</template>
