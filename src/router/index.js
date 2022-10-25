import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: Home,
	},
	{
		path: "/echart",
		name: "echart",
		component: () => import("../views/echarts.vue"),
	},
	{
		path: "/exceljs",
		name: "exceljs",
		component: () => import("../views/exceljs.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
