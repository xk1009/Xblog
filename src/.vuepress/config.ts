import { defineUserConfig } from "vuepress";
import { watermarkPlugin } from '@vuepress/plugin-watermark'

import theme from "./theme.js";


export default defineUserConfig({
  base: "/Xblog/",

  lang: "zh-CN",
  title: "树下打盹儿",
  description: "许珂的博客",

  theme,
  plugins: [
    watermarkPlugin({
      enabled: true,
      watermarkOptions: {
        content: '树下打盹儿',
      },
    }),
  ],
  

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
