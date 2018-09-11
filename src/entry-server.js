

import createApp from './app.js'
export default (context) => {
    return new Promise((resolve, reject) => {

        let { app, router } = createApp(context);
        router.push(context.url);

        router.onReady(() => {
            // 访问路径，可定匹配到组件
            let matchedCompoents = router.getMatchedComponents();

            if (!matchedCompoents.length) {
                return reject({ code: 404 })
            }
            resolve(app)
        }, reject)

    })
}
