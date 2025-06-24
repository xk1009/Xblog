import { defineClientConfig } from "vuepress/client";
import Blog from "./layouts/Blog.vue";
import { setupSnowFall } from "vuepress-theme-hope/presets/snowFall.js";

export default defineClientConfig({
  //...

  layouts: {
    // ...
    Blog,
  },

   setup() {
    setupSnowFall();
  },
});

