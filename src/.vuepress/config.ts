import { defineUserConfig } from "vuepress";
import { searchPlugin } from '@vuepress/plugin-search'

import theme from "./theme.js";


export default defineUserConfig({
  base: "/Xblog/",

  lang: "zh-CN",
  title: "树下打盹儿",
  description: "许珂的博客",

  theme,
  plugins: [
    // watermarkPlugin({
    //   enabled: true,
    //   watermarkOptions: {
    //     content: '树下打盹儿',
    //   },
    // }),
    //  searchPlugin({
    //   // 配置项
    //        locales: {
    //     '/': {
    //       placeholder: '搜索',
    //     },
        
    //   },
      
    // }),
  ],
  

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
