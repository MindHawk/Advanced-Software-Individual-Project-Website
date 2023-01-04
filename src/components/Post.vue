<template>
  <template v-if="postExists">
    <h1>{{ this.post.title }}</h1>
    <h2>{{ this.post.content }}</h2>
    <button @click="postComment">Add comment</button>
    <input v-model="commentContent" type="text" placeholder="Content">
    <h2>Comments</h2>
    <ul>
      <li v-for="comment in comments" v-bind:key="post.name">
        <p>{{ comment.content }}</p>
        <button @click="deleteComment(comment)">Delete comment</button>
      </li>
    </ul>
  </template>
  <template v-else>
    <h1>Post not found.</h1>
  </template>
</template>

<script>
import {useRoute} from "vue-router";

export default {
  data() {
    return {
      forumName: "",
      postExists: false,
      postId: "",
      post: [],
      comments: [],
      commentContent: "",
    }
  },
  name: "Post.vue",
  methods: {
    getPost() {
      fetch("http://localhost:8100/api/post/" + this.postId, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.jwt,
          "Content-Type": "application/json",
        }})
          .then((response) => {
            if(response.ok) {
              return response.json().then((data) => {
                this.post = data;
                this.postExists = true;
              });
            }
          })
    },
    getCommentsForPost() {
      fetch("http://localhost:8100/api/comments/" + this.postId, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.jwt,
          "Content-Type": "application/json",
        }})
          .then((response) => {
            if(response.ok) {
              return response.json().then((data) => {
                this.comments = data;
              });
            }
          })
    },
    postComment() {
      fetch("http://localhost:8100/api/comment", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.jwt,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Content: this.commentContent,
          PostId: this.postId,
        }),
      })
          .then((response) => {
            if(response.ok) {
              return response.json().then((data) => {
                this.comments.push(data);
              });
            }
          })
    },
    deleteComment(comment) {
      fetch("http://localhost:8100/api/comment/" + comment.id, {
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
    this.postId = route.params.postId;
    this.getPost();
    this.forumName = this.post.forum;
    this.getCommentsForPost();
  },
}
</script>

<style scoped>

</style>