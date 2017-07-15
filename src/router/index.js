import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Diary from '@/components/diary';
import Dashboard from '@/components/dashboard';
import Goals from '@/components/goals';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/diary/:id',
      name: 'Diary',
      component: Diary,
    },
    {
      path: '/dashboard/:id',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/goals/:id',
      name: 'Goals',
      component: Goals,
    },
  ],
});
