<script setup lang="ts">
import { computed } from 'vue'
import { edgeKey, findEdge, isRemoved, lessonGraphs } from '../src/data/lesson-graphs'
import { follows, people, type Person } from '../src/data/relationships'

const props = defineProps<{
  kind: 'social' | 'socialNumbers' | 'chain' | 'directedChain' | 'weighted' | 'school'
  highlight?: readonly string[]
  reduced?: boolean
}>()

const graph = computed(() => props.kind === 'social' || props.kind === 'socialNumbers'
  ? undefined
  : lessonGraphs[props.kind])

const vertices = computed(() => graph.value?.vertices ?? people)

const rows = computed(() => vertices.value.map(from => ({
  from,
  cells: vertices.value.map(to => {
    const pair = graph.value && findEdge(graph.value, from, to)
    const removed = !!(graph.value && props.reduced && pair && isRemoved(graph.value, pair))
    const connected = graph.value ? !!pair && !removed : follows(from as Person, to as Person)
    let value: string | number = Number(connected)
    if (props.kind === 'social') value = connected ? 'Sí' : 'No'
    if (props.kind === 'weighted') value = pair?.weight ?? '—'
    const key = graph.value ? pair && edgeKey(pair) : `${from}:${to}`
    return { to, value, connected, highlighted: removed || (!!key && props.highlight?.includes(key)) }
  }),
})))

const labels = {
  social: 'Relaciones en la red social',
  socialNumbers: 'Matriz de adyacencia de la red social',
  chain: 'Matriz de adyacencia del grafo no dirigido',
  directedChain: 'Matriz de adyacencia del grafo dirigido',
  weighted: 'Matriz de pesos de conexiones directas',
  school: 'Matriz de adyacencia de la red de computadores',
}
</script>

<template>
  <table class="lesson-matrix" :aria-label="labels[kind]">
    <thead>
      <tr>
        <th scope="col" class="matrix-origin" aria-label="Fila de origen, columna de destino">→</th>
        <th v-for="vertex in vertices" :key="vertex" scope="col">{{ vertex }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="{ from, cells } in rows" :key="from">
        <th scope="row">{{ from }}</th>
        <td
          v-for="{ to, value, connected, highlighted } in cells"
          :key="to"
          :data-pair="`${from}:${to}`"
          :class="{ 'is-connection': connected, 'is-selected': highlighted }"
        >{{ value }}</td>
      </tr>
    </tbody>
  </table>
</template>
