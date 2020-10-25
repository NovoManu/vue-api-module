<template>
  <div id="app">
    <h1>Vue API module example</h1>
    <p>Please open console</p>
    <p>And check VUEX store</p>
  </div>
</template>

<script>
export default {
  name: "App",
  async created() {
    // Note: getting users
    await this.$store.dispatch("fetchUsers");
    const users = await this.$api.users.fetch({});
    console.log({ message: "Users from the component", users });

    // Note: get user by id
    const user = await this.$api.users.get(1);
    console.log({ message: "User with id: 1", user });

    // Note: creating a new post
    let post = {
      userId: 1,
      title: "My first amazing post",
      body:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    };
    await this.$store.dispatch("createPost", post);

    // Note: update post
    post = { ...post, id: 1 };
    await this.$store.dispatch("updatePost", post);

    // Note: delete post
    await this.$api.posts.delete(post.id);
    console.log({ message: "Post with id is deleted" });

    // Note: execute custom extended method for albums resource
    await this.$api.albums.uploadImage();

    // Note: execute another custom method
    await this.$api.albums.triggerError();
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
