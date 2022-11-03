import { createRouter, createWebHistory } from 'vue-router';
import ContactBook from '../Views/ContactBook.vue';
import NotFound from '../Views/NotFound.vue';
import ContactEdit from '../Views/ContactEdit.vue';
import ContactAdd from '../Views/ContactAdd.vue';

const routes = [
   { path: '/', component: ContactBook, name: 'contactbook' },
   { path: '/:pathMatch(.*)*', component: NotFound, name: 'notfound' },
   { path: '/contacts/:id', component: ContactEdit, name: 'contact.edit', props: true },
   { path: '/contacts/add', component: ContactAdd, name: 'contact.add' },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

export default router;
