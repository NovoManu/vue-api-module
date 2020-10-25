import Vue from "vue";
import Vuex from "vuex";
import storePlugins from "@/plugins/storePlugins";

Vue.use(Vuex);

// Note: you may want to split your store to modules, but for simplicity we create all globally

const ADD_USERS = "ADD_USERS";
const ADD_POST = "ADD_POST";
const UPDATE_POST = "UPDATE_POST";

export default new Vuex.Store({
  plugins: [storePlugins],
  state: {
    users: [],
    posts: []
  },
  mutations: {
    [ADD_USERS](state, users) {
      state.users = users;
    },
    [ADD_POST](state, post) {
      state.posts = [...state.posts, post];
    },
    [UPDATE_POST](state, post) {
      const index = state.posts.findIndex(({ id }) => id === post.id);
      if (!~index) state.posts.splice(index, 1, post);
    }
  },
  actions: {
    async fetchUsers({ commit }, config) {
      const users = await this.$api.users.fetch(config);
      commit(ADD_USERS, users);
      console.log({ message: "Users from vuex", users });
    },

    async createPost({ commit }, post) {
      const id = await this.$api.posts.post(post);
      commit(ADD_POST, { ...post, id });
      console.log({ message: "Created post", post: { ...post, id } });
    },

    async updatePost({ commit }, post) {
      const id = await this.$api.posts.put(post.id, post);
      commit(UPDATE_POST, post);
      console.log({ message: "Updated post", post: { post, id } });
    }
  }
});
