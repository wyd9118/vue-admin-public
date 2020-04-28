import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

Vue.use(Vuex);

const files = require.context('./modules/',true,/.js$/);
const modules = files.keys().reduce((modules,file)=>{ 
    const name = file.match(/\/(.*?)\.\w+/)[1];
    modules[name] = files(file).default;   
    return modules;     
},{});
const store = new Vuex.Store({
    modules,
    getters
});
export default store;
