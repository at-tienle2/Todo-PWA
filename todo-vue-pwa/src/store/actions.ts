export default {
  increase: ({commit}: any, payload: any) => {
    commit('mutateIncrease', payload);
  },
  decrease: ({commit}: any, payload: any) => {
    commit('mutateDecrease', payload);
  },
  addTodo: ({commit}: any, payload: any) => {
    commit('addTodo', payload);
  },
  changeStatus: ({commit}: any, payload: any) => {
    commit('changeStatus', payload);
  },
  removeTodo: ({commit}: any, payload: any) => {
    commit('removeTodo', payload);
  },
  removeCompleted: ({commit}: any, payload: any) => {
    commit('removeCompleted', payload);
  },
  changeFilter: ({commit}: any, payload: any) => {
    commit('applyFilter', payload);
  },
  signup: ({commit}: any, payload: any) => {
    commit('signup', payload);
  },
  signin: ({commit}: any, payload: any) => {
    commit('signin', payload);
  },
  signinWithGoogle: ({commit}: any, payload: any) => {
    commit('signinWithGoogle', payload);
  },
  signinWithFB: ({commit}: any, payload: any) => {
    commit('signinWithFB', payload);
  },
  signout: ({commit}: any) => {
    commit('signout');
  },
  setDataToState: ({commit}: any) => {
    commit('setDataToState');
  },
  resetStore: ({commit}: any) => {
    commit('resetStore');
  },
};
