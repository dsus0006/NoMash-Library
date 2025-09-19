<template>
  <h1>Sign in</h1>
  <p><input type="text" placeholder="Email" v-model.trim="email"/></p>
  <p><input type="password" placeholder="Password" v-model="password"/></p>
  <p><button @click="signin">Sign in via Firebase</button></p>
</template>

<script setup>
  import { ref } from "vue"
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
  import { useRouter } from "vue-router"

  const email = ref ("")
  const password = ref ("")
  const router = useRouter()
  const auth = getAuth()

  const adminEmail = "admin@example.com"

  function signin() {
    signInWithEmailAndPassword(auth, email.value, password.value).then((cred) => {
      const role = cred.user.email === adminEmail ? 'admin' : 'client'
      localStorage.setItem('app:role', role)
      console.log('Current user:', { uid: cred.user.uid, email: cred.user.email, role })
      router.push('/dashboard')
    })
  }
</script>
