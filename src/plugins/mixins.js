import Vue from "vue";
import { $api } from "@/services/api";

Vue.mixin({
  computed: {
    $api: () => $api
  }
});
