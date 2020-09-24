const getDefaultState = () => {
  return {
    seqNumber: 0,
    totalNumber: 0,
    title: '',
    preRoute: null,
    nextRoute: null,
  };
};

export default {
  namespaced: true,
  state: getDefaultState,
  mutations: {
    /**
     * call the setNavigation in the created method of a component to show SetNavigation component 
     */
    setNavigation: (state, {seqNumber, totalNumber, title,  preRoute, nextRoute}) => {
      state.seqNumber = seqNumber;
      state.totalNumber = totalNumber;
      state.title = title;
      state.preRoute = preRoute;
      state.nextRoute = nextRoute;
    },
    /**
     * call the clearNavigation in the beforeDestroy method of a component to hide SetNavigation component
     */
    clearNavigation: (state) => {
      Object.assign(state, getDefaultState());
    }
  },
};
