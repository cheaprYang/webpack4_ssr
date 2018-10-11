import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import createRouter from './router'
import createStore from './store'
import AtComponents from 'at-ui'
Vue.use(AtComponents)

import 'at-ui-style/src/index.scss'    // 引入组件样式
import App from './App.vue'

export default (context) => {

    const router = createRouter();
    const store=createStore();
    sync(store,router)
    const app = new Vue({
        router,
        store,
        render: h => h(App),
    })
    return {app, router,store}

}
