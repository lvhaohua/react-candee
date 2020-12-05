export default {
  name: 'global',

  initialState: {
    loading: false
  },

  reducers: {
    showLoading: (state, data) => {
      return { ...state, ...data };
    }
  },

  effects: {}
};
