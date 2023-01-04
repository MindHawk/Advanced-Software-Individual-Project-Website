<template>
  <template v-if="forumExists">
    <h1>Browse forums</h1>
    <h2>Welcome to forum: {{ this.forumName }}</h2>
    <button @click="postPost">Add post</button>
    <input v-model="postTitle" type="text" placeholder="Post title">
    <input v-model="postContent" type="text" placeholder="Post content">
    <h2>Posts:</h2>
    <ul>
      <li v-for="post in posts" v-bind:key="post.name">
        <RouterLink :to="{name: 'post', params: {postId: post.id}}">
          Name: {{ post.title }}
        </RouterLink>
        <p>Forum description: {{ post.content }}</p>
        <button @click="deletePost(post)">Delete post</button>
      </li>
    </ul>
  </template>
  <template v-else>
    <h1>Forum not found.</h1>
  </template>
</template>

<script>
import {useRoute} from "vue-router";

export default {
  data() {
    return {
      forumExists: false,
      forumName: "",
      posts: [],
      postTitle: "",
      postContent: "",
    }
  },
  name: "Forum.vue",
  methods: {
    getForum() {
      fetch("http://localhost:8100/api/forum/" + this.forumName, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.jwt,
          "Content-Type": "application/json",
        }})
        .then((response) => {
          if(response.ok) {
            return response.json().then((data) => {
              this.forumExists = true;
            });
          }
        })
    },
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
                this.posts = data;
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
                this.posts.push(data);
              });
            }
          })
    },
    deletePost(post) {
      fetch("http://localhost:8100/api/post/" + post.id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.jwt,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
          .then((response) => {
            if(response.ok) {
              this.posts = this.posts.filter((f) => f.id !== post.id);
            }
          });
    },
  },
  mounted() {
    const route = useRoute();
    this.forumName = route.params.forumName;
    this.getForum();
    this.getPostsForForum();
  },
}
</script>

<style scoped>

</style>