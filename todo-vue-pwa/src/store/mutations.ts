import firebase from 'firebase';
import { State } from './state';
import { db } from '../main';
import router from '../router/index';

export default {
  mutateIncrease: (state: { counter: number; }, payload: any) => {
    state.counter++;
  },
  mutateDecrease: (state: { counter: number; }, payload: any) => {
    state.counter--;
  },
  addTodo: (state: { todos: Array<State['todos'][0]>; user: State['user'] }, payload: any) => {
    if (payload && payload.replace(/\s/g, '').length) {
      const uid = localStorage.getItem('uid') || '';
      const idTodo = Math.random().toString(32).replace('0.', '');
      const doc = uid + idTodo;
      db.collection('todos').doc(doc).set({
        id: idTodo,
        content: payload,
        status: 'notdone',
        uid: localStorage.getItem('uid'),
        created_date: new Date(),
      });
      state.todos.push({
        id: idTodo,
        content: payload,
        status: 'notdone',
      });
    }
  },
  changeStatus: (state: { todos: Array<State['todos'][0]>; }, payload: any) => {
    const todo = state.todos.find((value: any) => value.id === payload);
    const uid = localStorage.getItem('uid') || '';
    if (todo) {
      const id = todo.id;
      const doc = uid + id;
      db.collection('todos').doc(doc).update({
        status: todo.status === 'done' ? 'notdone' : 'done',
      });
      if (todo.status === 'done') {
        return todo.status = 'notdone';
      } else {
        return todo.status = 'done';
      }
    }
  },
  removeTodo: (state: { todos: Array<State['todos'][0]>; }, payload: any) => {
    const uid = localStorage.getItem('uid') || '';
    const doc = uid + payload;

    db.collection('todos').doc(doc).delete().then(() => {
      // Shoe message delete
    });
    state.todos = state.todos.filter((todo) => {
      return todo.id !== payload;
    });
  },
  removeCompleted: (state: { todos: Array<State['todos'][0]>; }, payload: any) => {
    const uid = localStorage.getItem('uid') || '';
    let doc: string;
    state.todos.forEach((item: any) => {
      if (item.status === 'done') {
        doc = uid + item.id;
        db.collection('todos').doc(doc).delete().then(() => {
          // Show message
        });
      }
    });
    state.todos = state.todos.filter((todo) => {
      return todo.status !== 'done';
    });
  },
  applyFilter: (state: { filter: any; }, payload: any) => {
    state.filter = payload;
  },
  signup: (state: Partial<State>, payload: any) => {
    state.isSignin = true;
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(
      (user: any) => {
        if (state.user) {
          state.user.email = user.user.email || '';
          state.user.uid = user.user.uid || '';
        }
        localStorage.setItem('uid', user.user.uid);
        db.collection('users').add({
          email: user.user.email,
          uid: user.user.uid,
        });
        router.push('/login');
        state.err = '';
        state.isSignin = false;
      },
      (err: any) => {
        state.err = err.code;
        state.isSignin = false;
      },
    );
  },
  signin: (state: Partial<State>, payload: any) => {
    state.isSignin = true;
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(
      (user: any) => {
        if (state.user) {
          state.user.email = user.user.email || '';
          state.user.uid = user.user.uid || '';
        }
        localStorage.setItem('uid', user.user.uid);
        router.push('/todos');
        state.err = '';
        state.isSignin = false;
      },
      (err: any) => {
        state.err = err.code;
        state.isSignin = false;
      },
    );
  },
  signinWithGoogle: (state: {user: any}) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(
      (result: any) => {
        state.user.email = result.user.email || '';
        state.user.uid = result.user.uid || '';
        localStorage.setItem('uid', result.user.uid);
        db.collection('users').add({
          email: result.user.email,
          uid: result.user.uid,
        });
        router.push('todos');
      }, (err: any) => {
        // Show error message
      },
    );
  },
  signinWithFB: (state: {user: any}) => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(
      (result: any) => {
        state.user.email = result.user.email || '';
        state.user.uid = result.user.uid || '';
        localStorage.setItem('uid', result.user.uid);
        router.push('todos');
      }, (err: any) => {
        // Show error message
      },
    );
  },
  signout: (state: { todos: Array<State['todos'][0]>; }) => {
    firebase.auth().signOut().then(() => {
      state.todos = [];
      localStorage.removeItem('uid');
      router.push('login');
    });
  },
  setDataToState: (state: { todos: Array<State['todos'][0]>; isProgress: boolean }) => {
    state.isProgress = true;
    const uid = localStorage.getItem('uid');
    db.collection('todos').where('uid', '==', uid).orderBy('created_date').get().then(
      (querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          state.todos.push(doc.data());
        });
        state.isProgress = false;
      }, (err: any) => {
        state.isProgress = false;
      },
    );
  },
  resetStore: (state: Partial<State>) => {
    state.todos = [];
    state.err = '';
  },
};
