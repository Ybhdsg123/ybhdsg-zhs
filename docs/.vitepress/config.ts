import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/ybhdsg-zhs/",
  // 页面标题
  title: "哑巴湖大水怪",
  titleTemplate: "我的网站",
  themeConfig: {
    // 网站的标题和logo
    logo: "/cat.svg",
    siteTitle: "哑巴湖大水怪的山水游记", // 这里写 false 就不显示，不写读取上面的 title
    socialLinks: [
      { icon: "github", link: "https://github.com/gumingWu/vitepress-fun" },
    ],
    // 导航
    nav: [
      { text: "掘金", link: "https://juejin.cn/user/761326894326280" },
      { text: "Configs", link: "/configs" },
      { text: "Changelog", link: "https://github.com/..." },
    ],
  },
});
