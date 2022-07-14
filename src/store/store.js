import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import mutations from './mutations/mutations';
import actions from './actions/actions';
import state from './state/state';

let store = new Vuex.Store({
    state,
    mutations,
    actions,
})

export default store;