<script setup lang="ts">
import { follows, people } from '../src/data/relationships'
</script>

<template>
  <div class="relationship-table">
    <table aria-label="Quién sigue a quién" aria-describedby="table-note">
      <thead>
        <tr>
          <th scope="col">Sigue a</th>
          <th v-for="person in people" :key="person" scope="col">{{ person }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="from in people" :key="from">
          <th scope="row">{{ from }}</th>
          <td
            v-for="to in people"
            :key="to"
            :class="{ 'is-following': follows(from, to), 'is-diagonal': from === to }"
            :data-from="from"
            :data-to="to"
          >{{ follows(from, to) ? 'Sí' : 'No' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
