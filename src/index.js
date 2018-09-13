import Vue from 'vue';
import createRouter from './router'
import App from './App.vue'
const router=createRouter()
 new Vue({
    el: '#app',
    router,
    render: h => h(App),
});
