<script setup lang="ts">
import euler from '../assets/portraits/euler.jpg'
import hamilton from '../assets/portraits/hamilton.jpg'
import cayley from '../assets/portraits/cayley.jpg'
import kuratowski from '../assets/portraits/kuratowski.jpg'
import erdos from '../assets/portraits/erdos.jpg'
import portraitCredits from '../assets/creditos-retratos.txt?url&no-inline'

defineProps<{ step: number }>()

const milestones = [
  {
    year: 1736,
    name: 'Leonhard Euler',
    summary: 'Convirtió un problema de puentes en una red de puntos y líneas.',
    portrait: euler,
    lines: 'M8 17Q14 3 24 8 M8 17Q20 21 24 8 M8 17Q11 29 24 27 M8 17Q21 13 24 27 M24 8 40 17 24 27 M8 17C10 -1 34 -1 40 17',
    nodes: [[8, 17], [24, 8], [40, 17], [24, 27]],
  },
  {
    year: 1857,
    name: 'William Rowan Hamilton',
    summary: 'Estudió rutas que visitan todos los vértices y regresan al comienzo.',
    portrait: hamilton,
    lines: 'M24 4 41 14 34 28 14 28 7 14Z',
    nodes: [[24, 4], [41, 14], [34, 28], [14, 28], [7, 14]],
  },
  {
    year: 1857,
    name: 'Arthur Cayley',
    summary: 'Estudió cómo contar estructuras conectadas sin ciclos.',
    portrait: cayley,
    lines: 'M24 5 12 15 5 27M12 15l7 12M24 5l12 10 7 12M36 15l-7 12',
    nodes: [[24, 5], [12, 15], [36, 15], [5, 27], [19, 27], [29, 27], [43, 27]],
  },
  {
    year: 1930,
    name: 'Kazimierz Kuratowski',
    summary: 'Caracterizó cuándo un grafo puede dibujarse sin cruces.',
    portrait: kuratowski,
    lines: 'M8 5 40 5 8 16 40 16 8 27 40 27 8 5 40 16M8 16l32 11M8 27 40 5',
    nodes: [[8, 5], [8, 16], [8, 27], [40, 5], [40, 16], [40, 27]],
  },
  {
    year: 1959,
    name: 'Paul Erdős',
    summary: 'Utilizó la probabilidad para estudiar redes complejas.',
    portrait: erdos,
    lines: 'M5 12 17 6 26 16 38 9M5 12l10 15 11-11 15 11M17 6l24 21',
    nodes: [[5, 12], [17, 6], [26, 16], [38, 9], [15, 27], [41, 27]],
  },
]
</script>

<template>
  <div class="history">
    <div v-click="1" class="history-axis" aria-hidden="true"></div>
    <ol class="history-milestones" aria-label="Hitos de la teoría de grafos">
      <li
        v-for="(milestone, index) in milestones"
        :key="milestone.name"
        v-click="index + 2"
        class="milestone"
        :aria-current="step === index + 2 ? 'step' : undefined"
        :aria-hidden="step < index + 2"
      >
        <time :datetime="String(milestone.year)">{{ milestone.year }}</time>
        <span class="history-dot" aria-hidden="true"></span>
        <article class="milestone-card">
          <div class="milestone-art">
            <img :src="milestone.portrait" :alt="`Retrato de ${milestone.name}`" />
            <svg viewBox="0 0 48 32" aria-hidden="true">
              <path :d="milestone.lines" />
              <circle v-for="[x, y] in milestone.nodes" :key="`${x}-${y}`" :cx="x" :cy="y" r="2.1" />
            </svg>
          </div>
          <h2>{{ milestone.name }}</h2>
          <p>{{ milestone.summary }}</p>
        </article>
      </li>
    </ol>
    <a
      v-click="2"
      class="portrait-credits"
      :href="portraitCredits"
      :tabindex="step < 2 ? -1 : undefined"
      :aria-hidden="step < 2"
      target="_blank"
      rel="noopener"
    >Créditos de los retratos</a>
  </div>
</template>
