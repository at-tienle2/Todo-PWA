import firebase from 'firebase';

export default {
  counter: (state: { counter: any; }) => {
    return state.counter;
  },
  todoList: (state: { todos: any; filter: any}) => {
    const { todos, filter } = state;
    return todos.filter((todo: {status: any}) => {
      if (!filter) {
        return true;
      }
      return todo.status === filter;
    });
  },
  countCompleted: (state: {todos: any; filter: any}) => {
    const completed = state.todos.filter((todo: any) => todo.status === 'done');
    return completed.length;
  },
  errMsg: (state: {err: string}) => {
    switch (state.err) {
      case 'auth/user-not-found':
        return 'User not found';
      case 'auth/wrong-password':
        return 'Invalid email or password';
      case 'auth/email-already-in-use':
        return 'The email address is already in use';
      case 'auth/invalid-email':
        return 'The email address is badly formatted';
    }
  },
};
