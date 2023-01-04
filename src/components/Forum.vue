<template>
  <div>
    <h1>Browse forums</h1>
    <h2>Welcome to forum: {{ this.forumName }}</h2>
    <button @click="postPost">Add post</button>
    <input v-model="postTitle" type="text" placeholder="Post title">
    <input v-model="postContent" type="text" placeholder="Post content">
    <h2>Posts:</h2>
    <ul>
      <li v-for="post in posts" v-bind:key="post.name">
        <RouterLink to="/forum/{{ post.name }}">
          <p>Forum name: {{ post.name }}</p>
        </RouterLink>
        <p>Forum description: {{ post.content }}</p>
        <button @click="deleteForum(post)">Delete forum</button>
      </li>
    </ul>
  </div>
</template>

<script>
import {useRoute} from "vue-router";

export default {
  data() {
    return {
      forumName: "",
      posts: [],
      postTitle: "",
      postContent: "",
    }
  },
  name: "Forum.vue",
  methods: {
    getPostsForForum() {
      fetch("http://localhost:8100/api/posts/" + this.forumName, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.jwt,
          "Content-Type": "application/json",
        }})
          .then((response) => {
            if(response.ok) {
              return response.json().then((data) => {
                console.log(data)
                this.forums = data;
              });
            }
          })
    },
    postPost() {
      fetch("http://localhost:8100/api/post", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.jwt,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Title: this.postTitle,
          Content: this.postContent,
          Forum: this.forumName,
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
    const route = useRoute();
    this.forumName = route.params.forumName;
    this.getPostsForForum();
  },
}
</script>

<style scoped>

</style>