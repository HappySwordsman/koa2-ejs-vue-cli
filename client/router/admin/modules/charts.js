/** When your routing table is too long, you can split it into small modules**/

import Layout from "@/views/admin/layout";

const chartsRouter = {
  path: "/charts",
  component: Layout,
  redirect: "noRedirect",
  name: "Charts",
  meta: {
    title: "Charts",
    icon: "chart",
  },
  children: [
    {
      path: "keyboard",
      component: () => import("@/views/admin/charts/keyboard"),
      name: "KeyboardChart",
      meta: { title: "Keyboard Chart", noCache: true },
    },
    {
      path: "line",
      component: () => import("@/views/admin/charts/line"),
      name: "LineChart",
      meta: { title: "Line Chart", noCache: true },
    },
    {
      path: "mix-chart",
      component: () => import("@/views/admin/charts/mix-chart"),
      name: "MixChart",
      meta: { title: "Mix Chart", noCache: true },
    },
  ],
};

export default chartsRouter;
