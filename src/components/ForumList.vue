<template>
  <div>
    <h1>Browse forums</h1>
    <ul>
      <h2>Create a forum</h2>
      <input v-model="forumName" type="text" placeholder="Forum name">
      <input v-model="forumDescription" type="text" placeholder="Forum description">
      <button @click="postForum">Add forum</button>
      <h2>Forums:</h2>
      <li v-for="forum in forums" v-bind:key="forum.name">
        <RouterLink :to="{name: 'forum', params: {forumName: forum.name}}">
          Name: {{ forum.name }}
        </RouterLink>
        <p>Description: {{ forum.description }}</p>
        <button @click="deleteForum(forum)">Delete forum</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      forums: [],
      forumName: "",
      forumDescription: "",
    }
  },
  name: "ForumList.vue",
  methods: {
    getForums() {
      fetch("http://localhost:8100/api/forums", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.jwt,
          "Content-Type": "application/json",
        }})
        .then((response) => {
          if(response.ok) {
            return response.json().then((data) => {
              this.forums = data;
            });
          }
        })
    },
    postForum() {
      fetch("http://localhost:8100/api/forum", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.jwt,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: this.forumName,
          Description: this.forumDescription,
        }),
      })
        .then((response) => {
          if(response.ok) {
            return response.json().then((data) => {
              this.forums.push(data);
            });
          }
        })
    },
    deleteForum(forum) {
      fetch("http://localhost:8100/api/forum/" + forum.name, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.jwt,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if(response.ok) {
            this.forums = this.forums.filter((f) => f.name !== forum.name);
          }
        });
    },
  },
  mounted() {
    this.getForums();
  },
}
</script>

<style scoped>

</style>