import Vue from 'vue'
import VueRouter from 'vue-router'
import Begin from 'pages/begin'
import Detail from 'pages/detail'
import Content from 'pages/content'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        { path: '/', component: Begin },
        {
            path: '/detail', component: Detail,
            children: [
                {path: '/content/:word/:countDown', component: Content}
            ]
        },
    ]
})