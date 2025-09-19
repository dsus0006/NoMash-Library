<template>
  <div class="container py-4">
    <h1>Log out</h1>
    <button class="btn btn-danger" @click="doLogout">Log out now</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'

const router = useRouter()
const auth = getAuth()

onMounted(() => {
  console.log('Current user:', auth.currentUser)
})

async function doLogout() {
  console.log('Signing out user:', auth.currentUser)
  await signOut(auth)
  localStorage.removeItem('app:role')
  console.log('Current user:', auth.currentUser)
  router.push({ name: 'FireLogin' })
}
</script>
