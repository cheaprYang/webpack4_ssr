import Vue from 'vue';
import Router from 'vue-router'
Vue.use(Router);
const _import = require('./_import_' + process.env.NODE_ENV)

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
