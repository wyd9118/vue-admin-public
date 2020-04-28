import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less';
import * as filters from './filters';

Object.keys(filters).forEach(key=>{ 
    Vue.filter(key,filters[key]);
});

Vue.use(elementUI);

Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
