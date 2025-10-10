import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import { auth } from '@/firebase/init'
import { onAuthStateChanged } from 'firebase/auth'
import AddBookView from '@/views/AddBookView.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path: '/findbook',
    name: 'FindBook',
    component: () => import('@/views/FindBookView.vue')
  },
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: GetBookCountView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/Firelogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('@/views/AdminDashboard.vue'),
    meta: { requiresAuth: true, roles: ['admin'] },
  },
  {
    path: '/client',
    name: 'ClientDashboard',
    component: () => import('@/views/ClientDashboard.vue'),
    meta: { requiresAuth: true, roles: ['client', 'admin'] },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    async beforeEnter(to, from, next) {
      const { auth } = await import('@/firebase/init')
      const { onAuthStateChanged } = await import('firebase/auth')

      const user = auth.currentUser || await new Promise((r) => {
        const unsub = onAuthStateChanged(auth, u => { unsub(); r(u) })
      })

      if (!user) return next({ name: 'FireLogin' })
      const role = localStorage.getItem('app:role') || 'client'
      next({ name: role === 'admin' ? 'AdminDashboard' : 'ClientDashboard' })
    },
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('@/views/LogoutView.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

function waitForAuthInit() {
  if (auth.currentUser !== null) return Promise.resolve()
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, () => {
      unsub()
      resolve()
    })
  })
}

router.beforeEach(async (to, from, next) => {
  await waitForAuthInit()

  const isAuthed = !!auth.currentUser
  const role = localStorage.getItem('app:role') || 'client'

  if (to.meta?.guestOnly && isAuthed) {
    return next({ name: role === 'admin' ? 'AdminDashboard' : 'ClientDashboard' })
  }

  if (to.meta?.requiresAuth && !isAuthed) {
    return next({ name: 'FireLogin' })
  }

  if (to.meta?.roles && !to.meta.roles.includes(role)) {
    return next({ name: role === 'admin' ? 'AdminDashboard' : 'ClientDashboard' })
  }

  next()
})

export default router
