// sidebar
import { vue3Treasures_router } from "./router/vue3_treasures";
import { toolFun_router } from "./router/toolFun";
import { vue3_study_router } from "./router/vue3_base";
import { uniapp_router } from "./router/uniapp";
import { vscode_router } from "./router/vscode";
import { git_router } from "./router/git";
import { js_router } from "./router/js";
import { css_router } from "./router/css";
import { html_router } from "./router/html";
import { vite_router } from "./router/vite";
import { lotsOfDifferent_router } from "./router/lotsOfDifferent";
import { algorithm_router } from './router/algorithm'
import { gzh_template_router } from "./router/gzh_template";
export default sidebar_router = [
  // 公众号模版
  gzh_template_router,
  // 算法
  algorithm_router,
  // vue3宝藏
  vue3Treasures_router,
  // 工具函数
  toolFun_router,
  // uniapp
  uniapp_router,
  // 杂七杂八
  lotsOfDifferent_router,
  // js相关
  js_router,
  // css相关
  css_router,
  // htnl相关
  html_router,
  // vue3学习笔记
  vue3_study_router,
  // vite
  vite_router,
  // git
  git_router,
  // vscode
  vscode_router,
];
