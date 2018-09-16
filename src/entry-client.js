import Vue from 'vue'
import createApp from './app.js'
let { app, router ,store} = createApp()
import ProgressBar from './components/ProgressBar'
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el);
Vue.mixin({
    beforeRouteUpdate (to, from, next) {
        const { asyncData } = this.$options
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next)
        } else {
            next()
        }
    }
})
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}
router.onReady(() => {
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        })
        const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
        if (!asyncDataHooks.length) {
            return next()
        }

        bar.start()
        Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
            .then(() => {
                bar.finish()
                next()
            })
            .catch(next)
    })

    app.$mount('#app')


})
