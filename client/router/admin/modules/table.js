/** When your routing table is too long, you can split it into small modules **/

import Layout from "@/views/admin/layout";

const tableRouter = {
  path: "/table",
  component: Layout,
  redirect: "/table/complex-table",
  name: "Table",
  meta: {
    title: "Table",
    icon: "table",
  },
  children: [
    {
      path: "dynamic-table",
      component: () => import("@/views/admin/table/dynamic-table/index"),
      name: "DynamicTable",
      meta: { title: "Dynamic Table" },
    },
    {
      path: "drag-table",
      component: () => import("@/views/admin/table/drag-table"),
      name: "DragTable",
      meta: { title: "Drag Table" },
    },
    {
      path: "inline-edit-table",
      component: () => import("@/views/admin/table/inline-edit-table"),
      name: "InlineEditTable",
      meta: { title: "Inline Edit" },
    },
    {
      path: "complex-table",
      component: () => import("@/views/admin/table/complex-table"),
      name: "ComplexTable",
      meta: { title: "Complex Table" },
    },
  ],
};
export default tableRouter;
