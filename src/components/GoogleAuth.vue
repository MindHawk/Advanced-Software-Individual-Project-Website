<script setup lang="ts">
import { decodeCredential } from "vue3-google-login";
</script>

<template>
  <template v-if="jwt">
    <p>Welcome, {{ username }}</p>
    <img :src="picture" width="60" height="60" alt="profile picture" />
    <button @click="logout">Log out</button>
  </template>
  <template v-else>
    <GoogleLogin :callback="login" />
  </template>
</template>

<script lang="ts">
import {decodeCredential} from "vue3-google-login";

export default {
  name: "GoogleAuth",
  data() {
    return {
      jwt: "",
      username: "",
      picture: "",
    }
  },
  methods: {
    login(response) {
        const userData = decodeCredential(response.credential);
        localStorage.jwt = response.credential;
        localStorage.username = userData.name;
        localStorage.picture = userData.picture;
        this.update();
    },
    logout() {
      localStorage.jwt = "";
      localStorage.name = "";
      localStorage.picture = "";
      this.update();
    },
    update() {
      this.jwt = localStorage.jwt;
      this.username = localStorage.username;
      this.picture = localStorage.picture;
    }
  },
  mounted() {
    this.update();
  },
}
</script>

<style scoped>

</style>