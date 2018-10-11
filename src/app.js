import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import createRouter from './router'
import createStore from './store'
import AtComponents from 'at-ui'
import Meta from 'vue-meta';
Vue.use(AtComponents)
Vue.use(Meta, {
    keyName: 'head', // the component option name that vue-meta looks for meta info on.
    attribute: 'data-vue-meta', // the attribute name vue-meta adds to the tags it observes
    ssrAttribute: 'data-vue-meta-server-rendered', // the attribute name that lets vue-meta know that meta info has already been server-rendered
    tagIDKeyName: 'vmid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
})
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
