import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Diary from '@/components/diary';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/diary',
      name: 'Diary',
      component: Diary,
    },
  ],
});
