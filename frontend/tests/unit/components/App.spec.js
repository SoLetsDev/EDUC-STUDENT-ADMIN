import { shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import App from '@/App.vue';
import Vuex from 'vuex';
import Vue from 'vue';
import auth from '@/store/modules/auth.js';
import app from '@/store/modules/app.js';
import webSocketService from '@/services/web-socket-service';

describe('App.vue', () => {
  let wrapper;
  //let getters;
  let store;
  let vuet;

  beforeEach(() => {
    Vue.use(Vuetify);
    Vue.use(Vuex);
    Vue.use(VueRouter);

    store = new Vuex.Store({
      modules: { auth, app }
    });
    vuet = new Vuetify({
      icons: {
        iconfont: 'md',
      }
    });
    Vue.use(webSocketService, {store, url: 'ws://localhost:8080/api/socket'});

    const router = new VueRouter();
    wrapper = shallowMount(App, {
      Vue,
      vuet,
      store,
      router
    });
  });

  test('app exists', () => {
    expect(wrapper).toBeTruthy();
  });
});
