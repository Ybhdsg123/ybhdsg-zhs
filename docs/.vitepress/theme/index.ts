import Theme from "vitepress/theme";
// 要使用外部主题，请从自定义主题入口导入并重新导出
import "./style/var.css";
export default {
  ...Theme,
};
