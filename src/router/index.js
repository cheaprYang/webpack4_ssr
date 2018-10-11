import Vue from 'vue';
import Router from 'vue-router'
import Meta from 'vue-meta';
Vue.use(Meta, {
    keyName: 'head', // the component option name that vue-meta looks for meta info on.
    attribute: 'data-vue-meta', // the attribute name vue-meta adds to the tags it observes
    ssrAttribute: 'data-vue-meta-server-rendered', // the attribute name that lets vue-meta know that meta info has already been server-rendered
    tagIDKeyName: 'vmid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
})
Vue.use(Router);
const _import = require('./_import_development')

export  default ()=>{
    return new Router({
         mode: 'history',
        routes:[
            {
                path:'/',
                name: 'login',
                component:_import('login/login'),
                meta:{title:"登录"},
            },
            {
                path:'/home',
                name: 'home',
                component:_import('home/index'),
                meta:{title:"主体路由"},
            },
            {
                path:'/about',
                name: 'about',
                component:_import('about/index'),
                meta:{title:"主体路由"},
            }
        ]
    })
}
