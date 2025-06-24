import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({

  hostname: "https://mister-hope.github.io",
  //深色模式切换
  darkmode:"toggle",

  //全屏
  fullscreen: true,

    //   watermarkPlugin({
    //   enabled: true,
    //   watermarkOptions: {
    //     content: 'My Site',
    //   },
    // }),


  author: {
    name: "XK",
    url: "https://xk1009.github.io/Xblog",
    email:"564293991@qq.com"
  },

  logo: "/assets/gifs/ys.gif",

  // repo: "vuepress-theme-hope/vuepress-theme-hope",

  docsDir: "src",

  // 导航栏
  navbar,

  // 侧边栏
  sidebar,


  // 页脚
  footer: "xk分享",
  displayFooter: true,

  // 博客相关
  blog: {
    description: "一个用代码和玄学对抗宇宙熵增的赛博道士",
    intro: "/intro.html",
    medias: {
      Baidu: "https://wwwbaidu.com",
      BiliBili: "https://www.bilibili.com/",
      Dingding: "https://www.dingtalk.com/",
      // Email: "564293991@qq.com",
      Gitee: "https://example.com",
      GitHub: "https://example.com",
      QQ: "https://example.com",
      // Qzone: "https://example.com",
      Steam: "https://example.com",
      Wechat: "https://example.com",
      // Zhihu: "https://example.com",
      // VuePressThemeHope: {
      //   icon: "/assets/icon/image.jpg",
      //   link: "https://theme-hope.vuejs.press",
      // },
    },
  },

  // 加密配置
  encrypt: {
    config: {
   
      "/secret/aliyun001.html": {
        hint: "请输入访问密码",
        password: "123",
      },
       "/secret/aws.html": {
        hint: "请输入访问密码",
        password: "123",
      },
      "/act/IOS/superSign.html": {
        hint: "请输入访问密码",
        password: "123",
      },
       "/act/ninePay.html": {
        hint: "请输入访问密码",
        password: "123",
      },
    },
  },

  // 多语言配置
  // metaLocales: {
  //   editLink: "在 GitHub 上编辑此页",
  // },

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  // hotReload: true,

  // 此处开启了很多功能用于演示，你应仅保留用到的功能。
  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    plantuml: true,
    spoiler: true,
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,

    // 取消注释它们如果你需要 TeX 支持
    // math: {
    //   // 启用前安装 katex
    //   type: "katex",
    //   // 或者安装 mathjax-full
    //   type: "mathjax",
    // },

    // 如果你需要幻灯片，安装 @vuepress/plugin-revealjs 并取消下方注释

    // 在启用之前安装 chart.js
    // chartjs: true,

    // insert component easily

    // 在启用之前安装 echarts
    // echarts: true,

    // 在启用之前安装 flowchart.ts
    // flowchart: true,

    // 在启用之前安装 mermaid
    // mermaid: true,

    // playground: {
    //   presets: ["ts", "vue"],
    // },

    // 在启用之前安装 @vue/repl
    // vuePlayground: true,

    // 在启用之前安装 sandpack-vue3
    // sandpack: true,
  },

  // 在这里配置主题提供的插件
  plugins: {
    blog: true,

    // 启用之前需安装 @waline/client
    // 警告: 这是一个仅供演示的测试服务，在生产环境中请自行部署并使用自己的服务！
    // comment: {
    //   provider: "Waline",
    //   serverURL: "https://waline-comment.vuejs.press",
    // },

    components: {
      components: [
        "ArtPlayer",
        "Badge",
        "BiliBili",
        "CodePen",
        "PDF",
        "Share",
        "SiteInfo",
        "StackBlitz",
        "VPBanner",
        "VPCard",
        "VidStack",
      ]
    },

    icon: {
      prefix: "fa6-solid:",
    },

    watermark: {
      watermarkOptions: {
        content: "树下打盹儿",
        movable: true,
        // 其他选项
      },
    },

    search:{
         locales: {
        '/': {
          placeholder: '搜索',
        },
      }
    },

    


 

    
    // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cacheImage: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
