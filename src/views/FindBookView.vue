<template>
  <div>
    <h1>Find Books</h1>

    <form @submit.prevent="findBooks">
      <div>
        <label>Search by:</label>
        <select v-model="mode">
          <option value="isbn">ISBN</option>
          <option value="name">Name</option>
        </select>
      </div>

      <div v-if="mode === 'isbn'">
        <label for="isbn">ISBN:</label>
        <input id="isbn" type="number" v-model.number="qIsbn" required />
      </div>
      <div v-else>
        <label for="name">Name:</label>
        <input id="name" type="text" v-model.trim="qName" required />
      </div>

      <div>
        <label>Order by:</label>
        <select v-model="orderField">
          <option value="name">Name A-Z</option>
          <option value="isbn">ISBN</option>
        </select>

        <select v-model="dir">
          <option value="asc">asc</option>
          <option value="desc">desc</option>
        </select>
      </div>

      <div>
        <label for="n">Limit:</label>
        <input id="n" type="number" v-model.number="n" min="1" placeholder="min. 1" required />
      </div>

      <button type="submit">Search</button>
    </form>

    <ul v-if="books.length">
      <li v-for="b in books" :key="b.id">
        {{ b.isbn }} — {{ b.name }}
      </li>
    </ul>
    <p v-else>No results.</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import db from './../firebase/init.js'
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore'

export default {
  setup() {
    const mode = ref('isbn')
    const qIsbn = ref()
    const qName = ref('')
    const orderField = ref('name')
    const dir = ref('asc')
    const n = ref(10)
    const books = ref([])

    const findBooks = async () => {
      const parts = [collection(db, 'books')]

      if (mode.value === 'isbn') {
        parts.push(where('isbn', '==', Number(qIsbn.value)))
      } else {
        parts.push(where('name', '==', qName.value))
      }

      parts.push(orderBy(orderField.value, dir.value))
      parts.push(limit(Number(n.value)))

      const snap = await getDocs(query(...parts))
      books.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      console.log('Results:', books.value)
    }

    return { mode, qIsbn, qName, orderField, dir, n, books, findBooks }
  }
}
</script>
