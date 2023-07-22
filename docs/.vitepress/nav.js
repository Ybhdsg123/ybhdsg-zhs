import { threejs_router } from "./router/threeJs";
import { canvas_router } from "./router/canvas";
import { interviewRelated_router } from "./router/InterviewRelated";
import { admin_router } from "./router/vue3-element-admin";
import { writeFun_router } from "./router/writeFun";
import { node_router } from "./router/node";
import { rollup_router } from "./router/rollup";
export default nav_router = [
  // threejs
  threejs_router,
  // canvas
  canvas_router,
  // 面试
  interviewRelated_router,
  // 后台管理
  admin_router,
  // 手写函数
  writeFun_router,
  // node
  node_router,
  // rollup
  rollup_router,
  // { text: "掘金", link: "https://juejin.cn/user/761326894326280" },
  { text: "简书", link: "https://www.jianshu.com/u/ac97502b9e92" },
];
