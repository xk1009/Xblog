import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    "intro",

    // {
    //   text: "如何使用",
    //   icon: "laptop-code",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    // },
    {
      text: "java",
      icon: "mug-hot",
      prefix: "java/",
      link: "java/",
      children: "structure",
    },
        {
      text: "前端",
      icon: "eye",
      prefix: "frontEnd/",
      link: "frontEnd/",
      children: "structure",
    },
            {
      text: "数据",
      icon: "database",
      prefix: "data/",
      link: "data/",
      children: "structure",
    },
    {
      text: "O&M",
      icon: "om",
      prefix: "om/",
      link: "om/",
      children: "structure",
    },

    // {
    //   text: "幻灯片",
    //   icon: "person-chalkboard",
    //   link: "https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html",
    // },
    {
      text: "文章",
      icon: "newspaper",
      prefix: "act/",
      link: "act/",
      children: "structure",
    },
    {
      text: "加密文件",
      icon: "lock",
      prefix: "secret/",
      link: "secret/",
      children: "structure",
    },
  ],
});
