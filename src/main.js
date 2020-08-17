import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.directive('clipboard', {
  // bind (el, binding) {
  //   if (binding.arg === 'copy') {
  //     el.__vueClipboardCopy__ = copy
  //     el.addEventListener('click', copy)
  //   }
  //   function copy () {
  //       // 创建元素用于复制
  //       var aux = document.createElement("input")
  //       const content = binding.value
  //       console.log('content', binding)
  //       // 设置元素内容
  //       aux.setAttribute("value", content)
  //       // 将元素插入页面进行调用
  //       document.body.appendChild(aux)
  //       // 复制内容
  //       aux.select()
  //       // 将内容复制到剪贴板
  //       document.execCommand("copy")
  //       // 删除创建元素
  //       document.body.removeChild(aux)
  //       //提示
  //       alert("复制内容成功：" + aux.value)
  //   }
  // },
  update(el, binding) {
    if (binding.arg === 'copy') {
      el.__vueClipboardCopy__ = copy
      el.addEventListener('click', copy)
      console.log('el', el.dataset, el)
    }
    function copy () {
        // 创建元素用于复制
        var aux = document.createElement("input")
        const content = binding.value
        console.log('content', binding)
        // 设置元素内容
        aux.setAttribute("value", content)
        // 将元素插入页面进行调用
        document.body.appendChild(aux)
        // 复制内容
        aux.select()
        // 将内容复制到剪贴板
        document.execCommand("copy")
        // 删除创建元素
        document.body.removeChild(aux)
        //提示
        alert("复制内容成功：" + aux.value)
    }
  },
  unbind (el) {
    document.removeEventListener('click', el.__vueClipboardCopy__)
    delete el.__vueClipboardCopy__
  }

})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
