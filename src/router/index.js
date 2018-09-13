import Vue from 'vue';
import Router from 'vue-router'
Vue.use(Router)
import views from '../views/index'
import Home from '../views/home/index'
import about from '../views/about/index'
export  default ()=>{
    return new Router({
         mode: 'history',
        routes:[
            {
                path:'/',
                name: 'index',
                component:views,
                meta:{title:"主体路由"},
            },
            {
                path:'/home',
                name: 'home',
                component:Home,
                meta:{title:"主体路由"},
            },
            {
                path:'/about',
                name: 'about',
                component:about,
                meta:{title:"主体路由"},
            }
        ]
    })
}
