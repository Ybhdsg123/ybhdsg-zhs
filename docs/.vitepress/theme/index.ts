import Theme from "vitepress/theme";
import MyText from "../../components/index.vue";
// 要使用外部主题，请从自定义主题入口导入并重新导出
import "./style/var.css";
export default {
  ...Theme,
  enhanceApp({ app }) {
    app.component("MyText", MyText);
  },
};
