import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '../stores/auth'

import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFound.vue'
import WelcomePage from '../views/WelcomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WelcomePage
    },
    {
      path: '/list',
      name: 'list',
      component: HomeView
    },
    // {
    //   path: '/rewards',
    //   name: 'rewards',
    //   component: RewardsView
    // },
    // {
    //   path: '/archives',
    //   name: 'archives',
    //   component: ArchivePage
    // },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ]
})

router.beforeEach(to => {
  const privatePage = ['/list']
  const authStore = useAuthStore()

  const authRequired = privatePage.includes(to.path)
  if (authRequired && !authStore.signedIn) {
    authStore.returnUrl = to.fullPath
    return '/'
  }
})

export default router
