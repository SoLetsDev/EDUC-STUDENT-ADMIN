import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import Vue from 'vue';
jest.mock('@/router');
import appRouter from '@/router';
import SetNavigation from '@/components/util/SetNavigation.vue';
import VueRouter from 'vue-router';
import setNavigation from '@/store/modules/setNavigation';

describe('SetNavigation Component initialized with namespaced Vuex module.', () => {
  let wrapper;

  const localVue = createLocalVue();

  Vue.use(VueRouter);
  Vue.use(Vuetify);
  Vue.use(Vuex);

  const router = new VueRouter();
  const vuetify = new Vuetify();

  const  store = new Vuex.Store({
    modules: {
      setNavigation
    }
  });

  beforeEach(() => {
    wrapper = mount(SetNavigation, {
      sync: false,
      localVue,
      vuetify,
      store,
      router,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.destroy();
  });

  test('It should render the component and display title.', async () => {
    store.commit('setNavigation/setNavigation', {seqNumber: 1, totalNumber: 10, title: 'Record 1 of 10 (5 files selected)', preRoute: 'previous', nextRoute: 'next'});
    await Vue.nextTick();
    expect(store.state.setNavigation.totalNumber).toBe(10);
    expect(wrapper.html()).toContain(`Record 1 of 10 (5 files selected)`);
  });

  test('It should not display title.', async () => {
    store.commit('setNavigation/setNavigation', {seqNumber: 0, totalNumber: 0, title: '', preRoute: 'previous', nextRoute: 'next'});
    await Vue.nextTick();
    expect(wrapper.html()).toBeUndefined();
  });

  test('Its previous button should not be clickable when seqNumber is 1.', async () => {
    store.commit('setNavigation/setNavigation', {seqNumber: 1, totalNumber: 10, title: 'Record 1 of 10 (5 files selected)', preRoute: 'previous', nextRoute: 'next'});
    await Vue.nextTick();
    const button = wrapper.find('#preRecord');
    const spy = spyOn(appRouter, 'push');
    button.trigger('click');
    expect(spy).toHaveBeenCalledTimes(0);
  });

  test('Its next button should be clickable when seqNumber is 1 and seqNumber is less than totalNumber.', async () => {
    store.commit('setNavigation/setNavigation', {seqNumber: 1, totalNumber: 10, title: 'Record 1 of 10 (5 files selected)', preRoute: 'previous', nextRoute: 'next'});
    await Vue.nextTick();
    const button = wrapper.find('#nextRecord');
    const spy = spyOn(appRouter, 'push');
    button.trigger('click');
    expect(spy).toBeCalledWith('next');
  });

  test('Its next button should not be clickable when seqNumber is equal to totalNumber.', async () => {
    store.commit('setNavigation/setNavigation', {seqNumber: 10, totalNumber: 10, title: 'Record 10 of 10 (5 files selected)', preRoute: 'previous', nextRoute: 'next'});
    await Vue.nextTick();
    const button = wrapper.find('#nextRecord');
    const spy = spyOn(appRouter, 'push');
    button.trigger('click');
    expect(spy).toHaveBeenCalledTimes(0);
  });

  test('It previous button should be clickable when seqNumber is larger than 1 and equal to totalNumber.', async () => {
    store.commit('setNavigation/setNavigation', {seqNumber: 10, totalNumber: 10, title: 'Record 10 of 10 (5 files selected)', preRoute: 'previous', nextRoute: 'next'});
    await Vue.nextTick();
    const button = wrapper.find('#preRecord');
    const spy = spyOn(appRouter, 'push');
    button.trigger('click');
    expect(spy).toBeCalledWith('previous');
  });

  test('Its next button should be clickable when seqNumber is larger than 1 and less than totalNumber.', async () => {
    store.commit('setNavigation/setNavigation', {seqNumber: 5, totalNumber: 10, title: 'Record 5 of 10 (5 files selected)', preRoute: 'previous', nextRoute: 'next'});
    await Vue.nextTick();
    const button = wrapper.find('#nextRecord');
    const spy = spyOn(appRouter, 'push');
    button.trigger('click');
    expect(spy).toBeCalledWith('next');
  });

  test('It previous button should be clickable when seqNumber is larger than 1 and less than totalNumber.', async () => {
    store.commit('setNavigation/setNavigation', {seqNumber: 5, totalNumber: 10, title: 'Record 5 of 10 (5 files selected)', preRoute: 'previous', nextRoute: 'next'});
    await Vue.nextTick();
    const button = wrapper.find('#preRecord');
    const spy = spyOn(appRouter, 'push');
    button.trigger('click');
    expect(spy).toBeCalledWith('previous');
  });

});
