<template>
  <div class="login-page">
    <div v-if="isSignin">
      <Loading/>
    </div>
    <form>
      <span class="err-msg" v-if="errMsg && !isSignin"> {{ errMsg }} </span>
      <input class="input email" id="emailIn" type="email" placeholder="Email" v-model="email">
      <input class="input password" id="passwordIn" type="password" placeholder="Password" v-model="password">
      <button type="button" class="btn btn-primary" :disabled="!email || !password" @click="login()">Log In</button>
      <div class="login-or">
        <h5 class="pros"><span>Or</span></h5>
      </div>
      <div class="action">
        <button type="button" class="btn btn-fb" @click="signinWithFB()"><i class="fab fa-facebook-f"></i></button>
        <button type="button" class="btn btn-google" @click="signinWithGoogle()"><i class="fab fa-google"></i></button>
      </div>
      <div class="text-centered">
        <router-link class="link-not-account" to="/todos">Continue without an account</router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
  import firebase from 'firebase';
  import { mapActions, mapGetters, mapState } from 'vuex';
  import Loading from '../shared/Loading.vue';

  export default ({
    name: 'Login',
    components: {
      Loading,
    },
    data() {
      return {
        email: null,
        password: null,
      };
    },
    computed: {
      ...mapGetters(['errMsg']),
      ...mapState(['isSignin'])
    },
    methods: {
      ...mapActions(['signin', 'signinWithGoogle', 'signinWithFB', 'resetStore']),
      login() {
        const payload = {
          email: this.email,
          password: this.password,
        };
        this.signin(payload);
      },
    },
    mounted() {
      this.resetStore();
    },
  });
</script>
